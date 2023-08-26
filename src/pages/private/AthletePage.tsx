import React from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import { Athlete } from 'interfaces/athlete';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAge } from 'utils/getAge';
import { Helmet } from 'react-helmet';
import { AthleteViewer, Button } from 'components';
import { DrawerProps } from 'components/atoms/Drawer';
import * as actionsAthlete from 'store/athlete/actions';
import * as actionsCategory from 'store/category/actions';

export function AthletePage() {
  const dispatch = useDispatch();

  const barRef = React.useRef<HTMLSpanElement>(null);
  const selectRef = React.useRef<HTMLSelectElement>(null);
  const inputSearchRef = React.useRef<HTMLInputElement>(null);
  const drawerRef = React.useRef<DrawerProps>(null);

  const { athletes, loading } = useAppSelector((state) => state.athleteReducer);
  const { categories, loading: categoriesLoading } = useAppSelector((state) => state.categoryReducer);

  const [filtered, setFiltered] = React.useState<Athlete[] | null>([]);

  const filterApply = () => {
    const currentStatus = inputSearchRef.current?.getAttribute('status');
    const searchValue = inputSearchRef.current?.value;
    const categoryValue = selectRef.current?.value;

    let result = [] as Athlete[] | undefined | null;

    if (currentStatus === 'irregular') {
      result = athletes?.filter(
        (athlete) =>
          athlete.situation.status === 'irregular' &&
          (athlete.name.toLowerCase().includes(searchValue?.toLowerCase()!) ||
            athlete.cpf.value.replace(/\D/g, '').includes(searchValue!))
      );
    } else {
      result = athletes?.filter(
        (athlete) =>
          athlete.name.toLowerCase().includes(searchValue?.toLowerCase()!) ||
          athlete.cpf.value.replace(/\D/g, '').includes(searchValue!)
      );
    }

    if (categoryValue) {
      result = result?.filter((athlete) => !categoryValue || athlete.category?.name === categoryValue);
    }

    setFiltered(result!);
  };

  const handleClickFilterAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    inputSearchRef.current!.setAttribute('status', 'all');

    barRef.current!.style.width = event.currentTarget.clientWidth + 3 + 'px';
    barRef.current!.style.left = event.currentTarget.offsetLeft + 'px';

    filterApply();
  };

  const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    inputSearchRef.current!.setAttribute('status', 'irregular');

    barRef.current!.style.width = event.currentTarget.clientWidth + 'px';
    barRef.current!.style.left = event.currentTarget.offsetLeft + 'px';

    filterApply();
  };

  React.useEffect(() => {
    if (categories === null) dispatch(actionsCategory.fetch({}));

    if (athletes === null) dispatch(actionsAthlete.fetch({ callBack: (athletes) => setFiltered(athletes) }));
    else setFiltered(athletes);
    return () => {};
  }, [athletes]);

  return (
    <main className="w-full h-full overflow-y-auto ">
      <Helmet>
        <title>Gerenciar Atletas</title>
      </Helmet>

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
                Atletas
              </h1>
            </div>

            <Link to="/register-athlete" type="button" className="w-full desk:w-auto">
              <Button type="button" className="w-max px-6 py-2 bg-primary rounded-md mb-1 hidden desk:flex">
                <span className="font-semibold text-white text-base normal-case">Cadastrar novo atleta</span>
              </Button>

              <button
                type="button"
                className="box w-full pl-4 pr-4 py-4 items-center justify-between bg-white rounded-md mb-1 flex desk:hidden"
              >
                <div className="flex items-center gap-5">
                  <svg width="6" height="50" viewBox="0 0 6 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="6" height="50" rx="3" fill="#EE5253" />
                  </svg>

                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-black/60 text-base normal-case">Pressione aqui para</span>
                    <span className="font-medium text-black/80 text-[17px] normal-case">Cadastrar um novo atleta</span>
                  </div>
                </div>

                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 21.25C15.3542 21.25 15.6513 21.13 15.8913 20.89C16.1313 20.65 16.2508 20.3533 16.25 20V16.25H20C20.3542 16.25 20.6513 16.13 20.8913 15.89C21.1313 15.65 21.2508 15.3533 21.25 15C21.25 14.6458 21.13 14.3488 20.89 14.1088C20.65 13.8688 20.3533 13.7492 20 13.75H16.25V10C16.25 9.64584 16.13 9.34875 15.89 9.10875C15.65 8.86875 15.3533 8.74917 15 8.75C14.6458 8.75 14.3488 8.87 14.1088 9.11C13.8688 9.35 13.7492 9.64667 13.75 10V13.75H10C9.64584 13.75 9.34875 13.87 9.10875 14.11C8.86875 14.35 8.74917 14.6467 8.75 15C8.75 15.3542 8.87 15.6513 9.11 15.8913C9.35 16.1313 9.64667 16.2508 10 16.25H13.75V20C13.75 20.3542 13.87 20.6513 14.11 20.8913C14.35 21.1313 14.6467 21.2508 15 21.25ZM6.25 26.25C5.5625 26.25 4.97375 26.005 4.48375 25.515C3.99375 25.025 3.74917 24.4367 3.75 23.75V6.25C3.75 5.5625 3.995 4.97375 4.485 4.48375C4.975 3.99375 5.56334 3.74917 6.25 3.75H23.75C24.4375 3.75 25.0263 3.995 25.5163 4.485C26.0063 4.975 26.2508 5.56334 26.25 6.25V23.75C26.25 24.4375 26.005 25.0263 25.515 25.5163C25.025 26.0063 24.4367 26.2508 23.75 26.25H6.25Z"
                    fill="#EE5253"
                  />
                </svg>
              </button>
            </Link>
          </div>

          <div className="flex gap-7 px-5 desk:px-0">
            <span ref={barRef} className="w-[59px] h-0.5 bg-primary absolute bottom-0 lef-5 desk:left-0 duration-200" />

            <button type="button" onClick={handleClickFilterAll} className="px-1 pb-2">
              <span className="font-semibold text-black/70 text-base">Todos</span>
            </button>

            <button type="button" onClick={handleClickFilter} className="px-1 pb-2">
              <span className="font-semibold w-max text-black/70 text-base">Irregulares</span>
            </button>
          </div>
        </section>
      </header>

      <section style={{ maxWidth: '938px' }} className="w-full h-full pt-4 desk:pt-5 mx-auto flex flex-col">
        <div className="px-5 desk:px-0 flex">
          <select
            ref={selectRef}
            disabled={categoriesLoading.fetch}
            onChange={filterApply}
            className="box px-4 w-44 h-[66px] rounded-l-md !border-r-0 desk:h-13  text-black/70"
          >
            <option value="" className="hidden">
              {categoriesLoading.fetch ? 'Carregando...' : 'Categorias'}
            </option>
            <option value="">Todas</option>
            {categories?.map((category) => {
              return (
                <option key={category._id} value={category.name}>
                  S{category.name}
                </option>
              );
            })}
          </select>

          <input
            ref={inputSearchRef}
            type="search"
            name="search"
            onChange={filterApply}
            placeholder="Pesquisar atleta"
            className="box w-full px-4 py-5 border-l-0 placeholder:text-base desk:placeholder:text-sm desk:py-3 !rounded-r-md"
          />
        </div>

        <div className="box w-full mt-4 bg-white desk:rounded-t-lg">
          <span className="px-7 pt-5 pb-4 font-semibold text-lg text-black/70 hidden desk:flex">Lista de atletas</span>

          {loading.fetch ? (
            <div className="px-7 py-2.5 desk:py-4 flex items-center justify-between border-y border-border-primary">
              <div className="flex items-center gap-7">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-300 animate-pulse-intense" />
                <div className="w-64 desk:w-52 h-4 bg-slate-300 animate-pulse-intense" />
              </div>

              <div className="w-52 h-4 bg-slate-300 animate-pulse-intense hidden desk:block" />
              <div className="w-20 h-4 bg-slate-300 animate-pulse-intense hidden desk:block" />
              <div className="w-28 h-4 bg-slate-300 animate-pulse-intense hidden desk:block" />
              <div className="w-8 h-8  bg-slate-300 animate-pulse-intense hidden desk:block rounded-full" />
            </div>
          ) : null}

          {!loading.fetch && filtered && filtered.length === 0 ? (
            <div className="px-7 py-4 desk:py-[24px] flex items-center justify-between border-t border-border-primary">
              <div className="flex items-center gap-7">
                <span className="text-base text-black/80">Nenhum resultado encontrado</span>
              </div>
            </div>
          ) : null}

          <ul className="w-full h-full">
            {filtered?.map((athlete) => {
              const idade = getAge(athlete.birth.date);
              const handleClickView = () => drawerRef.current?.openDrawer(athlete);

              return (
                <li
                  key={athlete._id}
                  className="px-7 py-2.5 desk:py-4 flex items-center justify-between border-t border-border-primary select-none"
                >
                  <div className="flex items-center gap-4 desk:gap-7">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-300 animate-fadeIn">
                      <span className="font-semibold text-base text-black/70 uppercase">S{athlete.category?.name}</span>
                    </div>

                    <strong className="min-w-[300px] font-semibold text-[17px] desk:text-base text-black/80 capitalize animate-fadeIn">
                      {athlete.name}
                    </strong>
                  </div>

                  <span className="text-base text-black/70 hidden desk:block">{athlete.cpf.value}</span>
                  <span className="text-base text-black/70 hidden desk:block">{idade}</span>
                  <span
                    className={`font-semibold text-base hidden desk:block ${
                      athlete.situation.status === 'regular' ? 'text-green-500' : 'text-primary'
                    }`}
                  >
                    {athlete.situation.status}
                  </span>

                  <div className="gap-3 hidden desk:flex">
                    <Button onClick={handleClickView} type="button" className="w-8 h-8 px-0 py-0 rounded-full bg-slate-100">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 6.75C9.46289 6.75 9.89941 6.83789 10.3096 7.01367C10.7197 7.18945 11.0771 7.42969 11.3818 7.73438C11.6865 8.03906 11.9297 8.39941 12.1113 8.81543C12.293 9.23145 12.3809 9.66797 12.375 10.125C12.375 10.5937 12.2871 11.0303 12.1113 11.4346C11.9355 11.8389 11.6953 12.1963 11.3906 12.5068C11.0859 12.8174 10.7256 13.0605 10.3096 13.2363C9.89355 13.4121 9.45703 13.5 9 13.5C8.53125 13.5 8.09473 13.4121 7.69043 13.2363C7.28613 13.0605 6.92871 12.8203 6.61816 12.5156C6.30762 12.2109 6.06445 11.8535 5.88867 11.4434C5.71289 11.0332 5.625 10.5937 5.625 10.125C5.625 9.66211 5.71289 9.22559 5.88867 8.81543C6.06445 8.40527 6.30469 8.04785 6.60938 7.74316C6.91406 7.43848 7.27148 7.19531 7.68164 7.01367C8.0918 6.83203 8.53125 6.74414 9 6.75ZM9 12.375C9.31055 12.375 9.60059 12.3164 9.87012 12.1992C10.1396 12.082 10.3799 11.9209 10.5908 11.7158C10.8018 11.5107 10.9629 11.2734 11.0742 11.0039C11.1855 10.7344 11.2441 10.4414 11.25 10.125C11.25 9.81445 11.1914 9.52441 11.0742 9.25488C10.957 8.98535 10.7959 8.74512 10.5908 8.53418C10.3857 8.32324 10.1484 8.16211 9.87891 8.05078C9.60938 7.93945 9.31641 7.88086 9 7.875C8.68945 7.875 8.39941 7.93359 8.12988 8.05078C7.86035 8.16797 7.62012 8.3291 7.40918 8.53418C7.19824 8.73926 7.03711 8.97656 6.92578 9.24609C6.81445 9.51562 6.75586 9.80859 6.75 10.125C6.75 10.4355 6.80859 10.7256 6.92578 10.9951C7.04297 11.2646 7.2041 11.5049 7.40918 11.7158C7.61426 11.9268 7.85156 12.0879 8.12109 12.1992C8.39062 12.3105 8.68359 12.3691 9 12.375ZM9 2.25C9.83789 2.25 10.6699 2.35254 11.4961 2.55762C12.3223 2.7627 13.1016 3.07031 13.834 3.48047C14.5664 3.89063 15.2285 4.38867 15.8203 4.97461C16.4121 5.56055 16.8984 6.24609 17.2793 7.03125C17.5137 7.51758 17.6924 8.01855 17.8154 8.53418C17.9385 9.0498 18 9.58008 18 10.125H16.875C16.875 9.43359 16.7695 8.78613 16.5586 8.18262C16.3477 7.5791 16.0576 7.02832 15.6885 6.53027C15.3193 6.03223 14.8799 5.58691 14.3701 5.19434C13.8604 4.80176 13.3184 4.4707 12.7441 4.20117C12.1699 3.93164 11.5576 3.72656 10.9072 3.58594C10.2568 3.44531 9.62109 3.375 9 3.375C8.36719 3.375 7.73145 3.44531 7.09277 3.58594C6.4541 3.72656 5.84473 3.93164 5.26465 4.20117C4.68457 4.4707 4.13965 4.80176 3.62988 5.19434C3.12012 5.58691 2.68359 6.03223 2.32031 6.53027C1.95703 7.02832 1.66406 7.5791 1.44141 8.18262C1.21875 8.78613 1.11328 9.43359 1.125 10.125H0C0 9.58594 0.0615234 9.05859 0.18457 8.54297C0.307617 8.02734 0.486328 7.52344 0.720703 7.03125C1.0957 6.25781 1.5791 5.5752 2.1709 4.9834C2.7627 4.3916 3.42773 3.89063 4.16602 3.48047C4.9043 3.07031 5.68359 2.76562 6.50391 2.56641C7.32422 2.36719 8.15625 2.26172 9 2.25Z"
                          fill="black"
                        />
                      </svg>
                    </Button>

                    <Link
                      to={`/register-athlete?id=${athlete._id}`}
                      state={{ athlete }}
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.4549 5.41601C21.5499 5.56022 21.5922 5.7328 21.5747 5.9046C21.5573 6.0764 21.481 6.23691 21.3589 6.35901L12.1659 15.551C12.0718 15.645 11.9545 15.7123 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7784 7.61109 16.7441C7.48485 16.7098 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.3431 7.08382 16.2168C7.04955 16.0906 7.04888 15.9576 7.08189 15.831L8.08189 12.003C8.11109 11.8881 8.16616 11.7814 8.24289 11.691L17.4699 2.47001C17.6105 2.32956 17.8011 2.25067 17.9999 2.25067C18.1986 2.25067 18.3893 2.32956 18.5299 2.47001L21.3589 5.29801C21.3948 5.33402 21.4269 5.37355 21.4549 5.41601ZM19.7679 5.82801L17.9999 4.06101L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.82801Z"
                          fill="black"
                        />
                        <path
                          d="M19.6406 17.16C19.9139 14.824 20.0012 12.4699 19.9016 10.12C19.8994 10.0646 19.9087 10.0094 19.9288 9.95782C19.9489 9.9062 19.9795 9.85928 20.0186 9.82001L21.0026 8.83601C21.0295 8.80897 21.0636 8.79027 21.1008 8.78215C21.1381 8.77404 21.1769 8.77686 21.2126 8.79027C21.2483 8.80368 21.2794 8.82712 21.3021 8.85776C21.3248 8.88841 21.3381 8.92495 21.3406 8.96301C21.5258 11.7542 21.4555 14.5566 21.1306 17.335C20.8946 19.357 19.2706 20.942 17.2576 21.167C13.7629 21.554 10.2362 21.554 6.74157 21.167C4.72957 20.942 3.10457 19.357 2.86857 17.335C2.45397 13.7904 2.45397 10.2096 2.86857 6.66501C3.10457 4.64301 4.72857 3.05801 6.74157 2.83301C9.39394 2.53889 12.0663 2.46764 14.7306 2.62001C14.7687 2.62275 14.8052 2.63635 14.8359 2.65922C14.8665 2.68209 14.8899 2.71325 14.9034 2.74903C14.9169 2.78481 14.9198 2.82369 14.9119 2.86108C14.9039 2.89847 14.8854 2.93281 14.8586 2.96001L13.8656 3.95201C13.8267 3.99076 13.7803 4.02113 13.7292 4.04125C13.6781 4.06137 13.6234 4.07082 13.5686 4.06901C11.3453 3.99343 9.11952 4.07866 6.90857 4.32401C6.26251 4.39552 5.65942 4.68273 5.19672 5.13926C4.73403 5.59579 4.43874 6.19497 4.35857 6.84001C3.95762 10.2683 3.95762 13.7317 4.35857 17.16C4.43874 17.805 4.73403 18.4042 5.19672 18.8608C5.65942 19.3173 6.26251 19.6045 6.90857 19.676C10.2636 20.051 13.7356 20.051 17.0916 19.676C17.7376 19.6045 18.3407 19.3173 18.8034 18.8608C19.2661 18.4042 19.5604 17.805 19.6406 17.16Z"
                          fill="black"
                        />
                      </svg>
                    </Link>
                  </div>

                  <button
                    onClick={handleClickView}
                    type="button"
                    className="w-full h-full absolute left-0 top-0 bg-transparent cursor-default desk:hidden"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <AthleteViewer drawerRef={drawerRef} />
    </main>
  );
}
