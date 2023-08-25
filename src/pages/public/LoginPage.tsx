import { ChangeEvent, useState } from 'react';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

import * as actionsLogin from 'store/auth/actions';

import { Button, Input } from 'components';
import { FormLayout, TitleForm, DescriptionForm } from 'components/atoms/FormLayout';
import { MdEmail } from 'react-icons/md';
import { Form, Formik, FormikValues } from 'formik';
import { useAppSelector } from 'hooks/useAppSelector';
import { Auth } from 'interfaces/auth';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { toast } from 'react-toastify';

const initialValues = {
  email: '',
  password: '',
};

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useAppSelector((state) => state.authReducer);
  const [captcha, setCaptcha] = React.useState();

  const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_KEY as string;

  const handleChangeCaptcha = (value: any) => {
    if (value) setCaptcha(value);
  };

  const callbackLogin = () => {
    navigate('/home');
  };

  const handleSubmit = (values: typeof initialValues) => {
    if (!captcha) toast.warn('ReCAPTCHA inválido!');
    else dispatch(actionsLogin.loginRequest({ callBack: callbackLogin, data: values }));
  };

  return (
    <main className="w-full h-full py-10 flex flex-col items-center desk:justify-center desk:bg-none bg-[url('/bg-mobile.jpg')] bg-no-repeat bg-cover overflow-y-auto ">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => {
          return (
            <Form className="w-full h-full desk:h-auto desk:max-w-max px-8 desk:px-0">
              <div className="w-full h-full flex flex-col">
                <header className="w-full pt-7 mb-7 flex flex-col desk:items-center">
                  <img src="logo.png" alt="logo" className="hidden desk:flex" />

                  <div className="desk:hidden">
                    <h1 className="font-changa font-semibold text-5xl text-[#da251c]">
                      Bem vindo <br /> de volta
                    </h1>
                    <p className="mt-4 text-lg text-white">Faça login para continuar</p>
                  </div>
                </header>

                <div className="w-full mt-11 desk:mt-0 flex flex-col gap-3">
                  <Input
                    type="email"
                    name="email"
                    required={true}
                    placeholder="Informe seu Email"
                    value={values.email}
                    className="py-8 desk:py-6"
                  />

                  <Input
                    placeholder="Informe sua Senha"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    required={true}
                    value={values.password}
                    minLength={8}
                    className="py-8 desk:py-6"
                  />
                </div>

                <div className="w-full mt-4" style={{ transform: 'scale(1)', transformOrigin: '0 0' }}>
                  <ReCAPTCHA sitekey={RECAPTCHA_KEY} onChange={handleChangeCaptcha} />
                </div>

                <footer className="w-full mt-4 flex flex-col gap-5 absolute desk:relative bottom-0">
                  <Button
                    type="submit"
                    loading={loading.login}
                    disabled={loading.login || !captcha}
                    className="w-full py-5 desk:py-3 bg-[#da251c] font-normal normal-case text-xl desk:text-base rounded-md"
                  >
                    {loading.login ? 'Entrando...' : 'Entrar'}
                  </Button>
                </footer>
              </div>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
}
