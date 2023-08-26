import React from 'react';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import { Button, Input, ShowIf } from 'components';
import validator from 'validator';
import { MdArrowBackIosNew } from 'react-icons/md';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAppSelector } from 'hooks/useAppSelector';
import { Mode } from 'interfaces/mode';
import { Auth } from 'interfaces/auth';

import * as actionsAuth from 'store/auth/actions';
import * as actionsCategory from 'store/category/actions';

const initialValues: Auth & Mode = {
  mode: 'create',
  name: '',
  email: '',
  password: '',
  categories: [] as string[],
  type: 'user',
  active: true,
};

export function RegisterAcess() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const formikRef = React.useRef<FormikProps<typeof initialValues>>(null);

  const { categories, loading: loadingCategories } = useAppSelector((state) => state.categoryReducer);
  const { loading, users, auth } = useAppSelector((state) => state.authReducer);

  const [pageTitle, setPageTitle] = React.useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O Nome é obrigatório!'),
    password: Yup.string().required('A Senha é obrigatório!').min(8, 'A senha deve conter no mínimo 8 digitos'),
    categories: Yup.array().test('categories', 'Selecione uma categoria', (value) => {
      return formikRef.current?.values.type === 'admin' || value!.length > 0;
    }),
    email: Yup.string()
      .required('O Email é obrigatório!')
      .test('email', 'Email inválido', (value) => !value || validator.isEmail(value!)),
  });

  const handleClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const category = event.currentTarget.getAttribute('data-value');
    const oldCategories = formikRef.current?.values.categories;

    formikRef.current?.setFieldError('categories', '');

    if (oldCategories?.includes(category!)) {
      formikRef.current?.setFieldValue(
        'categories',
        oldCategories.filter((cat) => cat !== category)
      );
      return;
    }

    formikRef.current?.setFieldValue('categories', [...oldCategories!, category]);
  };

  const handleClickToogleAcess = (event: React.MouseEvent<HTMLButtonElement>) => {
    const user = structuredClone(formikRef.current?.values);
    delete user?.mode;

    const callBack = () => {
      toast.success('Acesso alterado com sucesso!', { toastId: 'toogle-user' });
      navigate('/access');
    };

    dispatch(actionsAuth.remove({ data: { ...user, active: !user?.active }, callBack }));
  };

  const onCreate = (formikValues: Auth & Mode) => {
    const values = structuredClone(formikValues);

    const callBack = () => {
      toast.success('Acesso cadastrado com sucesso!');
      navigate('/access');
    };

    dispatch(actionsAuth.register({ data: values, callBack }));
  };

  const onUpdate = (formikValues: Auth & Mode) => {
    const values = structuredClone(formikValues);

    const callBack = () => {
      toast.success('Dados atualizados com sucesso!', { toastId: 'update-user' });
      navigate('/access');
    };

    dispatch(actionsAuth.update({ data: values, callBack }));
  };

  const handleSubmit = (formikValues: Auth & Mode) => {
    formikValues.mode === 'create' ? onCreate(formikValues) : onUpdate(formikValues);
  };

  React.useEffect(() => {
    if (auth.type === 'user') return navigate('/home');

    if (categories === null) dispatch(actionsCategory.fetch({}));

    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('id');

    const setUpdateData = (data: Auth[]) => {
      const result = data?.find((athlete) => athlete._id === userId);
      if (!result) return toast.warning('Acesso não encontrado para edição!');

      formikRef.current?.setValues(result);
      formikRef.current?.setFieldValue('mode', 'update');
      setPageTitle('Atualizar dados do Acesso');
    };

    if (userId) {
      users === null ? dispatch(actionsAuth.fetch({ callBack: setUpdateData })) : setUpdateData(users);
    } else {
      setPageTitle('Registrar Acesso');
    }

    return () => {};
  }, []);

  if (auth.type === 'user') return <></>;

  return (
    <main className="w-full h-full py-9 overflow-y-auto">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <ShowIf
        as="section"
        show={loading.fetch || loadingCategories.fetch}
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
        to="/access"
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
              <small className="mb-2 font-normal text-sm text-black/70">Cadastrar novo acesso</small>
              <h1 className="font-changa font-semibold text-xl text-black/70">Informe os dados para cadastrar um novo acesso</h1>

              <fieldset className="mt-5 grid-cols-1">
                <Input
                  type="text"
                  name="name"
                  value={values.name}
                  error={errors.name}
                  placeholder="Nome"
                  className="capitalize py-8 desk:py-6"
                />
              </fieldset>

              <fieldset className="mt-3 grid-cols-1">
                <Input
                  type="text"
                  name="email"
                  value={values.email}
                  error={errors.email}
                  placeholder="Email"
                  className="py-8 desk:py-6"
                />
              </fieldset>

              <fieldset className="mt-3 grid-cols-1">
                <Input
                  type="text"
                  name="password"
                  value={values.password}
                  error={errors.password}
                  placeholder="Senha"
                  className="py-8 desk:py-6"
                />
              </fieldset>

              <fieldset style={{ gridTemplateColumns: '1fr' }} className="mt-7 grid gap-2.5">
                <span className="mb-2.5 font-normal text-sm text-black">Tipo de acesso</span>

                <label className="mb-2 flex items-center gap-3 select-none">
                  <Input type="radio" name="type" value="user" className="flex !w-5 h-5 mt-0.5 accent-primary shadow-none" />
                  <span>Usuário</span>
                </label>

                <label className="flex items-center gap-3 select-none">
                  <Input type="radio" name="type" value="admin" className="flex !w-5 h-5 mt-0.5 accent-primary shadow-none" />
                  <span>Admin</span>
                </label>
              </fieldset>

              <ShowIf as="div" show={values.type === 'user'}>
                <fieldset style={{ gridTemplateColumns: '1fr' }} className="mt-7 grid gap-2.5 items-end">
                  <span className="mb-1 font-normal text-sm text-black">Categorias</span>

                  <ul className="flex flex-wrap gap-x-2 gap-y-3">
                    {categories?.map((category) => {
                      return (
                        <button
                          key={category._id}
                          type="button"
                          data-value={category.name}
                          onClick={handleClickCategory}
                          style={{
                            backgroundColor: values.categories?.includes(category.name) ? '#0284c7' : 'white',
                            color: values.categories?.includes(category.name) ? 'white' : 'black',
                            borderColor: errors.categories ? 'red' : '',
                          }}
                          className="box w-12 py-1 flex items-center justify-center bg-white !shadow-none rounded-md"
                        >
                          <span>S{category.name}</span>
                        </button>
                      );
                    })}
                  </ul>

                  <ErrorMessage name="categories" component="div" className="mt-1 text-sm text-red-500" />
                </fieldset>
              </ShowIf>

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

              <ShowIf show={values.mode === 'update'}>
                <Button
                  type="button"
                  loading={loading.remove}
                  disabled={loading.create || loading.update || loading.remove}
                  onClick={handleClickToogleAcess}
                  className="py-3 mt-2  bg-transparent border border-slate-300 rounded-md normal-case text-sm font-normal text-black/60"
                >
                  {values.active ? 'Desativar acesso' : 'Ativar acesso'}
                </Button>
              </ShowIf>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
}
