import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

export default function AuthLayout() {
    return (
        <>
            <Toaster richColors  />
            <div className="bg-slate-800 min-h-screen">
                <div className="max-w-2xl mx-auto pt-10 px-5">
                    <img src="/logo.svg" alt="DevTree" className="w-full" />

                    <div className="py-10">
                    <Outlet />
                </div>
                </div>
            </div>
        </>
    )
}
