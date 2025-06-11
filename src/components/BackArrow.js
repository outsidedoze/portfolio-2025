import React, { useEffect, useRef, useState } from 'react';

/**
 * BackArrow component that auto-switches between black and white based on the background image under it.
 * Props:
 * - imageSelector: CSS selector for the image to sample under the arrow (or pass imageRef)
 * - style, className, onClick: standard props
 * - sampleOffset: {x, y} offset from top-left of arrow (optional, default: {x: 20, y: 20})
 */
export default function BackArrow({
  imageSelector,
  imageRef: externalImageRef,
  style = {},
  className = '',
  onClick,
  sampleOffset = { x: 20, y: 20 },
  ...props
}) {
  const [isWhite, setIsWhite] = useState(false);
  const arrowRef = useRef(null);

  useEffect(() => {
    let img;
    if (externalImageRef && externalImageRef.current) {
      img = externalImageRef.current;
    } else if (imageSelector) {
      img = document.querySelector(imageSelector);
    }
    if (!img) return;
    if (!img.complete) {
      img.onload = () => sampleColor(img);
    } else {
      sampleColor(img);
    }
    // eslint-disable-next-line
  }, [imageSelector, externalImageRef]);

  function sampleColor(img) {
    // Get arrow position relative to image
    const arrow = arrowRef.current;
    if (!arrow || !img) return;
    const arrowRect = arrow.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    // Calculate sample point in image coordinates
    const x = Math.round((arrowRect.left - imgRect.left) + sampleOffset.x);
    const y = Math.round((arrowRect.top - imgRect.top) + sampleOffset.y);
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // Map x/y to natural size
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const sampleX = Math.round(x * scaleX);
    const sampleY = Math.round(y * scaleY);
    try {
      const pixel = ctx.getImageData(sampleX, sampleY, 1, 1).data;
      const [r, g, b] = pixel;
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      setIsWhite(luminance < 128); // If dark, use white arrow
    } catch (e) {
      // Fallback: use black
      setIsWhite(false);
    }
  }

  // Inline SVG with dynamic fill
  return (
    <span
      ref={arrowRef}
      style={{ display: 'inline-block', ...style }}
      className={className}
      onClick={onClick}
      {...props}
    >
      <svg width="49" height="38" viewBox="0 0 49 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.23223 17.2322C0.255922 18.2085 0.255922 19.7915 1.23223 20.7678L17.1421 36.6777C18.1184 37.654 19.7014 37.654 20.6777 36.6777C21.654 35.7014 21.654 34.1184 20.6777 33.1421L6.53553 19L20.6777 4.85786C21.654 3.88155 21.654 2.29864 20.6777 1.32233C19.7014 0.34602 18.1184 0.34602 17.1421 1.32233L1.23223 17.2322ZM49 19V16.5H3V19V21.5H49V19Z" fill={isWhite ? '#fff' : '#424240'} />
      </svg>
    </span>
  );
}
