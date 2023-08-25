import { ShowIf } from 'components/atoms/ShowIf';
import React from 'react';
import { LiaTrashAlt } from 'react-icons/lia';

type Props = {
  name: string;
  label?: string;
  value: any;
  onChange: (name: string, certificate: File) => void;
  onRemove: (name: string) => void;
};

export function FileInput(props: Props) {
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files?.[0]) return;

    const file = event.currentTarget.files?.[0];
    const fileSizeLimit = 1 * 1024 * 1024; // 5 MB

    if (file.size > fileSizeLimit) {
      alert('O arquivo selecionado excede o limite de tamanho de 1 MB.');
      return;
    }

    props.onChange(props.name, file);
  };

  const handleRemoveFile = () => {
    props.onRemove(props.name);
  };

  return (
    <label>
      <input type="file" name={props.name} onChange={handleChangeFile} value={''} accept=".jpg, .jpeg, .png" className="hidden" />

      <div
        className={`w-full h-[66px] desk:h-13 px-3 flex items-center justify-center rounded-base border border-dashed border-slate-400 cursor-pointer ${
          props.value ? 'border-teal-500 bg-teal-100' : ''
        }`}
      >
        <span className="w-full text-black/70 text-xs duration-100">{props.label}</span>

        <div>
          <ShowIf as="div" show={props.value?.name || props.value} className="w-full h-full flex items-center jutify-center">
            <ShowIf show={props.value?.name}>
              <button
                data-value="certificateValidity.file"
                type="button"
                onClick={handleRemoveFile}
                className="absolute -right-1"
              >
                <LiaTrashAlt className="text-primary text-2xl" />
              </button>
            </ShowIf>
          </ShowIf>

          <ShowIf as="div" show={!props.value?.name && !props.value?.uri} className="w-full flex items-center justify-end">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 3C8.91 3 6.48 5.3475 6.14025 8.34375C5.48673 8.44906 4.87385 8.7291 4.36646 9.15423C3.85908 9.57936 3.47608 10.1338 3.258 10.7587C1.413 11.2905 0 12.936 0 15C0 17.493 2.007 19.5 4.5 19.5H19.5C21.993 19.5 24 17.493 24 15C24 13.68 23.3587 12.498 22.4295 11.6715C22.2555 9.036 20.1532 6.933 17.508 6.7965C16.605 4.59975 14.5335 3 12 3ZM12 4.5C14.0715 4.5 15.7275 5.8275 16.3125 7.71L16.4775 8.25H17.25C19.3162 8.25 21 9.93375 21 12V12.375L21.3045 12.6097C21.672 12.8914 21.9706 13.253 22.1777 13.6671C22.3849 14.0812 22.4951 14.537 22.5 15C22.5 16.707 21.207 18 19.5 18H4.5C2.793 18 1.5 16.707 1.5 15C1.5 13.485 2.5875 12.309 3.96 12.0705L4.45275 11.9767L4.5465 11.4832C4.7715 10.473 5.667 9.75 6.75 9.75H7.5V9C7.5 6.4725 9.4725 4.5 12 4.5ZM12 8.6955L11.46 9.21075L8.46 12.2108L9.54 13.2908L11.25 11.5778V16.5H12.75V11.5778L14.46 13.2892L15.54 12.2092L12.54 9.20925L12 8.6955Z"
                fill="black"
                fillOpacity="0.4"
              />
            </svg>
          </ShowIf>
        </div>
      </div>
    </label>
  );
}
