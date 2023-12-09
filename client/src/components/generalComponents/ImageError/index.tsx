interface ErrorFallbackImageProps {
  alt: string;
  src: string | undefined;
  className?: string;
}
const ImageError = ({ alt, src, className }: ErrorFallbackImageProps) => {
  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = '';
    event.currentTarget.alt = 'image not found';
  };

  return (
    <img
      className={className}
      src={src ? src : ''}
      alt={alt}
      onError={handleError}
    />
  );
};

export default ImageError;
