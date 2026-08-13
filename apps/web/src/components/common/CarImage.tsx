'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

type CarImageProps = Omit<ImageProps, 'onError' | 'src'> & {
  src: string;
};

/**
 * next/image wrapper that gracefully falls back to a branded placeholder when a
 * remote (mock) car photo fails to load — avoids broken images in the showroom.
 */
export default function CarImage({ src, alt, className, ...rest }: CarImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-charcoal-soft to-charcoal ${className ?? ''}`}
        aria-label={typeof alt === 'string' ? alt : 'Ảnh xe'}
      >
        <span className="font-display text-sm font-semibold tracking-widest text-white/40">
          VŨ BÁCH AUTO
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      quality={70}
      className={className}
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}
