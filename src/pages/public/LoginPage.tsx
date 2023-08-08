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
    navigate('/');
  };

  const handleSubmit = (values: typeof initialValues) => {
    if (!captcha) toast.warn('ReCAPTCHA inválido!');
    else dispatch(actionsLogin.loginRequest({ callBack: callbackLogin, data: values }));
  };

  return (
    <main className="w-full h-full overflow-y-auto flex flex-col lg:items-center lg:justify-center">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => {
          return (
            <Form style={{ height: 'calc(100% - 60px)' }} className="w-full max-w-lg lg:!h-auto">
              <div className="box min-w-full max-w-full h-full pt-14 pb-12 px-12 justify-between rounded-xl bg-white ">
                <div>
                  <header className="mb-7">
                    <h1 className="font-changa font-semibold text-3xl text-black/80 mb-1.5">Entrar</h1>
                    <p className="text-base text-black/60">Preencha os campos abaixo para prosseguir</p>
                  </header>

                  <div className="flex flex-col gap-5">
                    <label>
                      <span className="mb-2">Email</span>
                      <Input
                        placeholder="Informe seu Email"
                        type="email"
                        name="email"
                        required={true}
                        value={values.email}
                        className="w-full py-6"
                      />
                    </label>

                    <label>
                      <span className="mb-2">Email</span>
                      <Input
                        placeholder="Informe sua Senha"
                        type="password"
                        autoComplete="new-password"
                        name="password"
                        required={true}
                        value={values.password}
                        minLength={8}
                        className="w-full py-6"
                      />
                    </label>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <input type="checkbox" name="persist" id="persist" checked disabled className="w-4 h-4 text-lg" />
                    <span className="font-roboto font-normal text-sm text-black/50 leading-4">Lembre-se de mim</span>
                  </div>
                </div>

                <div className="w-max mt-8">
                  <ReCAPTCHA sitekey={RECAPTCHA_KEY} onChange={handleChangeCaptcha} />
                </div>

                <footer className="mt-9 flex flex-col gap-5">
                  <Button
                    type="submit"
                    loading={loading.login}
                    disabled={loading.login || !captcha}
                    className="w-full py-3 bg-primary font-normal normal-case text-base rounded-md"
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
