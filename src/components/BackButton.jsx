import { useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <img
      src="/back-button.png"
      alt="Back button"
      className="w-[30px] h-[30px] cursor-pointer ml-2"
      onClick={() => navigate(-1)}
    />
  );
}
