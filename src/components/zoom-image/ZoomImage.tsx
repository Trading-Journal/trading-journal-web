import mediumZoom from 'medium-zoom';
import React from 'react';

function ImageZoom(props: any) {
  const { zoom, src, alt, background } = props;
  const zoomRef = React.useRef(zoom.clone({ background }));

  function attachZoom(image: any) {
    zoomRef.current.attach(image);
  }

  return <img src={src} alt={alt} ref={attachZoom} />;
}

export const ZoomImage = ({ image }: { image: string }) => {
  const zoom = React.useRef(mediumZoom({ background: '#000', margin: 48 }));

  return (
    <div>
      <ImageZoom
        src={`data:image/png;base64,${image}`}
        alt="Image"
        zoom={zoom.current}
        color="#BADA55"
      />
    </div>
  );
};
