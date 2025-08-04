import { useState } from "react";
import { validateForm } from "../utils/validation";

export default function TeamForm({ availableLevels, setMembers, memberForm, setMemberForm, editingIndex, setEditingIndex }){
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setMemberForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        tg: "",
        level: "",
        gender: "",
        phone_no: ""
    })

    const handleAddMember = async (e) => {
        e.preventDefault();
        const validationErrors = await validateForm(memberForm);
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

            setEditingIndex(null)
        }
    };

    return(
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
    )
}