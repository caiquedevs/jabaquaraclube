import React from 'react';
import { Button, Input, Modal, ShowIf } from 'components';
import { ModalProps } from 'components/atoms/Modal';
import { Link } from 'react-router-dom';
import { Form, Formik, FormikProps } from 'formik';
import { useDispatch } from 'react-redux';

import * as actionsCategory from 'store/category/actions';
import { toast } from 'react-toastify';
import { useAppSelector } from 'hooks/useAppSelector';
import { Mode } from 'interfaces/mode';
import { Category } from 'interfaces/category';
import { checkChanges } from 'utils/checkChangesObject';

const initialValues = {
  _id: '',
  name: '',
  mode: 'create',
};

export function CategoryPage() {
  const dispatch = useDispatch();

  const modalRef = React.useRef<ModalProps>(null);
  const formikRef = React.useRef<FormikProps<typeof initialValues>>(null);

  const { categories, loading } = useAppSelector((state) => state.categoryReducer);
  const { auth } = useAppSelector((state) => state.authReducer);

  const callbackCloseModal = () => formikRef.current?.resetForm();
  const openModal = (payload?: any) => modalRef.current?.openModal(payload);
  const closeModal = () => modalRef.current?.closeModal();

  const onCreate = ({ name }: typeof initialValues) => {
    const callBack = () => {
      toast.success('Categoria cadastrada com sucesso!', { toastId: 'createCategory' });
      closeModal();
    };

    dispatch(actionsCategory.create({ data: { name }, callBack }));
  };

  const onUpdate = ({ _id, name }: typeof initialValues) => {
    const callBack = () => {
      toast.success('Categoria cadastrada com sucesso!', { toastId: 'updateCategory' });
      closeModal();
    };

    dispatch(actionsCategory.update({ data: { _id, name }, callBack }));
  };

  const handleSubmit = (formikValues: typeof initialValues) => {
    const findCategory = categories?.find((category) => category._id == formikValues._id);
    const nameExist = categories?.find((category) => category.name.toString() == formikValues.name.toString());

    if (checkChanges({ ...findCategory, mode: formikValues.mode }, formikValues)) {
      if (nameExist) toast.warn('Já existe uma categoria com esse nome!');
      else formikValues.mode === 'update' ? onUpdate(formikValues) : onCreate(formikValues);
    } else {
      modalRef.current?.closeModal();
    }
  };

  React.useEffect(() => {
    if (categories === null) dispatch(actionsCategory.fetch({}));
    return () => {};
  }, []);

  return (
    <main className="w-full h-full overflow-y-auto ">
      <header style={{ borderColor: '#DDDFE2' }} className="desk:border-b">
        <section style={{ maxWidth: '938px' }} className="w-full h-full mx-auto">
          <div className="w-full pt-10 pb-7 px-5 desk:px-0 flex flex-col desk:flex-row items-center justify-between gap-5">
            <div className="w-full desk:w-auto flex items-center justify-between">
              <Link to="/home" className="desk:absolute desk:-left-12">
                <svg width="36" height="31" viewBox="0 0 36 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.12418 15.5L8.56129 14.9715L8 15.5L8.56129 16.0285L9.12418 15.5ZM9.68706 16.0285L16.0473 10.057L14.9216 9L8.56129 14.9715L9.68706 16.0285ZM8.56129 16.0285L14.9216 22L16.0473 20.943L9.68706 14.9715L8.56129 16.0285ZM9.12418 16.2464L29 16.2464L29 14.7536L9.12418 14.7536L9.12418 16.2464Z"
                    fill="black"
                  />
                </svg>
              </Link>

              <h1 className="desk:font-changa font-semibold text-xl desk:text-4xl text-black/70 absolute left-1/2 -translate-x-1/2 desk:relative desk:left-0 desk:translate-x-0">
                Categorias
              </h1>
            </div>

            <ShowIf show={auth.type === 'admin'}>
              <button type="button" onClick={openModal} className="px-6 py-2 bg-primary rounded-md mb-1 hidden desk:flex">
                <span className="font-semibold text-white text-sm">Cadastrar nova categoria</span>
              </button>
            </ShowIf>

            <button
              type="button"
              onClick={openModal}
              className="box w-full pl-4 pr-4 py-4 items-center justify-between bg-white rounded-md mb-1 flex desk:hidden"
            >
              <div className="flex items-center gap-5">
                <svg width="6" height="50" viewBox="0 0 6 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="6" height="50" rx="3" fill="#EE5253" />
                </svg>

                <div className="flex flex-col gap-1">
                  <span className="font-medium text-black/60 text-base normal-case">Pressione aqui para</span>
                  <span className="font-medium text-black/80 text-[16px] normal-case">Cadastrar nova categoria</span>
                </div>
              </div>

              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 21.25C15.3542 21.25 15.6513 21.13 15.8913 20.89C16.1313 20.65 16.2508 20.3533 16.25 20V16.25H20C20.3542 16.25 20.6513 16.13 20.8913 15.89C21.1313 15.65 21.2508 15.3533 21.25 15C21.25 14.6458 21.13 14.3488 20.89 14.1088C20.65 13.8688 20.3533 13.7492 20 13.75H16.25V10C16.25 9.64584 16.13 9.34875 15.89 9.10875C15.65 8.86875 15.3533 8.74917 15 8.75C14.6458 8.75 14.3488 8.87 14.1088 9.11C13.8688 9.35 13.7492 9.64667 13.75 10V13.75H10C9.64584 13.75 9.34875 13.87 9.10875 14.11C8.86875 14.35 8.74917 14.6467 8.75 15C8.75 15.3542 8.87 15.6513 9.11 15.8913C9.35 16.1313 9.64667 16.2508 10 16.25H13.75V20C13.75 20.3542 13.87 20.6513 14.11 20.8913C14.35 21.1313 14.6467 21.2508 15 21.25ZM6.25 26.25C5.5625 26.25 4.97375 26.005 4.48375 25.515C3.99375 25.025 3.74917 24.4367 3.75 23.75V6.25C3.75 5.5625 3.995 4.97375 4.485 4.48375C4.975 3.99375 5.56334 3.74917 6.25 3.75H23.75C24.4375 3.75 25.0263 3.995 25.5163 4.485C26.0063 4.975 26.2508 5.56334 26.25 6.25V23.75C26.25 24.4375 26.005 25.0263 25.515 25.5163C25.025 26.0063 24.4367 26.2508 23.75 26.25H6.25Z"
                  fill="#EE5253"
                />
              </svg>
            </button>
          </div>

          <div className="hidden gap-7 px-5 desk:px-0 desk:flex">
            <span className="w-[59px] h-0.5 bg-primary absolute bottom-0 lef-5 desk:left-0 duration-200" />

            <button type="button" className="px-1 pb-2">
              <span className="font-semibold text-black/70 text-base">Todos</span>
            </button>
          </div>
        </section>
      </header>

      <section style={{ maxWidth: '938px' }} className="w-full h-full pt-0 desk:pt-8 mx-auto flex flex-col">
        <ul className="pb-20 px-5 desk:px-0 grid grid-cols-1 desk:grid-cols-5 gap-x-6 gap-y-4 desk:gap-y-8">
          {categories?.map((category) => {
            const handleClickEdit = () => {
              openModal();
              formikRef.current?.setValues({ ...category, mode: 'update' });
            };

            return (
              <li key={category._id} className="box bg-white rounded-lg">
                <div className="w-1.5 h-full bg-slate-300 rounded-l-lg absolute left-0 top-0" />

                <ShowIf show={auth.type === 'admin'}>
                  <button
                    type="button"
                    onClick={handleClickEdit}
                    className="p-1.5 rounded-md bg-slate-100 absolute top-2 right-1.5 z-10"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.0909 4.062C16.1622 4.17016 16.1939 4.29959 16.1808 4.42844C16.1677 4.5573 16.1105 4.67767 16.0189 4.76925L9.12418 11.6633C9.05364 11.7337 8.96564 11.7842 8.86918 11.8095L5.99743 12.5595C5.9025 12.5843 5.80275 12.5838 5.70807 12.5581C5.6134 12.5323 5.52709 12.4823 5.45772 12.413C5.38835 12.3436 5.33833 12.2573 5.31262 12.1626C5.28692 12.0679 5.28642 11.9682 5.31118 11.8733L6.06118 9.00225C6.08307 8.91607 6.12437 8.83603 6.18193 8.76825L13.1022 1.8525C13.2076 1.74716 13.3506 1.688 13.4997 1.688C13.6487 1.688 13.7917 1.74716 13.8972 1.8525L16.0189 3.9735C16.0458 4.00051 16.07 4.03016 16.0909 4.062ZM14.8257 4.371L13.4997 3.04575L7.11118 9.43425L6.64243 11.229L8.43718 10.7603L14.8257 4.371Z"
                        fill="black"
                      />
                      <path
                        d="M14.7312 12.87C14.9362 11.118 15.0016 9.35241 14.9269 7.59C14.9253 7.54848 14.9322 7.50707 14.9473 7.46835C14.9624 7.42964 14.9853 7.39446 15.0147 7.365L15.7527 6.627C15.7728 6.60672 15.7984 6.59269 15.8264 6.58661C15.8543 6.58052 15.8834 6.58264 15.9102 6.5927C15.937 6.60276 15.9603 6.62033 15.9773 6.64331C15.9943 6.6663 16.0043 6.69371 16.0062 6.72225C16.1451 8.81568 16.0923 10.9174 15.8487 13.0012C15.6717 14.5177 14.4537 15.7065 12.9439 15.8752C10.3229 16.1655 7.6779 16.1655 5.05691 15.8752C3.54791 15.7065 2.32916 14.5177 2.15216 13.0012C1.84121 10.3428 1.84121 7.65719 2.15216 4.99875C2.32916 3.48225 3.54716 2.2935 5.05691 2.12475C7.04619 1.90416 9.05045 1.85072 11.0487 1.965C11.0773 1.96705 11.1047 1.97726 11.1276 1.99441C11.1506 2.01156 11.1682 2.03493 11.1783 2.06176C11.1884 2.0886 11.1906 2.11776 11.1846 2.1458C11.1787 2.17385 11.1648 2.1996 11.1447 2.22L10.3999 2.964C10.3707 2.99306 10.3359 3.01584 10.2976 3.03093C10.2593 3.04602 10.2183 3.05311 10.1772 3.05175C8.50972 2.99507 6.84038 3.05898 5.18216 3.243C4.69761 3.29663 4.2453 3.51204 3.89827 3.85444C3.55125 4.19683 3.32979 4.64622 3.26966 5.13C2.96894 7.70124 2.96894 10.2988 3.26966 12.87C3.32979 13.3538 3.55125 13.8032 3.89827 14.1456C4.2453 14.488 4.69761 14.7034 5.18216 14.757C7.69841 15.0382 10.3024 15.0382 12.8194 14.757C13.304 14.7034 13.7563 14.488 14.1033 14.1456C14.4503 13.8032 14.671 13.3538 14.7312 12.87Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </ShowIf>

                <div className="pt-9 pb-4 desk:pb-14 flex justify-center">
                  <span className="font-semibold text-4xl text-black/60">S</span>
                  <span className="number-category flex flex-col font-semibold text-4xl text-black/60">{category.name}</span>
                </div>

                <div className="pl-7 pb-6 flex flex-col">
                  <span className="text-lg text-black/60">{category.qtd.toString().padStart(2, '0')}</span>
                  <span className="font-semibold text-lg">Atletas</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, errors }) => {
          return (
            <Modal size="sm" ref={modalRef} callBackClose={callbackCloseModal}>
              {() => (
                <Form className="w-full h-full bg-white px-5 py-6">
                  <div className="mt-2 mb-4">
                    <h1 className="font-changa font-semibold text-2xl text-black/60">
                      {values?.mode === 'update' ? 'Atualizar' : 'Cadastrar'} categoria
                    </h1>

                    <small className="mb-4 mt-1.5 font-normal text-base text-black/70">
                      Informe o número da Categoria abaixo para {values?.mode === 'update' ? 'atualizar esta' : 'cadastrar uma'}
                      categoria!
                    </small>
                  </div>

                  <fieldset className="w-full mt-3 flex flex-col justify-center">
                    <span className=" pr-3 absolute left-4 z-10 text-black/80 font-semibold border-r border-black/20">SUB</span>

                    <Input
                      type="number"
                      name="name"
                      value={values.name}
                      error={errors.name}
                      required={true}
                      inputMode="decimal"
                      autoFocus={true}
                      className="pl-[68px] py-8 desk:py-6 rounded-md text-black"
                    />
                  </fieldset>

                  <Button
                    type="submit"
                    loading={loading.create || loading.update}
                    disabled={loading.create || loading.update}
                    className="py-3 mt-6 bg-primary rounded-md normal-case text-sm font-normal"
                  >
                    {loading.create || loading.update
                      ? 'Salvando...'
                      : values.mode === 'update'
                      ? 'Salvar alterações'
                      : 'Continuar'}
                  </Button>

                  <Button
                    type="button"
                    disabled={loading.create || loading.update}
                    onClick={closeModal}
                    className="py-3 mt-2  bg-transparent border border-slate-300 rounded-md normal-case text-sm font-normal text-black/60"
                  >
                    Cancelar
                  </Button>
                </Form>
              )}
            </Modal>
          );
        }}
      </Formik>
    </main>
  );
}
