import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthContext"

export default function NavBar() {

    const navigate = useNavigate()
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const logout = () => {
        if(isAuthenticated){
            setIsAuthenticated(false);
            localStorage.removeItem("auth");
            navigate("/login", {replace : true})
        }
    }

    const login = () => {
        navigate("/login", {replace : true})
    }

    return (
        <header className="flex justify-between items-center w-full p-4 bg-green-50">
            <img
                src="https://static.cdnlogo.com/logos/a/75/aorus.png"
                alt="Aorus Logo"
                className="w-20 object-contain"
            />
            {!isAuthenticated && <ul className="flex gap-4 font-medium text-gray-800">
                <NavLink to="/"><li className="cursor-pointer hover:text-blue-600 transition">Home</li></NavLink>
                <NavLink to="/teams"><li className="cursor-pointer hover:text-blue-600 transition">Teams</li></NavLink>
                <NavLink to="/reg"><li className="cursor-pointer hover:text-blue-600 transition">Register</li></NavLink>
            </ul>}
            {isAuthenticated ? <button onClick={logout} className="cursor-pointer bg-blue-600 px-4 py-2 rounded-md text-white uppercase tracking-wide font-medium hover:bg-blue-700 transition">
                logout
            </button> : <button onClick={login} className="cursor-pointer bg-blue-600 px-4 py-2 rounded-md text-white uppercase tracking-wide font-medium hover:bg-blue-700 transition">
                login
            </button>}
        </header>

    )
}