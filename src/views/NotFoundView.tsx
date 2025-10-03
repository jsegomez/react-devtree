import { useLocation } from "react-router-dom";

export default function NotFoundView() {
    const location = useLocation();
    const { user } = location.state || {};

  return (
    <p className="font-bold text-2xl text-center text-white">Usuario no encontrado: {user}</p>
  );
}
