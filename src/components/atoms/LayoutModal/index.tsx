import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
  formClassName?: string;
};

export function LayoutModal(props: Props) {
  return (
    <div
      id="crypto-modal"
      aria-hidden="true"
      className="w-screen md:w-450px lg:w-450px overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-h-full">
        <div className="relative bg-white lg:rounded-lg shadow">
          <div className="px-6 py-4 flex items-center justify-between lg:justify-start border-b rounded-t" tabIndex={0}>
            <h3 className="text-base font-semibold text-slate-900 lg:text-xl">{props.title}</h3>
            <button
              type="button"
              className="text-slate-400 lg:hidden bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="px-6 pb-6 pt-4">
            {props.description ? <p className="text-sm font-normal text-slate-500">{props.description}</p> : null}
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export const TitleLayoutModal = ({ children, className }: any) => {
  return <h1 className={`mb-1.5 font-changa font-semibold text-3xl text-black/70 ${className}`}>{children}</h1>;
};

export const DescriptionLayoutModal = ({ children, className }: any) => {
  return <p className={`mb-7 lg:mb-6 font-roboto font-normal text-base text-black/60 ${className}`}>{children}</p>;
};
