import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthContext"
import { handleLogOut } from "../api/api";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { useState } from "react";

export default function NavBar() {

    const navigate = useNavigate()
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [openMenu, setOpenMenu] = useState(false);

    const toggelMenu = () => {
        setOpenMenu(prev => !prev);
    }

    const logout = () => {
        handleLogOut().then(res => {
            const loginState = res.isLogged;
            if (!loginState) {
                setIsAuthenticated(loginState);
                localStorage.removeItem("auth");
                navigate("/login")
            }
        }).catch(err => console.log(err));
    }

    const login = () => {
        navigate("/login", { replace: true })
    }

    return (
        <nav className="w-full p-3 bg-white/30 backdrop-blur-3xl fixed top-0 left-0 z-20">
            <div className="flex items-center justify-between w-11/12 mx-auto">
                <div>
                    <img
                        src={logo}
                        alt="Aorus Logo"
                        className="w-10 md:w-16 object-contain"
                    />
                </div>
                <div className="hidden w-3/5 md:flex justify-between items-center">
                    <ul className="flex gap-4 font-medium text-gray-800">
                        {!isAuthenticated && <><NavLink to="/"><li className="cursor-pointer hover:text-green-600 transition">Home</li></NavLink>
                            <NavLink to="/teams"><li className="cursor-pointer hover:text-green-600 transition">Teams</li></NavLink></>}
                        {isAuthenticated && <NavLink to="/dashboard"><li className="cursor-pointer hover:text-green-600 transition">Dashboard</li></NavLink>}
                        <NavLink to="/guidelines"><li className="cursor-pointer hover:text-green-600 transition">Guidelines</li></NavLink>
                    </ul>
                    {isAuthenticated ? <button onClick={logout} className="cursor-pointer bg-gray-900 px-4 py-2 text-xs rounded-md text-white uppercase tracking-wide hover:bg-green-600 transition">
                        logout
                    </button> : <button onClick={login} className="cursor-pointer bg-gray-900 px-4 py-2 text-xs rounded-md text-white uppercase tracking-wide hover:bg-green-600 transition">
                        login
                    </button>}
                </div>
                {!openMenu ? <Bars3Icon onClick={toggelMenu} className="w-8 md:hidden cursor-pointer" /> : <XMarkIcon onClick={toggelMenu} className="w-8 md:hidden cursor-pointer" />}
            </div>
            {openMenu && (
                <div className="md:hidden flex flex-col items-center gap-4 p-4">
                    <ul className="flex flex-col items-center gap-4 font-medium text-gray-800">
                        {!isAuthenticated && <><NavLink to="/"><li className="cursor-pointer hover:text-green-600 transition">Home</li></NavLink>
                            <NavLink to="/teams"><li className="cursor-pointer hover:text-green-600 transition">Teams</li></NavLink></>}
                        {isAuthenticated && <NavLink to="/dashboard"><li className="cursor-pointer hover:text-green-600 transition">Dashboard</li></NavLink>}
                        <NavLink to="/guidelines"><li className="cursor-pointer hover:text-green-600 transition">Guidelines</li></NavLink>
                    </ul>
                    {isAuthenticated ? <button onClick={logout} className="cursor-pointer bg-gray-900 px-4 py-2 text-xs rounded-md text-white uppercase tracking-wide hover:bg-green-600 transition">
                        logout
                    </button> : <button onClick={login} className="cursor-pointer bg-gray-900 px-4 py-2 text-xs rounded-md text-white uppercase tracking-wide hover:bg-green-600 transition">
                        login
                    </button>}
                </div>
            )}
        </nav>

    )
}