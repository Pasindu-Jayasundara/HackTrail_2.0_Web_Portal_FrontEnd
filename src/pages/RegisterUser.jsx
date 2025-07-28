import { useState, useEffect } from "react"
import { getTeam, registerUser } from "../api/api";

export default function RegisterUser() {
    const id = 7;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        tg: "",
        level: "",
        gender: "",
        phone_no: ""
    });

    const [empSlots, setEmpSlots] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const arr = [0, 1, 2, 3, 4];

        getTeam(id).then(res => {
            const levels = res.members.map(mem => mem.level)
            const emptyLevels = arr.filter(level => !levels.includes(level))
            setEmpSlots(emptyLevels)
        }).catch(err => {
            console.error(err);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            "team_id": id,
            ...formData
        }

        registerUser(user).then(res => console.log(res))
            .catch(err => {
                console.error(err);
            });

        setFormData({
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>TG Number:</label>
                    <input
                        type="text"
                        name="tg"
                        value={formData.tg}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Level:</label>
                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select level</option>
                        {
                            empSlots.map((level, idx) => {
                                return <option key={idx} value={level}>{level}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
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
                        value={formData.phone_no}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </main>
    )
}