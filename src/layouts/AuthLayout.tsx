import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="bg-slate-800 min-h-screen">
        <div className="max-w-lg mx-auto pt-10 px-5">
          <img src="/logo.svg" alt="devtree" />
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          <Outlet />
        </div>
    </div>
  )
}
