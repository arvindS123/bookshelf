interface Props {
  message: string;
  onClose?: () => void;
}

export default function ErrorMessage({ message, onClose }: Props) {
  return (
    <div className="error-message">
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="error-close">
          ×
        </button>
      )}
    </div>
  );
}