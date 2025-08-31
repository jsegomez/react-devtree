import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import FormErrorMessage from "../components/FormErrorMessage";
import type { RegisterFormData } from "../types/forms";
import api from "../utils/axios";

export default function RegisterView() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { isValid, errors } } = useForm<RegisterFormData>({
    mode: "onTouched",
  });

  const watchPassword = watch("password");  

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await api.post("/auth/register", data);
      console.log(response);
      navigate("/auth/login");      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="animate__animated animate__fadeIn animate__faster">
      <h1 className="text-4xl text-white font-bold text-center">Crear cuenta</h1>

      <form
        onSubmit={ handleSubmit(onSubmit) }
        className="bg-white px-5 py-20 rounded-lg space-y-4 mt-10"
      >
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className={ `${errors.name ? "border-red-500" : "border-slate-300" } bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400` }
            {...register("name", {
              required: { value: true, message: "El nombre es requerido" },
              minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
              maxLength: { value: 60, message: "El nombre debe tener menos de 60 caracteres" }
            })}
          />
          <div className="h-4">
            { errors.name && <FormErrorMessage message={errors.name.message!} /> }
          </div>
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="lastname" className="text-2xl text-slate-500">Apellidos</label>
          <input
            id="lastname"
            type="text"
            placeholder="Apellidos"
            className={ `${errors.lastname ? "border-red-500" : "border-slate-300" } bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400` }
            {...register("lastname", {
              required: { value: true, message: "El apellido es requerido" },
              minLength: { value: 3, message: "El apellido debe tener al menos 3 caracteres" },
              maxLength: { value: 60, message: "El apellido debe tener menos de 60 caracteres" }
            })}
          />
          <div className="h-4">
            { errors.lastname && <FormErrorMessage message={errors.lastname.message!} /> }
          </div>
        </div>
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
          <label htmlFor="username" className="text-2xl text-slate-500">Handle</label>
          <input
            id="username"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("username",
              {
                required: { value: true, message: "El handle es requerido" },
                minLength: { value: 3, message: "El handle debe tener al menos 3 caracteres" },
                maxLength: { value: 60, message: "El handle debe tener menos de 60 caracteres" }
              })}
          />
          <div className="h-4">
            { errors.username && <FormErrorMessage message={errors.username.message || "Campo requerido"} /> }
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

        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="confirm_password" className="text-2xl text-slate-500">Repetir Password</label>
          <input
            id="confirm_password"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("confirmPassword", {
              required: { value: true, message: "El password es requerido" },
              minLength: { value: 8, message: "El password debe tener al menos 8 caracteres" },
              validate: (value) => value === watchPassword || "Contraseñas no coinciden"           
            })}
          />
          <div className="h-1">
            { errors.confirmPassword && <FormErrorMessage message={errors.confirmPassword.message || "Campo requerido"} /> }
          </div>
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer hover:bg-cyan-500 disabled:opacity-50"
          disabled={ !isValid  }
          value='Crear Cuenta'
        />
      </form>

      <nav className="mt-10 pb-4">
        <Link
          to="/auth/login"
          className="text-white text-lg block text-center">
          ¿Ya tienes una cuenta?
          <span className="text-sky-500"> Iniciar sesión</span>
        </Link>
      </nav>
    </div>
  )
}
