import { isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { useForm } from "react-hook-form";


import { errorToast, successToast } from "../layouts/sonner-alert";
import api from "../utils/axios";
import FormErrorMessage from "../components/FormErrorMessage";
import type { LoginFormData } from "../types/forms";


export default function LoginView() {  
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isValid, errors } } = useForm<LoginFormData>({
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const session = await api.post("/auth/login", data);                  
      sessionStorage.setItem('token', session.data.token)
      toast("Inicio de sesión exitoso", successToast);
      navigate('/admin');

    } catch (error) {      
      if(isAxiosError(error)){
        const statusCode = error.status;
        console.log(error.status)
        if(statusCode === 401)toast.error("Usuario o contraseña incorrectos", errorToast);
        if(statusCode === 404)toast.error("Usuario no encontrado", errorToast);
      } else {
        toast.error("Error al crear el usuario", errorToast);
      }
    }
  }
  
  return (
    <div className="animate__animated animate__fadeIn animate__faster">
      <h1 className="text-4xl text-white font-bold text-center">Iniciar sesión</h1>

      <form
        onSubmit={ handleSubmit(onSubmit) }
        className="bg-white px-5 py-20 rounded-lg space-y-4 mt-10"
      >
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
                required: { value: true, message: "El email es requerido" },
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "El email no es válido" },
             })
            }
          />
          <div className="h-4">
            { errors.email && <FormErrorMessage message={errors.email.message!} /> }
          </div>
        </div>

        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: { value: true, message: "El password es requerido" },
              minLength: { value: 8, message: "El password debe tener al menos 8 caracteres" },
              maxLength: { value: 60, message: "El password debe tener menos de 60 caracteres" }
            })}
          />
          <div className="h-1">
            { errors.password && <FormErrorMessage message={errors.password.message!} /> }
          </div>
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer hover:bg-cyan-500 disabled:opacity-50"
          disabled={ !isValid  }
          value='Iniciar sesión'
        />
      </form>      

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


