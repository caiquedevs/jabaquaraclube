import React from 'react';
import { Drawer as MaterialDrawer, Button, Typography, IconButton } from '@material-tailwind/react';

export interface DrawerProps {
  isOpen: boolean;
  openDrawer: (payload?: any) => void;
  closeDrawer: () => any;
  payload: any;
  setPayload: (payload: any) => void;
}

interface Props {
  children: any;
  backdropDisabled?: boolean;
  hiddenBtnClose?: boolean;
  classBtnTopClose?: string;
  callBackClose?: () => void;
  callBackOpen?: (payload?: any) => void;
  drawerRef: React.ForwardedRef<DrawerProps | undefined>;
  size?: number;
}

export function Drawer(props: Props) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [payloadDrawer, setPayloadDrawer] = React.useState<any>(null);

  const setPayload = (value: any) => {
    setPayloadDrawer(value);
  };

  const openDrawer = (payload?: any) => {
    setPayloadDrawer(payload);
    setIsOpen(true);
    props.callBackOpen?.(payload);
  };

  const closeDrawer = () => {
    setPayloadDrawer(undefined);
    setIsOpen(false);
    props.callBackClose?.();
  };

  React.useImperativeHandle(
    props.drawerRef,
    () => ({
      isOpen,
      openDrawer,
      closeDrawer,
      payload: payloadDrawer,
      setPayload: setPayload,
    }),
    [payloadDrawer, props, isOpen]
  );

  return (
    <MaterialDrawer
      size={props.size}
      placement="right"
      open={isOpen}
      onClose={closeDrawer}
      className="p-4 overflow-y-auto fixed top-0 right-0"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="w-full mt-2.5">{props.children(payloadDrawer)}</div>
      </div>
    </MaterialDrawer>
  );
}
