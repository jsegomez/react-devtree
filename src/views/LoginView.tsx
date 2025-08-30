import { Link } from "react-router-dom"

export default function LoginView() {
  return (
    <div className="animate__animated animate__fadeIn animate__faster">
      <h1 className="text-4xl text-white font-bold text-center">Iniciar sesión</h1>

      <nav className="mt-10"> 
        <Link
          to="/auth/register"
          className="text-white text-lg block text-center">¿No tienes una cuenta?
          <span className="text-sky-500"> Registrarse ahora</span>
        </Link>        
      </nav>
    </div>
  )
}


