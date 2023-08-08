import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

export interface ModalProps {
  isOpen: boolean;
  openModal: (payload?: any) => void;
  closeModal: () => any;
  payload: any;
  setPayload: (payload: any) => void;
}

interface PageProps {
  children: any;
  backdropDisabled?: boolean;
  hiddenBtnClose?: boolean;
  classBtnTopClose?: string;
  callBackClose?: () => void;
  callBackOpen?: (payload?: any) => void;
  centered?: boolean;
  size?: 'xl' | 'lg' | 'sm';
}

function ModalComponent(props: PageProps, ref: ForwardedRef<ModalProps | undefined>) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const backDropRef = React.useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [payloadModal, setPayloadModal] = useState<any>(null);

  const setPayload = (value: any) => {
    setPayloadModal(value);
  };

  const openModal = (payload?: any) => {
    setPayloadModal(payload);
    setIsOpen(true);

    props.callBackOpen?.(payload);
  };

  const closeModal = () => {
    setPayloadModal(undefined);
    setIsOpen(false);

    props.callBackClose?.();
  };

  const handleOpen = (value: any) => (value ? openModal() : closeModal());

  useImperativeHandle(
    ref,
    () => ({
      isOpen,
      openModal,
      closeModal,
      payload: payloadModal,
      setPayload: setPayload,
    }),
    [payloadModal, props, isOpen]
  );

  if (!isOpen) return <></>;
  {
    props.children(payloadModal);
  }
  return (
    <Dialog open={isOpen} size="xs" handler={handleOpen} className="!p-0">
      <DialogBody>{props.children(payloadModal)}</DialogBody>
    </Dialog>
  );
}
export default forwardRef(ModalComponent);
