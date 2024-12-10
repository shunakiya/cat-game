import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate("/play");
  };

  return (
    <>
      <p className="text-xl">Cat Game (Main Page)</p>
      <button onClick={handlePlayClick}>Play now!</button>
    </>
  );
}
