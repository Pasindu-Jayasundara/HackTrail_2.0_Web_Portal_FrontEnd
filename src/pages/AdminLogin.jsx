import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { validateLoginForm } from '../utils/validation';
import { handleLogIn } from '../api/api';

export default function AdminLogin() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate()
    const { setIsAuthenticated } = useAuth()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateLoginForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

            handleLogIn(formData).then(res => {
                const loginState = res.isLogged;
                if (loginState) {
                    setErrors({
                        username: "",
                        password: ""
                    })

                    setIsAuthenticated(loginState);
                    localStorage.setItem("auth", loginState);
                    navigate("/dashboard");
                }
            }).catch(err => console.log(err));
        }
    };

    return (

        <div className='w-11/12 mx-auto mt-30 mb-30'>
            <h2 className="text-3xl font-bold text-center text-gray-800">Admin Login</h2>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto rounded-md border-[1.5px] border-green-600 shadow-lg shadow-green-800/15 space-y-6 bg-white p-8 mt-10">

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                />
                {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                />
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            <button
                type="submit"
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-300"
            >
                Login
            </button>
        </form>
        </div>
    );
};