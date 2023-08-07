import { ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export function Image({ src, className, ...props }: ImageProps) {
  const pathDefaultImage = '/assets/img_default.jpg';

  const onError = (event: any) => {
    event.target.src = pathDefaultImage;
  };

  return <img src={src || pathDefaultImage} onError={onError} className={`object-contain ${className}`} {...props} />;
}
