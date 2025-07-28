import { useEffect, useState } from "react";
import { registerTeam, fetchTeams } from "../api/api";

export default function RegisterTeam() {
    const [members, setMembers] = useState([]);
    const [registeredTeamIds, setRegisteredTeamIds] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        tg: "",
        level: "",
        gender: "",
        phone_no: ""
    });

    useEffect(() => {
        fetchTeams()
            .then(data => {
                const teams = data.map(team => team.team_id_)
                setRegisteredTeamIds(teams)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setMembers(prev => [...prev, formData]);
        setFormData({
            name: "",
            email: "",
            tg: "",
            level: "",
            gender: "",
            phone_no: ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = (index) => {
        const memberToEdit = members[index];
        setFormData(memberToEdit);
        setMembers(prev => prev.filter((_, i) => i !== index)); // remove from list to avoid duplicates
    };

    const handleDelete = (index) => {
        setMembers(prev => prev.filter((_, i) => i !== index));
    };

    const addTeam = () => {
        const team = {
            "team_id" : genTeamId(),
            "members" : members
        }
        registerTeam(team).then(res => console.log(res))
            .catch(err => {
                console.error(err);
            });
    }

    const genTeamId = () => {
        const teamIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        const availableTeamIds = teamIds.filter(id => !registeredTeamIds.includes(id))

        const index = Math.floor(Math.random() * availableTeamIds.length);
        return availableTeamIds[index];
    }

    return (
        <main>
            <h2>Team Registration</h2>
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
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
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

            {members.length > 0 && (
                <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>TG</th>
                            <th>Level</th>
                            <th>Gender</th>
                            <th>Phone No</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={index}>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.tg}</td>
                                <td>{member.level}</td>
                                <td>{member.gender}</td>
                                <td>{member.phone_no}</td>
                                <td>
                                    <button onClick={() => handleEdit(index)}>Edit</button>{" "}
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button type="submit" onClick={addTeam}>Submit Team</button>

        </main>
    );
}
