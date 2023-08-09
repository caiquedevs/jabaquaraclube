import { Link } from 'react-router-dom';

type Props = {};

export function CategoryPage({}: Props) {
  return (
    <main className="w-full h-full overflow-y-auto ">
      <header style={{ borderColor: '#DDDFE2' }} className="border-b">
        <section style={{ maxWidth: '1016px' }} className="w-full h-full mx-auto">
          <div className="w-full flex items-center justify-between pt-10 pb-7">
            <div className="flex items-center">
              <Link to="/home" className="absolute -left-12 mb-0.5">
                <svg width="36" height="31" viewBox="0 0 36 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.12418 15.5L8.56129 14.9715L8 15.5L8.56129 16.0285L9.12418 15.5ZM9.68706 16.0285L16.0473 10.057L14.9216 9L8.56129 14.9715L9.68706 16.0285ZM8.56129 16.0285L14.9216 22L16.0473 20.943L9.68706 14.9715L8.56129 16.0285ZM9.12418 16.2464L29 16.2464L29 14.7536L9.12418 14.7536L9.12418 16.2464Z"
                    fill="black"
                  />
                </svg>
              </Link>

              <h1 className="font-changa font-semibold text-4xl text-black/70">Categorias</h1>
            </div>

            <button type="button" className="px-6 py-2 bg-primary rounded-md mb-1">
              <span className="font-semibold text-white text-sm">Cadastrar nova categoria</span>
            </button>
          </div>

          <div className="flex gap-7">
            <button type="button" className="px-2 pb-2 border-b-2 border-primary">
              <span className="font-semibold text-black/70 text-sm">Todas categorias</span>
            </button>
          </div>
        </section>
      </header>

      <section style={{ maxWidth: '1016px' }} className="w-full h-full pt-7 mx-auto flex flex-col">
        <ul className="grid grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((category, index) => {
            return (
              <li className="box bg-white rounded-lg">
                <div className="w-1.5 h-full bg-slate-300 rounded-l-lg absolute left-0 top-0" />

                <button type="button" className="p-1.5 rounded-md bg-slate-100 absolute top-1.5 right-1.5 ">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.0909 4.062C16.1622 4.17016 16.1939 4.29959 16.1808 4.42844C16.1677 4.5573 16.1105 4.67767 16.0189 4.76925L9.12418 11.6633C9.05364 11.7337 8.96564 11.7842 8.86918 11.8095L5.99743 12.5595C5.9025 12.5843 5.80275 12.5838 5.70807 12.5581C5.6134 12.5323 5.52709 12.4823 5.45772 12.413C5.38835 12.3436 5.33833 12.2573 5.31262 12.1626C5.28692 12.0679 5.28642 11.9682 5.31118 11.8733L6.06118 9.00225C6.08307 8.91607 6.12437 8.83603 6.18193 8.76825L13.1022 1.8525C13.2076 1.74716 13.3506 1.688 13.4997 1.688C13.6487 1.688 13.7917 1.74716 13.8972 1.8525L16.0189 3.9735C16.0458 4.00051 16.07 4.03016 16.0909 4.062ZM14.8257 4.371L13.4997 3.04575L7.11118 9.43425L6.64243 11.229L8.43718 10.7603L14.8257 4.371Z"
                      fill="black"
                    />
                    <path
                      d="M14.7312 12.87C14.9362 11.118 15.0016 9.35241 14.9269 7.59C14.9253 7.54848 14.9322 7.50707 14.9473 7.46835C14.9624 7.42964 14.9853 7.39446 15.0147 7.365L15.7527 6.627C15.7728 6.60672 15.7984 6.59269 15.8264 6.58661C15.8543 6.58052 15.8834 6.58264 15.9102 6.5927C15.937 6.60276 15.9603 6.62033 15.9773 6.64331C15.9943 6.6663 16.0043 6.69371 16.0062 6.72225C16.1451 8.81568 16.0923 10.9174 15.8487 13.0012C15.6717 14.5177 14.4537 15.7065 12.9439 15.8752C10.3229 16.1655 7.6779 16.1655 5.05691 15.8752C3.54791 15.7065 2.32916 14.5177 2.15216 13.0012C1.84121 10.3428 1.84121 7.65719 2.15216 4.99875C2.32916 3.48225 3.54716 2.2935 5.05691 2.12475C7.04619 1.90416 9.05045 1.85072 11.0487 1.965C11.0773 1.96705 11.1047 1.97726 11.1276 1.99441C11.1506 2.01156 11.1682 2.03493 11.1783 2.06176C11.1884 2.0886 11.1906 2.11776 11.1846 2.1458C11.1787 2.17385 11.1648 2.1996 11.1447 2.22L10.3999 2.964C10.3707 2.99306 10.3359 3.01584 10.2976 3.03093C10.2593 3.04602 10.2183 3.05311 10.1772 3.05175C8.50972 2.99507 6.84038 3.05898 5.18216 3.243C4.69761 3.29663 4.2453 3.51204 3.89827 3.85444C3.55125 4.19683 3.32979 4.64622 3.26966 5.13C2.96894 7.70124 2.96894 10.2988 3.26966 12.87C3.32979 13.3538 3.55125 13.8032 3.89827 14.1456C4.2453 14.488 4.69761 14.7034 5.18216 14.757C7.69841 15.0382 10.3024 15.0382 12.8194 14.757C13.304 14.7034 13.7563 14.488 14.1033 14.1456C14.4503 13.8032 14.671 13.3538 14.7312 12.87Z"
                      fill="black"
                    />
                  </svg>
                </button>

                <div className="pt-9 pb-14 flex justify-center">
                  <span className="font-semibold text-4xl text-black/60">S</span>
                  <span className="number-category flex flex-col font-semibold text-4xl text-black/60">1{index + 1}</span>
                </div>

                <div className="pl-7 pb-6 flex flex-col">
                  <span className="text-lg">30</span>
                  <span className="font-semibold text-lg">Atletas</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
