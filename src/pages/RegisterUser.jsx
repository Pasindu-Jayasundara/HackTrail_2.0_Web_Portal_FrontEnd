import { useState, useEffect } from "react";
import { getTeam, registerUser } from "../api/api";
import { useParams } from 'react-router-dom';
import Team from "../components/Team";
import { validateForm } from "../utils/validation";


export default function RegisterUser() {
    let { id: teamId } = useParams();
    
    const [availableLevels, setAvailableLevels] = useState([]);
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        tg: "",
        level: "",
        gender: "",
        phone_no: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        tg: "",
        level: "",
        gender: "",
        phone_no: ""
    })


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
        const validationErrors = validateForm(userForm);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const newUser = {
                team_id: teamId,
                ...userForm
            };

            registerUser(newUser)
                .then(res => console.log(res))
                .catch(err => console.error(err));

            setUserForm({
                name: "",
                email: "",
                tg: "",
                level: "",
                gender: "",
                phone_no: ""
            });

            setErrors({
                name: "",
                email: "",
                tg: "",
                level: "",
                gender: "",
                phone_no: ""
            });
        }
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
                    {errors.name !== "" && <p>{errors.name}</p>}
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
                    {errors.email !== "" && <p>{errors.email}</p>}
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
                    {errors.tg !== "" && <p>{errors.tg}</p>}
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
                    {errors.level !== "" && <p>{errors.level}</p>}
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
                    {errors.gender !== "" && <p>{errors.gender}</p>}
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
                    {errors.phone_no !== "" && <p>{errors.phone_no}</p>}
                </div>
                <button type="submit">Add</button>
            </form>
        </main>
    );
}
