import React from 'react';
import { Tooltip } from '@material-tailwind/react';

type Props = {
  uri: string;
};

export function DownloadButton(props: Props) {
  const handleDownload = () => {
    if (props.uri) {
      const downloadLink = document.createElement('a');
      downloadLink.href = `${import.meta.env.VITE_S3_URL}${props.uri}`;
      downloadLink.download = props.uri;
      downloadLink.target = '_self';
      downloadLink.click();
    }
  };

  return (
    <Tooltip content={props.uri ? 'Baixar documento' : 'Sem documento'}>
      <button
        type="button"
        onClick={handleDownload}
        disabled={!props.uri}
        className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg font-bold text-xs ${
          props.uri ? 'bg-primary text-white' : 'bg-slate-200 text-black/40 cursor-not-allowed'
        }`}
      >
        <span className="text-current">DOC</span>
        <span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 3.33337C7.425 3.33337 5.4 5.28962 5.11688 7.7865C4.57228 7.87425 4.06154 8.10762 3.63872 8.46189C3.2159 8.81617 2.89673 9.27817 2.715 9.799C1.1775 10.2421 0 11.6134 0 13.3334C0 15.4109 1.6725 17.0834 3.75 17.0834H16.25C18.3275 17.0834 20 15.4109 20 13.3334C20 12.2334 19.4656 11.2484 18.6912 10.5596C18.5462 8.36337 16.7944 6.61087 14.59 6.49712C13.8375 4.6665 12.1112 3.33337 10 3.33337ZM10 4.58337C11.7262 4.58337 13.1062 5.68962 13.5938 7.25837L13.7312 7.70837H14.375C16.0969 7.70837 17.5 9.1115 17.5 10.8334V11.1459L17.7537 11.3415C18.06 11.5762 18.3088 11.8775 18.4815 12.2226C18.6541 12.5677 18.7459 12.9475 18.75 13.3334C18.75 14.7559 17.6725 15.8334 16.25 15.8334H3.75C2.3275 15.8334 1.25 14.7559 1.25 13.3334C1.25 12.0709 2.15625 11.0909 3.3 10.8921L3.71062 10.814L3.78875 10.4027C3.97625 9.56087 4.7225 8.95837 5.625 8.95837H6.25V8.33337C6.25 6.22712 7.89375 4.58337 10 4.58337Z"
              fill=""
              className="fill-current"
            />
            <path
              d="M10.4502 14.154L10.0002 14.5834L9.5502 14.1552L7.0502 11.6552L7.95019 10.7552L9.3752 12.1815L9.37519 8.07962L10.6252 8.07962L10.6252 12.1815L12.0502 10.754L12.9502 11.654L10.4502 14.154Z"
              className="fill-current"
            />
          </svg>
        </span>
      </button>
    </Tooltip>
  );
}
