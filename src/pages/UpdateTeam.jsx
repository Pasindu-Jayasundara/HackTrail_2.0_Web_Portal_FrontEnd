import { useState, useEffect } from "react";
import { getTeam, updateTeam } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validation";

export default function UpdateTeam() {
    let { id: teamId } = useParams();
    const navigate = useNavigate();

    const [availableLevels, setAvailableLevels] = useState([])
    const [members, setMembers] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
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
        getTeam(teamId)
            .then(team => {
                setMembers(team.members);
                setAvailableLevels([0, 1, 2, 3, 4]);
            })
            .catch(err => console.error(err));
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

    const handleEditMember = (index) => {
        const memberToEdit = members[index];
        setMemberForm(memberToEdit);
        setEditingIndex(index);
        setAvailableLevels([
            ...availableLevels,
            memberToEdit.level
        ]);
    };

    const handleDeleteMember = (index) => {
        setMembers(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(memberForm);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (editingIndex !== null) {
                setMembers(prev => prev.map((m, i) => i === editingIndex ? memberForm : m));
            } else {
                setMembers(prev => [...prev, memberForm]);
            }

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

        setEditingIndex(null);
    };

    const handleUpdateTeam = () => {
        const team = {
            members: members
        };

        updateTeam(teamId, team)
            .then(res => console.log(res))
            .catch(err => {
                console.error(err);
            });
    };

    const toDashboard = () => {
        navigate('/dashboard');
    }

    return (
        <main>
            <button onClick={toDashboard}>Back</button>
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
                <button type="submit">{editingIndex !== null ? "Update Member" : "Add Member"}</button>
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
