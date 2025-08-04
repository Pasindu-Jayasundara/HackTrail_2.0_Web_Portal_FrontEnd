import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthContext"
import { handleLogOut } from "../api/api";

export default function NavBar() {

    const navigate = useNavigate()
    const { isAuthenticated, setIsAuthenticated } = useAuth();

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
        <nav className="w-full p-2 bg-white/30 backdrop-blur-3xl fixed top-0 left-0 z-20">
            <div className="flex justify-between items-center w-11/12 mx-auto">
                <img
                src="https://static.cdnlogo.com/logos/w/95/webtorrent.svg"
                alt="Aorus Logo"
                className="w-20 object-contain"
            />
            {!isAuthenticated && <ul className="flex gap-4 font-medium text-gray-800">
                <NavLink to="/"><li className="cursor-pointer hover:text-blue-600 transition">Home</li></NavLink>
                <NavLink to="/teams"><li className="cursor-pointer hover:text-blue-600 transition">Teams</li></NavLink>
                <NavLink to="/reg"><li className="cursor-pointer hover:text-blue-600 transition">Register</li></NavLink>
            </ul>}
            {isAuthenticated ? <button onClick={logout} className="cursor-pointer bg-gray-900 px-4 py-2 text-xs rounded-md text-white uppercase tracking-wide hover:bg-green-600 transition">
                logout
            </button> : <button onClick={login} className="cursor-pointer bg-gray-900 px-4 py-2 text-xs rounded-md text-white uppercase tracking-wide hover:hover:bg-green-600 transition">
                login
            </button>}
            </div>
        </nav>

    )
}