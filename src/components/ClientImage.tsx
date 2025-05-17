'use client';

import { useState } from 'react';

interface ClientImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
}

export function ClientImage({ src, alt, fallbackSrc, className }: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
} 