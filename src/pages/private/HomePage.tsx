import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as actionsAuth from 'store/auth/actions';
import * as actionsLog from 'store/actionLogs/actions';

import React from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import { format } from 'date-fns';

export function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { actionLogs, loading } = useAppSelector((state) => state.actionLogReducer);

  const bgLinear = 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(41, 24, 24, 0.56) 56.25%, #492A2A 100%)';

  const handleClickNavigate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const url = event.currentTarget.getAttribute('data-route');
    navigate(url!);
  };

  const handleClickLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(actionsAuth.logoutUser());
  };

  React.useEffect(() => {
    if (actionLogs === null) dispatch(actionsLog.fetch({}));

    return () => {};
  }, []);

  return (
    <main className="w-full h-full pb-10 overflow-y-auto">
      <Helmet>
        <title>Jabaquara Atlético Clube</title>
      </Helmet>

      <header
        style={{ backgroundImage: "url('/bg-jhc.jpg')", backgroundPositionY: '18%' }}
        className="w-full h-72 px-11 flex-col justify-center bg-no-repeat bg-cover hidden desk:flex"
      >
        <div style={{ backgroundImage: bgLinear }} className="w-full h-full absolute top-0 left-0" />

        <div className="flex flex-col gap-3 mb-10">
          <span className="text-2xl text-white">Olá, bem vindo ao</span>
          <h1 className="font-changa font-semibold text-4xl text-white">JABAQUARA ATLÉTICO CLUBE</h1>
        </div>
      </header>

      <section className="w-full px-7 desk:px-11 desk:-mt-14">
        <span className="mb-2 text-white text-lg hidden desk:flex">Escolha uma opção</span>

        <div className="mt-11 mb-6 text-xl text-black/80 block desk:hidden">
          <p>Escolha uma das</p>
          <p className="flex items-center gap-1.5">
            opções <strong className="text-primary">Abaixo</strong>
          </p>
        </div>

        <ul className="flex flex-col desk:grid grid-cols-4 gap-3 desk:gap-6">
          <li>
            <button
              type="button"
              data-route="/athletes"
              onClick={handleClickNavigate}
              className="box w-full py-6 desk:py-4 px-6 rounded-lg flex items-center gap-5 bg-white border-2 border-black cursor-default desk:cursor-pointer"
            >
              <img src="/atleta.svg" alt="atleta icon" />

              <div className="flex flex-col gap-0.5">
                <strong className="font-semibold text-lg desk:text-sm">Atletas</strong>
                <small className="font-normal text-base desk:text-xs">Gerenciar atletas</small>
              </div>
            </button>
          </li>

          <li>
            <button
              type="button"
              data-route="/categories"
              onClick={handleClickNavigate}
              className="box w-full py-6 desk:py-4 px-6 rounded-lg flex items-center gap-5 bg-white border-2 border-black cursor-default desk:cursor-pointer"
            >
              <img src="/categories.svg" alt="categorias icon" />

              <div className="flex flex-col gap-0.5">
                <strong className="font-semibold text-lg desk:text-sm">Categorias</strong>
                <small className="font-normal text-base desk:text-xs">Gerenciar Categorias</small>
              </div>
            </button>
          </li>

          <li>
            <button
              type="button"
              data-route="/access"
              onClick={handleClickNavigate}
              className="box w-full py-6 desk:py-4 px-6 rounded-lg flex items-center gap-5 bg-white border-2 border-black cursor-default desk:cursor-pointer"
            >
              <img src="/key.svg" alt="chave icon" />

              <div className="flex flex-col gap-0.5">
                <strong className="font-semibold text-lg desk:text-sm">Acessos</strong>
                <small className="font-normal text-base desk:text-xs">Gerenciar Acessos</small>
              </div>
            </button>
          </li>

          <li className="block desk:hidden">
            <button
              type="button"
              className="box w-full py-6 desk:py-4 px-6 rounded-lg flex items-center gap-5 bg-slate-200 border-2 border-black cursor-default desk:cursor-pointer"
            >
              <img src="/presenceList.svg" alt="lista icon" />

              <div className="flex flex-col gap-0.5">
                <strong className="font-semibold text-lg desk:text-sm">Lista de presença</strong>
                <small className="font-normal text-base desk:text-xs">Em breve...</small>
              </div>
            </button>
          </li>

          <li>
            <button
              type="button"
              onClick={handleClickLogout}
              className="box w-full py-6 desk:py-4 px-6 rounded-lg flex items-center gap-5 bg-white border-2 border-black cursor-default desk:cursor-pointer"
            >
              <img src="/exit.svg" alt="acesso icon" />

              <div className="flex flex-col gap-0.5">
                <strong className="font-semibold text-lg desk:text-sm">Sair</strong>
                <small className="font-normal text-base desk:text-xs">Sair do sistema</small>
              </div>
            </button>
          </li>
        </ul>
      </section>

      <section className="w-full h-[calc(200vh-106px)] overflow-hidden px-11 mt-9 hidden desk:block">
        <span>Ações recentes</span>
        <div className="box w-full h-full mt-4 bg-white rounded-t-lg">
          {actionLogs?.map((action) => {
            return (
              <div className="w-full py-3 px-4 border-b flex items-center gap-10 text-black/80">
                <span>{format(new Date(action.date!), 'dd/MM/yyyy')}</span>
                <span>{format(new Date(action.date!), 'HH:mm')}</span>
                <span>{action.user.email}</span>
                <span>{action.message}</span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
