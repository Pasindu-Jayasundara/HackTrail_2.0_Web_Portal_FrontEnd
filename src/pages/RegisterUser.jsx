import { useState, useEffect } from "react";
import { getTeam, registerUser } from "../api/api";

export default function RegisterUser() {
    const teamId = 7;

    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        tg: "",
        level: "",
        gender: "",
        phone_no: ""
    });

    const [availableLevels, setAvailableLevels] = useState([]);

    useEffect(() => {
        const allLevels = [0, 1, 2, 3, 4];

        getTeam(teamId)
            .then(res => {
                const takenLevels = res.members.map(member => member.level);
                const openLevels = allLevels.filter(level => !takenLevels.includes(level));
                setAvailableLevels(openLevels);
            })
            .catch(err => console.error(err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            team_id: teamId,
            ...userForm
        };

        registerUser(newUser)
            .then(res => console.log(res))
            .catch(err => console.error(err));

        // Reset form after submission
        setUserForm({
            name: "",
            email: "",
            tg: "",
            level: "",
            gender: "",
            phone_no: ""
        });
    };

    return (
        <main>
            <h2>Individual Registration</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userForm.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userForm.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>TG Number:</label>
                    <input
                        type="text"
                        name="tg"
                        value={userForm.tg}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Level:</label>
                    <select
                        name="level"
                        value={userForm.level}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select level</option>
                        {availableLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={userForm.gender}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone_no"
                        value={userForm.phone_no}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </main>
    );
}
