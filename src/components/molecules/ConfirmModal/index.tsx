import { Button } from 'components/atoms/Button';
import Modal, { ModalProps } from 'components/atoms/Modal';
import React from 'react';

type Props = {
  modalRef: React.RefObject<ModalProps>;
  onConfirm: () => void;
  onCancel?: () => void;
  loadingConfirm?: boolean;
};

export function ConfirmModal({ modalRef, onConfirm, onCancel, loadingConfirm }: Props) {
  const handleClickCancel = () => {
    modalRef.current?.closeModal();
    onCancel?.();
  };

  const handleClickConfirm = () => {
    onConfirm?.();
  };

  return (
    <Modal ref={modalRef}>
      {() => {
        return (
          <div className="pt-10 text-center">
            <div className="w-max absolute -top-20 left-1/2 -translate-x-1/2">
              <svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="59" r="44" fill="white" />
                <path
                  d="M55 34H65V44H55V34ZM55 54H65V84H55V54ZM60 9C32.4 9 10 31.4 10 59C10 86.6 32.4 109 60 109C87.6 109 110 86.6 110 59C110 31.4 87.6 9 60 9ZM60 99C37.95 99 20 81.05 20 59C20 36.95 37.95 19 60 19C82.05 19 100 36.95 100 59C100 81.05 82.05 99 60 99Z"
                  fill="#EE5253"
                />
                <rect x="55" y="34" width="10" height="10" fill="#EE5253" />
                <rect x="55" y="54" width="10" height="30" fill="#EE5253" />
              </svg>
            </div>

            <div>
              <span className="mt-3 w-max mx-auto font-semibold text-lg text-black/80">Remover Atleta?</span>
              <p className="mt-4 text-base text-black/60">
                Você tem certeza que deseja <br /> remover este atleta? Essa <br /> ação é irreversível!
              </p>
            </div>

            <footer className="w-[calc(100%+32px)] mt-[65px]">
              <div className="w-full flex absolute -bottom-4 -left-4">
                <Button
                  type="button"
                  onClick={handleClickCancel}
                  disabled={loadingConfirm}
                  className="py-4 rounded-none rounded-bl-md font-inter text-black/50 bg-slate-300"
                >
                  Cancelar
                </Button>

                <Button
                  type="button"
                  onClick={handleClickConfirm}
                  loading={loadingConfirm}
                  className="py-4 rounded-none rounded-br-md bg-primary"
                >
                  Confirmar
                </Button>
              </div>
            </footer>
          </div>
        );
      }}
    </Modal>
  );
}
