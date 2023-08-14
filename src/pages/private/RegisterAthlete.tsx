import React from 'react';
import { Formik, Form, Field, FormikProps, ErrorMessage } from 'formik';
import { Athlete } from 'interfaces/athlete';
import { LiaTrashAlt } from 'react-icons/lia';
import { cepMask, cleanRg, cpfMask, dateMask, phoneMask, rgMask } from 'utils/mask';
import { Button, Input, ShowIf } from 'components';
import { isDateValid, isValidCPF } from 'utils/isValid';
import validator from 'validator';
import * as Yup from 'yup';
import { MdArrowBackIosNew } from 'react-icons/md';

import { useDispatch } from 'react-redux';

import * as actionsAthlete from 'store/athlete/actions';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAppSelector } from 'hooks/useAppSelector';
import { Mode } from 'interfaces/mode';

const initialValues: Athlete & Mode = {
  name: '',
  photo: null,
  category: {
    _id: '',
    name: '',
  },
  rg: '',
  cpf: '',
  dateBirth: '',
  email: '',
  mode: 'create',
  isFederated: {
    clubName: '',
    date: '',
  },
  school: {
    name: '',
    period: '',
  },
  address: {
    road: '',
    number: '',
    cep: '',
  },
  mother: {
    name: '',
    phone: '',
  },
  father: {
    name: '',
    phone: '',
  },
  certificateValidity: {
    file: null,
    date: '',
  },
  situation: {
    status: 'regular',
    observation: '',
  },
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O Nome é obrigatório!'),
  rg: Yup.string().required('O RG é obrigatório!').min(12, 'RG inválido'),
  cpf: Yup.string()
    .required('O CPF é obrigatório!')
    .test('cpf', 'CPF inválido.', (value) => isValidCPF(value!)),
  dateBirth: Yup.string()
    .required('A Data de nascimento é obrigatório!')
    .min(10, 'Data inválida')
    .test('dateBirth', 'Data inválida', (value) => {
      if (!value) return true;
      const [day, month, year] = value?.split('/').map(Number);
      const yearValid = year <= new Date().getFullYear();
      return yearValid && isDateValid(value!);
    }),
  category: Yup.object().shape({
    _id: Yup.string().required('A Categoria é obrigatória!'),
  }),
  isFederated: Yup.object().shape({
    date: Yup.string()
      .min(4, 'Data inválida')
      .test('isFederated.date', 'Data inválida', (value) => {
        if (!value) return true;
        return Number(value) <= new Date().getFullYear();
      }),
  }),
  certificateValidity: Yup.object().shape({
    date: Yup.string().test('isFederated.date', 'Data inválida', (value) => !value || isDateValid(value!)),
  }),
  mother: Yup.object().shape({
    phone: Yup.string().test('mother.phone', 'Número inválido', (value) => !value || value?.length! >= 14),
  }),
  father: Yup.object().shape({
    phone: Yup.string().test('mother.phone', 'Número inválido', (value) => !value || value?.length! >= 14),
  }),
  email: Yup.string().test('email', 'Email inválido', (value) => !value || validator.isEmail(value!)),
  address: Yup.object().shape({
    road: Yup.string().required('A Rua é obrigatória!'),
    number: Yup.string().required('O Número é obrigatório!'),
    cep: Yup.string().required('O CEP é obrigatório!').min(9, 'CEP inválido'),
  }),
});

type Props = {};

export function RegisterAthlete({}: Props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const formikRef = React.useRef<FormikProps<typeof initialValues>>(null);

  const { athletes, loading } = useAppSelector((state) => state.athleteReducer);
  const { categories, loading: categoriesLoading } = useAppSelector((state) => state.categoryReducer);

  const [pageTitle, setPageTitle] = React.useState('');

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files?.[0]) return;

    const file = event.currentTarget.files?.[0];

    const fileSizeLimit = 1 * 1024 * 1024; // 5 MB

    if (file.size > fileSizeLimit) {
      alert('O arquivo selecionado excede o limite de tamanho de 1 MB.');
      return;
    }

    formikRef.current?.setFieldValue(event.target.name, event.currentTarget.files?.[0] || null);
  };

  const handleRemoveFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.getAttribute('data-value');

    if (name === 'certificateValidity.file') formikRef.current?.setFieldValue('certificateValidity.date', '');
    setTimeout(() => formikRef.current?.setFieldValue(name!, null), 0);
  };

  const onPasteRg = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const value = event.clipboardData.getData('text');
    formikRef.current?.setFieldValue('rg', cleanRg(value));
  };

  const handleChangeRg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.includes('-x')) return;
    formikRef.current?.setFieldValue('rg', rgMask(event.target.value));
  };

  const handleChangeCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    formikRef.current?.setFieldValue('cpf', cpfMask(value));
  };

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    formikRef.current?.setFieldValue(event.target.name, dateMask(value));
  };

  const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = event.target.value;

    if (value.length >= 5) return;

    value = value.replace(/\D/g, '');
    formikRef.current?.setFieldValue('isFederated.date', value);
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    formikRef.current?.setFieldValue(event.target.name, phoneMask(value));
  };

  const handleChangeCep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    formikRef.current?.setFieldValue(event.target.name, cepMask(value));
  };

  const handleChangeFederation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (!value) formikRef.current?.setFieldValue('isFederated.date', '');
    formikRef.current?.setFieldValue(name, value);
  };

  const handleChangeSchool = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (!value) formikRef.current?.setFieldValue('school.period', '');
    formikRef.current?.setFieldValue(name, value);
  };

  const onCreate = (formikValues: Athlete & Mode) => {
    const values = structuredClone(formikValues);
    const formData = new FormData();

    formData.append('photo', values.photo!);
    formData.append('certificate', values.certificateValidity.file!);

    delete values.photo;
    delete values.certificateValidity.file;

    formData.append('data', JSON.stringify(values));

    const callBack = () => {
      toast.success('Atleta cadastrado com sucesso!');
      navigate('/athletes');
    };

    dispatch(actionsAthlete.create({ data: formData, callBack }));
  };

  const onUpdate = (formikValues: Athlete & Mode) => {
    const values = structuredClone(formikValues);
    const formData = new FormData();

    formData.append('photo', values.photo!);
    formData.append('certificate', values.certificateValidity.file!);

    delete values.photo;
    delete values.certificateValidity.file;

    formData.append('data', JSON.stringify(values));

    const callBack = () => {
      toast.success('Dados atualizados com sucesso!', { toastId: 'update-athlete' });
      navigate('/athletes');
    };

    dispatch(actionsAthlete.update({ data: formData, callBack }));
  };

  const handleSubmit = (formikValues: Athlete & Mode) => {
    formikValues.mode === 'create' ? onCreate(formikValues) : onUpdate(formikValues);
  };

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const athleteId = queryParams.get('id');

    const setUpdateData = (data: Athlete[]) => {
      const result = data?.find((athlete) => athlete._id === athleteId);
      if (!result) return toast.warning('Atleta não encontrado para edição!');

      formikRef.current?.setValues(result);
      formikRef.current?.setFieldValue('mode', 'update');
      setPageTitle('Atualizar dados do Atleta');
    };

    if (athleteId) {
      athletes === null ? dispatch(actionsAthlete.fetch({ callBack: setUpdateData })) : setUpdateData(athletes);
    } else {
      setPageTitle('Registrar Atleta');
    }

    return () => {};
  }, []);

  return (
    <main className="w-full h-full py-9 overflow-y-auto">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <ShowIf
        as="section"
        show={loading.fetch}
        className="w-full h-screen flex items-center justify-center fixed top-0 left-0 z-50 bg-slate-950/70"
      >
        <svg
          role="status"
          className={`inline w-10 h-10  animate-spin fill-primary text-white/50 `}
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </ShowIf>

      <Link
        to="/athletes"
        className="w-max pl-5 mb-7 desk:mb-0 desk:pl-0 flex items-center justify-start gap-2 desk:fixed desk:left-8"
      >
        <MdArrowBackIosNew className="text-xl text-black" />
        <span className="font-roboto font-normal text-base text-black leading-initial">Voltar</span>
      </Link>

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, errors }) => {
          return (
            <Form className="w-full max-w-md mx-auto px-7">
              <small className="mb-2 font-normal text-sm text-black/70">Cadastrar novo atleta</small>
              <h1 className="font-changa font-semibold text-xl text-black/70">Informe os dados para cadastrar um novo atleta</h1>

              <fieldset className="mt-5">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Foto do atleta
                </label>

                <div className="mt-2 flex items-center gap-x-3">
                  <ShowIf
                    as="figure"
                    show={values.uri && !values.photo}
                    className="group/image w-20 h-20 desk:w-12 desk:h-12 flex items-center justify-center"
                  >
                    <img
                      src={import.meta.env.VITE_S3_URL + values.uri}
                      alt="foto do atleta"
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </ShowIf>

                  <ShowIf
                    as="figure"
                    show={values.photo}
                    className="group/image w-20 h-20 desk:w-12 desk:h-12 flex items-center justify-center"
                  >
                    <img
                      src={values.photo ? URL.createObjectURL(values.photo) : ''}
                      alt="foto do atleta"
                      className="w-20 h-20 desk:w-12 desk:h-12 rounded-full object-cover object-top"
                    />

                    <button
                      data-value="photo"
                      type="button"
                      onClick={handleRemoveFile}
                      className="w-20 h-20 desk:w-12 desk:h-12 flex items-center justify-center rounded-full bg-black/50 absolute group-hover/image:opacity-100 opacity-0 duration-200"
                    >
                      <LiaTrashAlt className="text-white text-2xl" />
                    </button>
                  </ShowIf>

                  <ShowIf show={!values.photo && !values.uri}>
                    <svg
                      className="w-20 h-20 desk:w-12 desk:h-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </ShowIf>

                  <label>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleChangeFile}
                      value={''}
                      accept=".jpg, .jpeg, .png"
                      className="hidden"
                    />
                    <div className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 select-none cursor-pointer">
                      Alterar foto
                    </div>
                  </label>
                </div>
              </fieldset>

              <fieldset className="mt-5 grid-cols-1">
                <Input
                  type="text"
                  name="name"
                  value={values.name}
                  error={errors.name}
                  placeholder="Nome completo"
                  className="capitalize py-8 desk:py-6"
                />
              </fieldset>

              <fieldset className="mt-3 grid gap-2.5 grid-cols-1 desk:grid-cols-2">
                <Input
                  type="text"
                  name="rg"
                  value={values.rg}
                  error={errors.rg}
                  onPaste={onPasteRg}
                  onChange={handleChangeRg}
                  placeholder="RG"
                  className="py-8 desk:py-6"
                  inputMode="numeric"
                />

                <Input
                  type="text"
                  name="cpf"
                  value={values.cpf}
                  error={errors.cpf}
                  onChange={handleChangeCpf}
                  placeholder="CPF"
                  className="py-8 desk:py-6"
                  inputMode="numeric"
                />
              </fieldset>

              <fieldset style={{ gridTemplateColumns: '1fr 1fr' }} className="mt-3 grid gap-2.5">
                <Input
                  type="text"
                  name="dateBirth"
                  value={values.dateBirth}
                  error={errors.dateBirth}
                  onChange={handleChangeDate}
                  placeholder="Data de nascimento"
                  className="py-8 desk:py-6"
                  inputMode="numeric"
                />

                <Input
                  as="select"
                  name="category._id"
                  error={errors.category}
                  value={values.category?._id}
                  className={`h-[66px] desk:h-13  ${values.category?._id === '' ? '!text-black/70' : 'text-black'}`}
                >
                  <option className="hidden">Categoria</option>
                  {categories?.map((category) => {
                    return <option value={category._id}>S{category.name}</option>;
                  })}
                </Input>
              </fieldset>

              <fieldset className="mt-3 grid gap-2.5 grid-cols-1 desk:grid-cols-2">
                <Input
                  type="text"
                  name="isFederated.clubName"
                  onChange={handleChangeFederation}
                  value={values.isFederated.clubName}
                  placeholder="Clube de Federação"
                  className="py-8 desk:py-6"
                />

                <Input
                  type="text"
                  name="isFederated.date"
                  value={values.isFederated.date}
                  error={errors.isFederated?.date}
                  disabled={!values.isFederated.clubName}
                  onChange={handleChangeYear}
                  placeholder="Ano"
                  className="py-8 desk:py-6"
                  inputMode="numeric"
                />
              </fieldset>

              <fieldset className="mt-3 grid gap-2.5 grid-cols-1 desk:grid-cols-2">
                <Input
                  type="text"
                  name="school.name"
                  value={values.school.name}
                  onChange={handleChangeSchool}
                  placeholder="Nome da escola"
                  className="capitalize py-8 desk:py-6"
                />

                <Input
                  as="select"
                  name="school.period"
                  value={values.school.period}
                  disabled={!values.school.name}
                  className={`h-[66px] desk:h-13 ${values.school.period === '' ? '!text-black/70' : 'text-black'}`}
                >
                  <option className="hidden">Período</option>
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                </Input>
              </fieldset>

              <fieldset className="mt-7 grid gap-2.5 items-end grid-cols-2">
                <label className="overflow-hidden pb-[2px] desk:pb-[18px]">
                  <input
                    type="file"
                    name="certificateValidity.file"
                    onChange={handleChangeFile}
                    value={''}
                    accept=".pdf, .jpg, .jpeg, .png"
                    className="hidden"
                  />

                  <span className="mb-2.5 font-normal text-sm text-black">Atestado médico</span>

                  <div
                    className={`w-full h-[66px] desk:h-13 px-3 rounded-base border border-dashed border-slate-400 flex items-center justify-center cursor-pointer ${
                      values.certificateValidity.file ? 'border-teal-500 bg-teal-100' : ''
                    }`}
                  >
                    <ShowIf
                      as="div"
                      show={values.certificateValidity.file || values.certificateValidity.uri}
                      className="w-full h-full flex items-center jutify-center"
                    >
                      <span className="line-clamp-one text-sm">
                        {values.certificateValidity.file?.name || values.certificateValidity.uri}
                      </span>

                      <ShowIf show={values.certificateValidity.file?.name}>
                        <button
                          data-value="certificateValidity.file"
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute -right-1"
                        >
                          <LiaTrashAlt className="text-primary text-2xl" />
                        </button>
                      </ShowIf>
                    </ShowIf>

                    <ShowIf show={!values.certificateValidity.file?.name && !values.certificateValidity.uri}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 3C8.91 3 6.48 5.3475 6.14025 8.34375C5.48673 8.44906 4.87385 8.7291 4.36646 9.15423C3.85908 9.57936 3.47608 10.1338 3.258 10.7587C1.413 11.2905 0 12.936 0 15C0 17.493 2.007 19.5 4.5 19.5H19.5C21.993 19.5 24 17.493 24 15C24 13.68 23.3587 12.498 22.4295 11.6715C22.2555 9.036 20.1532 6.933 17.508 6.7965C16.605 4.59975 14.5335 3 12 3ZM12 4.5C14.0715 4.5 15.7275 5.8275 16.3125 7.71L16.4775 8.25H17.25C19.3162 8.25 21 9.93375 21 12V12.375L21.3045 12.6097C21.672 12.8914 21.9706 13.253 22.1777 13.6671C22.3849 14.0812 22.4951 14.537 22.5 15C22.5 16.707 21.207 18 19.5 18H4.5C2.793 18 1.5 16.707 1.5 15C1.5 13.485 2.5875 12.309 3.96 12.0705L4.45275 11.9767L4.5465 11.4832C4.7715 10.473 5.667 9.75 6.75 9.75H7.5V9C7.5 6.4725 9.4725 4.5 12 4.5ZM12 8.6955L11.46 9.21075L8.46 12.2108L9.54 13.2908L11.25 11.5778V16.5H12.75V11.5778L14.46 13.2892L15.54 12.2092L12.54 9.20925L12 8.6955Z"
                          fill="black"
                          fillOpacity="0.4"
                        />
                      </svg>
                    </ShowIf>
                  </div>
                </label>

                <div style={{ height: 68 }}>
                  <Input
                    name="certificateValidity.date"
                    value={values.certificateValidity.date}
                    error={errors.certificateValidity?.date}
                    disabled={!values.certificateValidity.file && !values.certificateValidity.uri}
                    onChange={handleChangeDate}
                    placeholder="Validade"
                    className="py-8 desk:py-6"
                    inputMode="numeric"
                  />
                </div>
              </fieldset>

              <fieldset className="mt-5 desk:mt-2 grid gap-2.5 items-end grid-cols-1 desk:grid-cols-2">
                <label>
                  <span className="mb-2.5 font-normal text-sm text-black">Contato</span>

                  <Input
                    type="text"
                    name="mother.name"
                    value={values.mother.name}
                    placeholder="Nome da mãe"
                    className="capitalize py-8 desk:py-6"
                  />
                </label>

                <Input
                  name="mother.phone"
                  value={values.mother.phone}
                  error={errors.mother?.phone}
                  onChange={handleChangePhone}
                  placeholder="Contato da mãe"
                  className="py-8 desk:py-6"
                  inputMode="numeric"
                />
              </fieldset>

              <fieldset className="mt-3 grid gap-2.5 grid-cols-1 desk:grid-cols-2">
                <Input
                  type="text"
                  name="father.name"
                  value={values.father.name}
                  placeholder="Nome do pai"
                  className="capitalize py-8 desk:py-6"
                />

                <Input
                  name="father.phone"
                  value={values.father.phone}
                  error={errors.father?.phone}
                  onChange={handleChangePhone}
                  placeholder="Contato do pai"
                  className="py-8 desk:py-6"
                  inputMode="numeric"
                />
              </fieldset>

              <fieldset className="mt-3">
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  error={errors.email}
                  placeholder="Email"
                  className="py-8 desk:py-6"
                  inputMode="email"
                />
              </fieldset>

              <fieldset style={{ gridTemplateColumns: '1fr' }} className="mt-7 grid gap-2.5 items-end">
                <label>
                  <span className="mb-2.5 font-normal text-sm text-black">Endereço</span>

                  <Input
                    type="text"
                    name="address.road"
                    error={errors.address?.road}
                    value={values.address.road}
                    placeholder="Rua"
                    className="py-8 desk:py-6"
                  />
                </label>
              </fieldset>

              <fieldset style={{ gridTemplateColumns: '1fr 1fr' }} className="mt-3 grid gap-2.5">
                <Input
                  type="text"
                  name="address.number"
                  error={errors.address?.number}
                  value={values.address.number}
                  placeholder="Numero"
                  className="py-8 desk:py-6"
                  inputMode="numeric"
                />
                <Input
                  type="text"
                  name="address.cep"
                  value={values.address.cep}
                  error={errors.address?.cep}
                  onChange={handleChangeCep}
                  placeholder="CEP"
                  className="py-8 desk:py-6"
                  inputMode="numeric"
                />
              </fieldset>

              <fieldset style={{ gridTemplateColumns: '1fr' }} className="mt-7 grid gap-2.5">
                <span className="mb-2.5 font-normal text-sm text-black">Situação Financeira</span>

                <label className="mb-2 flex items-center gap-3 select-none">
                  <Input
                    type="radio"
                    name="situation.status"
                    value="regular"
                    className="flex !w-5 h-5 mt-0.5 accent-primary shadow-none"
                  />
                  <span>Regular</span>
                </label>

                <label className="flex items-center gap-3 select-none">
                  <Input
                    type="radio"
                    name="situation.status"
                    value="irregular"
                    className="flex !w-5 h-5 mt-0.5 accent-primary shadow-none"
                  />
                  <span>Irregular</span>
                </label>
              </fieldset>

              <fieldset style={{ gridTemplateColumns: '1fr' }} className="mt-7 grid gap-2.5">
                <Input
                  as="textarea"
                  name="situation.observation"
                  id="description"
                  value={values.situation.observation}
                  placeholder="Observação:"
                  className="flex w-full h-32 px-4 py-3 rounded-base border border-border-input focus:ring-red-500"
                />
              </fieldset>

              <Button
                type="submit"
                loading={loading.create || loading.update}
                className="w-full h-16 desk:h-13 mt-9 rounded-md bg-primary normal-case"
              >
                <span className="w-max mx-auto font-medium text-base text-inherit">
                  {loading.create || loading.update
                    ? 'Salvando...'
                    : values.mode === 'create'
                    ? 'Continuar'
                    : 'Salvar alterações'}
                </span>
              </Button>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
}
