import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

// Views
import LoginView from "./views/LoginView"
import RegisterView from "./views/RegisterView"
import AuthLayout from "./layouts/AuthLayout"
import AppLayout from "./layouts/AppLayout"
import LinkTreeView from "./views/LinkTreeView"
import ProfileView from "./views/ProfileView"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={ <AuthLayout /> }>
          <Route path="login" element={ <LoginView /> } />
          <Route path="register" element={ <RegisterView /> } />
        </Route>

        <Route element={<AppLayout />} path="/admin">
          <Route index={true} element={<LinkTreeView />}></Route>
          <Route path="profile" element={<ProfileView />}></Route>
          <Route path="*" element={ <Navigate to="/admin" /> } />
        </Route>
        <Route path="*" element={ <Navigate to="/auth/login" /> } />
      </Routes>      
    </BrowserRouter>
  )
}


