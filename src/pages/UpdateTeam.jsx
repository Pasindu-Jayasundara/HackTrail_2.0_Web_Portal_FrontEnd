import { useState, useEffect } from "react";
import { getTeam, updateTeam } from "../api/api";

export default function UpdateTeam() {
    const teamId = 1;

    const [members, setMembers] = useState([]);
    const [memberForm, setMemberForm] = useState({
        name: "",
        email: "",
        tg: "",
        level: "",
        gender: "",
        phone_no: ""
    });

    useEffect(() => {
        getTeam(teamId)
            .then(team => setMembers(team.members))
            .catch(err => console.error(err));
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setMemberForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditMember = (index) => {
        const memberToEdit = members[index];
        setMemberForm(memberToEdit);
        setMembers(prev => prev.filter((_, i) => i !== index));
    };

    const handleDeleteMember = (index) => {
        setMembers(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        setMembers(prev => [...prev, memberForm]);
        setMemberForm({
            name: "",
            email: "",
            tg: "",
            level: "",
            gender: "",
            phone_no: ""
        });
    };

    const handleUpdateTeam = () => {
        const team = {
            team_id: teamId,
            members: members
        };

        updateTeam(teamId, team)
            .then(res => console.log(res))
            .catch(err => {
                console.error(err);
            });
    };

return (
    <main>
        <h2>Update Team</h2>

        <form onSubmit={handleAddMember}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={memberForm.name}
                    onChange={handleFormChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={memberForm.email}
                    onChange={handleFormChange}
                    required
                />
            </div>
            <div>
                <label>TG Number:</label>
                <input
                    type="text"
                    name="tg"
                    value={memberForm.tg}
                    onChange={handleFormChange}
                    required
                />
            </div>
            <div>
                <label>Level:</label>
                <select
                    name="level"
                    value={memberForm.level}
                    onChange={handleFormChange}
                    required
                >
                    <option value="">Select level</option>
                    {[0, 1, 2, 3, 4].map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Gender:</label>
                <select
                    name="gender"
                    value={memberForm.gender}
                    onChange={handleFormChange}
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
                    value={memberForm.phone_no}
                    onChange={handleFormChange}
                    required
                />
            </div>
            <button type="submit">Add Member</button>
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
                                <button type="button" onClick={() => handleEditMember(index)}>Edit</button>{" "}
                                <button type="button" onClick={() => handleDeleteMember(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        <button type="button" onClick={handleUpdateTeam} style={{ marginTop: '20px' }}>
            Update Team
        </button>
    </main>
);
}
