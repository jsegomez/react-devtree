import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

// Views
import AppLayout from "./layouts/AppLayout"
import AuthLayout from "./layouts/AuthLayout"
import LinkTreeView from "./views/LinkTreeView"
import LoginView from "./views/LoginView"
import ProfileView from "./views/ProfileView"
import RegisterView from "./views/RegisterView"
import UserView from "./views/UserView"
import NotFoundView from "./views/NotFoundView"

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
        <Route path="/public" element={<AuthLayout />}>
          <Route index={true} element={<div>Por favor especifica un usuario</div>} />
          <Route path="not-found" element={<NotFoundView />} />
          <Route path=":user" element={<UserView />}></Route>
        </Route>
        <Route path="*" element={ <Navigate to="/auth/login" /> } />
      </Routes>      
    </BrowserRouter>
  )
}


