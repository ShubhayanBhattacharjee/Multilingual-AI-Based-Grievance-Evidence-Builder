import {BrowserRouter,Routes, Route} from "react-router-dom"

import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout"

import Home from "../pages/home/Home"
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}/>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes