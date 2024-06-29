'use client';

import React, { useId } from 'react';
import Image, { ImageProps } from 'next/image';

const NextImage = ({
  src,
  alt,
  style,
  fill,
  ...props
}: Omit<ImageProps, 'alt'> & { alt?: string }) => {
  const uid = useId();
  return (
    <Image
      src={src}
      alt={alt || uid}
      sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
      loader={({ src }) => src}
      style={fill ? style : { height: 'auto', ...style }}
      fill={fill}
      {...props}
    />
  );
};

export default NextImage;
