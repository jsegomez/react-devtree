import { Link } from "react-router-dom";

const LoginView = () => {
    return (
        <>                
            <h1 className="text-4xl text-white font-bold text-center">Iniciar sesión</h1>
            <nav className="mt-10">
                <Link to="/auth/register" className="text-center text-white text-lg block">
                    ¿No tienes una cuenta? Crea una aquí
                </Link>
            </nav>
        </>
    );
}
 
export default LoginView;