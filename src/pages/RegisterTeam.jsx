import { useEffect, useState } from "react";
import { registerTeam, fetchTeams } from "../api/api";
import { validateForm } from "../utils/validation";

export default function RegisterTeam() {
    const [members, setMembers] = useState([]);
    const [registeredTeamIds, setRegisteredTeamIds] = useState([]);
    const [availableLevels, setAvailableLevels] = useState([])

    const [memberForm, setMemberForm] = useState({
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


    const updateLevels = () => {
        const allLevels = [0, 1, 2, 3, 4];
        const takenLevels = members.map(member => parseInt(member.level));
        const openLevels = allLevels.filter(level => !takenLevels.includes(level));
        setAvailableLevels(openLevels);
    }

    useEffect(() => {
        fetchTeams()
            .then(data => {
                const teamIds = data.map(team => team.team_id_);
                setRegisteredTeamIds(teamIds);
                setAvailableLevels([0, 1, 2, 3, 4])
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        updateLevels();
    }, [members])

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setMemberForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleAddMember = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(memberForm);
        console.log(validationErrors);
        setErrors(validationErrors);

        // Only proceed if there are no errors
        if (Object.keys(validationErrors).length === 0) {
            setMembers(prev => [...prev, memberForm]);
            setMemberForm({
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

    const handleEditMember = (index) => {
        const selectedMember = members[index];
        setMemberForm(selectedMember);
        setMembers(prev => prev.filter((_, i) => i !== index));
    };

    const handleDeleteMember = (index) => {
        setMembers(prev => prev.filter((_, i) => i !== index));
    };

    const handleRegisterTeam = () => {
        if (members.length > 2) {
            const team = {
            team_id: generateTeamId(),
            members: members
        };

        registerTeam(team)
            .then(res => console.log(res))
            .catch(err => {
                console.error(err);
            });
        }
    };

    const generateTeamId = () => {
        const allPossibleIds = Array.from({ length: 15 }, (_, i) => i + 1); // [1...15]
        const availableIds = allPossibleIds.filter(id => !registeredTeamIds.includes(id));
        const randomIndex = Math.floor(Math.random() * availableIds.length);
        return availableIds[randomIndex];
    };

    return (
        <main>
            <h2>Team Registration</h2>

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
                    {errors.name !== "" && <p>{errors.name}</p>}
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
                    {errors.email !== "" && <p>{errors.email}</p>}
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
                    {errors.tg !== "" && <p>{errors.tg}</p>}
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
                        value={memberForm.gender}
                        onChange={handleFormChange}
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
                        value={memberForm.phone_no}
                        onChange={handleFormChange}
                        required
                    />
                    {errors.phone_no !== "" && <p>{errors.phone_no}</p>}
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
            {members.length < 3 && <p>Minimum Of 3 Members are needed</p>}
            <button disabled={members.length < 3} type="button" onClick={handleRegisterTeam} style={{ marginTop: '20px' }}>
                Register Team
            </button>
        </main>
    );
}
