import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="*" element={<Navigate to="/auth/login" />} />
        <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<RegisterView />} />
        </Route>


        <Route path="/admin" element={<AppLayout />}>
            <Route index={true} element={<LinkTreeView />} />
            <Route path="profile" element={<ProfileView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};



