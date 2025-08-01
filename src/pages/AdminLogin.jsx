import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { validateLoginForm } from '../utils/validation';

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
            setErrors({
                username: "",
                password: ""
            })

            setIsAuthenticated(true)
            localStorage.setItem("auth", true);
            navigate("/dashboard");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            required
                        />
                    </label>
                    {errors.username != "" && <p>{errors.username}</p>}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            required
                        />
                    </label>
                    {errors.password != "" && <p>{errors.password}</p>}
                </div>
                <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
            </form>
        </div>
    );
};