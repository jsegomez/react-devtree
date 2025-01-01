import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { RegisterForm } from "../types/user.types";

const RegisterView = () => {
    const initialValues: RegisterForm = {
        name: '',
        email: '',
        handle: '',
        password: '',
        password_confirmation: ''
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>({
        defaultValues: initialValues
    });

    const watchName = watch('password');

    const onSubmit = (data: RegisterForm) => {
        console.log(data);
    }

    return (
        <>
            <h1 className="text-4xl text-white text-center font-bold">Crear cuenta</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        { ...register('name',
                            {
                                required: 'El nombre es requerido',
                                minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                                maxLength: { value: 50, message: 'El nombre debe tener menos de 50 caracteres' },
                                pattern: { value: /^\s*[a-zA-Z]+(?: [a-zA-Z]+)*\s*$/, message: 'El nombre debe contener solo letras' }
                            })
                        }
                    />
                    {errors.name && <ErrorMessage>{String(errors.name.message)}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email', 
                            {
                                required: 'El email es requerido',                          
                                pattern: {  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'El email no es válido' }
                            }
                        )}
                    />
                    {errors.email && <ErrorMessage>{String(errors.email.message)}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('handle', {
                            required: 'El handle es requerido',
                            minLength: { value: 6, message: 'Tu handle debe tener al menos 6 caracteres' },
                            maxLength: { value: 50, message: 'Tu handle debe tener tener menos de 50 caracteres' },                            
                        })}
                    />
                    {errors.handle && <ErrorMessage>{String(errors.handle.message)}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: 'La contraseña es requerida',
                            minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                            maxLength: { value: 50, message: 'La contraseña debe tener menos de 50 caracteres' },
                        })}
                    />
                    {errors.password && <ErrorMessage>{String(errors.password.message)}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', 
                            {
                                required: "La confirmación de la contraseña es requerida", 
                                validate: (value) => value === watchName || "Las contraseñas no coinciden"
                            })
                        }
                    />
                    {errors.password_confirmation && <ErrorMessage>{String(errors.password_confirmation.message)}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />
            </form>

            <nav className="mt-10">
                <Link to="/auth/login" className="text-center text-white text-lg block">
                    ¿Ya tienes una cuenta? Iniciar sesión
                </Link>
            </nav>
        </>
    );
}

export default RegisterView;