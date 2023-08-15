import { Button } from 'components/atoms/Button';
import { Drawer, DrawerProps } from 'components/atoms/Drawer';
import { ModalProps } from 'components/atoms/Modal';
import { ShowIf } from 'components/atoms/ShowIf';
import { ConfirmModal } from 'components/molecules/ConfirmModal';
import { useAppSelector } from 'hooks/useAppSelector';
import { Athlete } from 'interfaces/athlete';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAge } from 'utils/getAge';
import * as actionsAthlete from 'store/athlete/actions';

type Props = {
  drawerRef: React.RefObject<DrawerProps>;
};

export function AthleteViewer({ drawerRef }: Props) {
  const dispatch = useDispatch();

  const modalRef = React.useRef<ModalProps>(null);

  const { loading } = useAppSelector((state) => state.athleteReducer);

  const handleClickClose = () => {
    drawerRef.current?.closeDrawer();
  };

  const onDelete = () => {
    const athlete = modalRef.current?.payload;

    const callBack = () => {
      modalRef.current?.closeModal();
      drawerRef.current?.closeDrawer();
    };

    dispatch(actionsAthlete.remove({ data: athlete, callBack }));
  };

  return (
    <>
      <Drawer drawerRef={drawerRef} size={800}>
        {(athlete: Athlete | undefined) => {
          const handleClickRemove = () => modalRef.current?.openModal(athlete);

          const idade = getAge(athlete?.dateBirth!);

          return (
            <>
              <section className="w-full px-5">
                <div className="w-full pt-2.5 pb-7 flex items-center absolute left-0 -top-2 desk:hidden">
                  <button onClick={handleClickClose} className="py-2 pr-5">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 17L9 12L14 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <header className="w-full px-10 pt-10 desk:py-8 flex flex-col desk:flex-row items-center justify-between desk:bg-sky-50 rounded-xl">
                  <figure className="flex flex-col desk:flex-row items-center gap-4 desk:gap-10">
                    <ShowIf show={athlete?.uri}>
                      <img
                        alt="foto do atleta"
                        src={import.meta.env.VITE_S3_URL + athlete?.uri}
                        className="w-24 h-24 desk:w-14 desk:h-14 rounded-full object-cover object-top"
                      />
                    </ShowIf>

                    <ShowIf show={!athlete?.uri}>
                      <FaUserCircle className="text-[56px] text-slate-400" />
                    </ShowIf>

                    <figcaption className="flex flex-col items-center desk:items-start">
                      <span className="font-bold text-xl text-primary capitalize">{athlete?.name}</span>
                      <span className="mt-1 text-base text-black/60">
                        {idade} - S{athlete?.category?.name}
                      </span>
                    </figcaption>
                  </figure>

                  <div className="flex items-center gap-2 mt-3 desk:mt-0">
                    <Button
                      type="button"
                      onClick={handleClickRemove}
                      className="w-12 h-12 px-0 py-0 bg-transparent fill-slate-400 hover:fill-red-500"
                    >
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-inherit"
                      >
                        <path
                          d="M11.25 11.25H13.125V22.5H11.25V11.25ZM16.875 11.25H18.75V22.5H16.875V11.25Z"
                          className="fill-inherit"
                        />
                        <path
                          d="M3.75 5.625V7.5H5.625V26.25C5.625 26.7473 5.82254 27.2242 6.17417 27.5758C6.52581 27.9275 7.00272 28.125 7.5 28.125H22.5C22.9973 28.125 23.4742 27.9275 23.8258 27.5758C24.1775 27.2242 24.375 26.7473 24.375 26.25V7.5H26.25V5.625H3.75ZM7.5 26.25V7.5H22.5V26.25H7.5ZM11.25 1.875H18.75V3.75H11.25V1.875Z"
                          className="fill-inherit"
                        />
                      </svg>
                    </Button>

                    <Link
                      to={`/register-athlete?id=${athlete?._id!}`}
                      state={{ athlete }}
                      type="button"
                      className="w-11 h-11 px-0 py-0 pr-0.5 pb-0.5 flex items-center justify-center rounded-full bg-primary"
                    >
                      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.4549 5.41601C21.5499 5.56022 21.5922 5.7328 21.5747 5.9046C21.5573 6.0764 21.481 6.23691 21.3589 6.35901L12.1659 15.551C12.0718 15.645 11.9545 15.7123 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7784 7.61109 16.7441C7.48485 16.7098 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.3431 7.08382 16.2168C7.04955 16.0906 7.04888 15.9576 7.08189 15.831L8.08189 12.003C8.11109 11.8881 8.16616 11.7814 8.24289 11.691L17.4699 2.47001C17.6105 2.32956 17.8011 2.25067 17.9999 2.25067C18.1986 2.25067 18.3893 2.32956 18.5299 2.47001L21.3589 5.29801C21.3948 5.33402 21.4269 5.37355 21.4549 5.41601ZM19.7679 5.82801L17.9999 4.06101L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.82801Z"
                          fill="white"
                        />
                        <path
                          d="M19.6406 17.16C19.9139 14.824 20.0012 12.4699 19.9016 10.12C19.8994 10.0646 19.9087 10.0094 19.9288 9.95782C19.9489 9.9062 19.9795 9.85928 20.0186 9.82001L21.0026 8.83601C21.0295 8.80897 21.0636 8.79027 21.1008 8.78215C21.1381 8.77404 21.1769 8.77686 21.2126 8.79027C21.2483 8.80368 21.2794 8.82712 21.3021 8.85776C21.3248 8.88841 21.3381 8.92495 21.3406 8.96301C21.5258 11.7542 21.4555 14.5566 21.1306 17.335C20.8946 19.357 19.2706 20.942 17.2576 21.167C13.7629 21.554 10.2362 21.554 6.74157 21.167C4.72957 20.942 3.10457 19.357 2.86857 17.335C2.45397 13.7904 2.45397 10.2096 2.86857 6.66501C3.10457 4.64301 4.72857 3.05801 6.74157 2.83301C9.39394 2.53889 12.0663 2.46764 14.7306 2.62001C14.7687 2.62275 14.8052 2.63635 14.8359 2.65922C14.8665 2.68209 14.8899 2.71325 14.9034 2.74903C14.9169 2.78481 14.9198 2.82369 14.9119 2.86108C14.9039 2.89847 14.8854 2.93281 14.8586 2.96001L13.8656 3.95201C13.8267 3.99076 13.7803 4.02113 13.7292 4.04125C13.6781 4.06137 13.6234 4.07082 13.5686 4.06901C11.3453 3.99343 9.11952 4.07866 6.90857 4.32401C6.26251 4.39552 5.65942 4.68273 5.19672 5.13926C4.73403 5.59579 4.43874 6.19497 4.35857 6.84001C3.95762 10.2683 3.95762 13.7317 4.35857 17.16C4.43874 17.805 4.73403 18.4042 5.19672 18.8608C5.65942 19.3173 6.26251 19.6045 6.90857 19.676C10.2636 20.051 13.7356 20.051 17.0916 19.676C17.7376 19.6045 18.3407 19.3173 18.8034 18.8608C19.2661 18.4042 19.5604 17.805 19.6406 17.16Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </header>
              </section>

              <ShowIf
                as="section"
                show={athlete?.mother.phone || athlete?.father.phone}
                className="w-full px-5 mt-4 hidden desk:flex"
              >
                <ShowIf as="div" show={athlete?.mother.phone} className="flex items-center gap-3">
                  <img src="/phone.svg" alt="telefone" />
                  <span className="text-base text-black/70">{athlete?.mother.phone}</span>
                </ShowIf>

                <ShowIf as="div" show={athlete?.father.phone} className="flex items-center">
                  <img src="/arrowPhone.svg" alt="seta" className="mx-3 hidden desk:block" />

                  <div className="flex items-center gap-3">
                    <img src="/phone.svg" alt="telefone" />

                    <span className="text-base text-black/70">{athlete?.father.phone}</span>
                  </div>
                </ShowIf>
              </ShowIf>

              <ShowIf as="section" show={athlete?.certificateValidity.uri} className="w-full px-5 mt-8">
                <h2 className="font-normal text-base text-primary">Atestado médico</h2>

                <div className="mt-4 flex items-center gap-4">
                  <a
                    href={`${import.meta.env.VITE_S3_URL}${athlete?.certificateValidity.uri}`}
                    download={athlete?.certificateValidity.uri}
                    className="w-12 h-12 flex flex-col items-center justify-center rounded-lg bg-primary font-bold text-white text-xs"
                  >
                    <span>DOC</span>
                    <span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 3.33337C7.425 3.33337 5.4 5.28962 5.11688 7.7865C4.57228 7.87425 4.06154 8.10762 3.63872 8.46189C3.2159 8.81617 2.89673 9.27817 2.715 9.799C1.1775 10.2421 0 11.6134 0 13.3334C0 15.4109 1.6725 17.0834 3.75 17.0834H16.25C18.3275 17.0834 20 15.4109 20 13.3334C20 12.2334 19.4656 11.2484 18.6912 10.5596C18.5462 8.36337 16.7944 6.61087 14.59 6.49712C13.8375 4.6665 12.1112 3.33337 10 3.33337ZM10 4.58337C11.7262 4.58337 13.1062 5.68962 13.5938 7.25837L13.7312 7.70837H14.375C16.0969 7.70837 17.5 9.1115 17.5 10.8334V11.1459L17.7537 11.3415C18.06 11.5762 18.3088 11.8775 18.4815 12.2226C18.6541 12.5677 18.7459 12.9475 18.75 13.3334C18.75 14.7559 17.6725 15.8334 16.25 15.8334H3.75C2.3275 15.8334 1.25 14.7559 1.25 13.3334C1.25 12.0709 2.15625 11.0909 3.3 10.8921L3.71062 10.814L3.78875 10.4027C3.97625 9.56087 4.7225 8.95837 5.625 8.95837H6.25V8.33337C6.25 6.22712 7.89375 4.58337 10 4.58337Z"
                          fill="white"
                        />
                        <path
                          d="M10.4502 14.154L10.0002 14.5834L9.5502 14.1552L7.0502 11.6552L7.95019 10.7552L9.3752 12.1815L9.37519 8.07962L10.6252 8.07962L10.6252 12.1815L12.0502 10.754L12.9502 11.654L10.4502 14.154Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </a>

                  <div>
                    <strong className="mb-2 font-semibold text-base text-back/80">Validade</strong>
                    <small className="text-base text-black/70">{athlete?.certificateValidity.date || 'não informado'}</small>
                  </div>
                </div>
              </ShowIf>

              <section className="w-full px-5 mt-8">
                <div className="w-full pb-3 border-b border-border-primary">
                  <h2 className="font-semibold text-base text-primary">Dados pessoais</h2>
                </div>

                <div className="mt-4 flex flex-col desk:flex-row desk:items-center justify-between gap-4">
                  <div>
                    <strong className="mb-2 font-semibold text-base text-back/80">Data de nascimento</strong>
                    <small className="text-base text-black/70">{athlete?.dateBirth}</small>
                  </div>

                  <div>
                    <strong className="mb-2 font-semibold text-base text-back/80">RG</strong>
                    <small className="text-base text-black/70">{athlete?.rg}</small>
                  </div>

                  <div>
                    <strong className="mb-2 font-semibold text-base text-back/80">CPF</strong>
                    <small className="text-base text-black/70">{athlete?.cpf}</small>
                  </div>

                  <div>
                    <strong className="mb-2 font-semibold text-base text-back/80">Categoria</strong>
                    <small className="text-base text-black/70 capitalize">S{athlete?.category?.name}</small>
                  </div>
                </div>

                <ShowIf as="div" show={athlete?.school.name} className="mt-7">
                  <strong className="mb-2 font-semibold text-base text-back/80">Nome da escola</strong>
                  <small className="text-base text-black/70 capitalize">
                    {athlete?.school.name} - {athlete?.school.period}
                  </small>
                </ShowIf>

                <ShowIf as="div" show={athlete?.isFederated.clubName} className="mt-7">
                  <strong className="mb-2 font-semibold text-base text-back/80">Clube de federação</strong>
                  <small className="text-base text-black/70">
                    {athlete?.isFederated.clubName} - {athlete?.isFederated.date}
                  </small>
                </ShowIf>
              </section>

              <ShowIf
                as="section"
                show={athlete?.father.name || athlete?.father.phone || athlete?.mother.name || athlete?.mother.phone}
                className="w-full px-5 mt-11"
              >
                <div className="w-full pb-3 border-b border-border-primary">
                  <h2 className="font-normal text-base text-primary">Contato</h2>
                </div>

                <ShowIf as="div" show={athlete?.father.name || athlete?.father.phone} className="mt-4 flex items-center">
                  <ShowIf as="div" show={athlete?.father.name} className="flex-1">
                    <strong className="mb-2 font-semibold text-base text-back/80">Nome do pai</strong>
                    <small className="text-base text-black/70 capitalize">{athlete?.father.name}</small>
                  </ShowIf>

                  <ShowIf as="div" show={athlete?.father.phone} className="flex-1">
                    <strong className="mb-2 font-semibold text-base text-back/80">Contato do pai</strong>
                    <small className="text-base text-black/70">{athlete?.father.phone}</small>
                  </ShowIf>
                </ShowIf>

                <ShowIf as="div" show={athlete?.mother.name || athlete?.mother.phone} className="mt-7 flex items-center">
                  <div className="flex-1">
                    <strong className="mb-2 font-semibold text-base text-back/80">Nome da mãe</strong>
                    <small className="text-base text-black/70 capitalize">{athlete?.mother.name}</small>
                  </div>

                  <div className="flex-1">
                    <strong className="mb-2 font-semibold text-base text-back/80">Contato da mãe</strong>
                    <small className="text-base text-black/70">{athlete?.mother.phone}</small>
                  </div>
                </ShowIf>
              </ShowIf>

              <section className="w-full px-5 mt-11">
                <div className="w-full pb-3 border-b border-border-primary">
                  <h2 className="font-semibold text-base text-primary">Endereço</h2>
                </div>

                <div className="mt-4 flex flex-col desk:flex-row desk:items-center justify-between gap-4 desk:gap-0">
                  <div>
                    <strong className="mb-2 font-semibold text-base text-back/80">Rua</strong>
                    <small className="text-base text-black/70">{athlete?.address.road}</small>
                  </div>

                  <div>
                    <strong className="mb-2 font-semibold text-base text-back/80">Número</strong>
                    <small className="text-base text-black/70">{athlete?.address.number}</small>
                  </div>

                  <div>
                    <strong className="mb-2 font-semibold text-base text-back/80">CEP</strong>
                    <small className="text-base text-black/70">{athlete?.address.cep}</small>
                  </div>
                </div>
              </section>

              <section className="w-full px-5 mt-11">
                <div className="w-full pb-3 border-b border-border-primary">
                  <h2 className="font-semibold text-base text-primary">Situação Financeira</h2>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <strong className="mb-2 font-semibold text-base text-back/80">Status</strong>
                    <small className="text-base text-black/70 capitalize">{athlete?.situation.status}</small>
                  </div>
                </div>

                <ShowIf as="div" show={athlete?.situation.observation} className="mt-7 flex items-center">
                  <div className="flex-1">
                    <strong className="mb-2 font-semibold text-base text-back/80">Observação</strong>
                    <small className="text-base text-black/70">{athlete?.situation.observation}</small>
                  </div>
                </ShowIf>
              </section>

              <ConfirmModal modalRef={modalRef} onConfirm={onDelete} loadingConfirm={loading.remove} />
            </>
          );
        }}
      </Drawer>
    </>
  );
}
