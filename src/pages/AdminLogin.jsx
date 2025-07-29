import React, { useState } from 'react';

export default function AdminLogin() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
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
                            value={formData.username}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            required
                        />
                    </label>
                </div>
                <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
            </form>
        </div>
    );
};