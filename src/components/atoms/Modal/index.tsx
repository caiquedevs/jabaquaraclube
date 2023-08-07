import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';

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
    containerRef.current!.style.transform = 'translateY(110%)';
    backDropRef.current!.style.backgroundColor = 'transparent';

    setTimeout(() => {
      setPayloadModal(undefined);
      setIsOpen(false);
      props.callBackClose?.();
    }, 200);
  };

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

  return (
    <div>
      <button
        ref={backDropRef}
        type="button"
        onClick={closeModal}
        className="w-full h-full fixed top-0 left-0 bg-black/80 animate-fadeIn cursor-default duration-200"
      />

      <div className="w-auto fixed inset-0 overflow-y-auto">
        <div className="w-auto flex min-h-full items-center justify-center lg:p-4 pb-0 text-center">
          {props.children(payloadModal)}
        </div>
      </div>
    </div>
  );
}
export default forwardRef(ModalComponent);
