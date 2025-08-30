import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

// Views
import LoginView from "./views/LoginView"
import RegisterView from "./views/RegisterView"
import AuthLayout from "./layouts/AuthLayout"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={ <AuthLayout /> }>
          <Route path="login" element={ <LoginView /> } />
          <Route path="register" element={ <RegisterView /> } />
        </Route>
        <Route path="*" element={ <Navigate to="/auth/login" /> } />
      </Routes>
    </BrowserRouter>
  )
}


