import { useState } from "react";
import { validateForm } from "../utils/validation";

export default function TeamForm({ members, setMembers, memberForm, setMemberForm, editingIndex, setEditingIndex, admin }) {
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
        const validationErrors = admin ? await validateForm(memberForm, false) : await validateForm(memberForm, true);
        setErrors(validationErrors);

        const levelInstances = members.filter(mem => mem.level == memberForm.level);

        if (levelInstances.length > 1) {
            setErrors({
                ...setErrors,
                level: "There can be only maximum 2 members from each level"
            })
            return
        }


        if (Object.keys(validationErrors).length === 0) {

            if (editingIndex !== null) {
                setMembers(prev => prev.map((m, i) => i === editingIndex ? memberForm : m));
            } else {

                if (members.length > 4) {
                    return
                }

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

    return (
        <form onSubmit={handleAddMember} className="max-w-xl mx-auto rounded-md border-[1.5px] border-green-600 shadow-lg shadow-green-800/15 space-y-6 bg-white p-8">
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={memberForm.name}
                    onChange={handleFormChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={memberForm.email}
                    onChange={handleFormChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">TG Number</label>
                <input
                    type="text"
                    name="tg"
                    value={memberForm.tg}
                    onChange={handleFormChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                />
                {errors.tg && <p className="text-sm text-red-600 mt-1">{errors.tg}</p>}
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Level</label>
                <select
                    name="level"
                    value={memberForm.level}
                    onChange={handleFormChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                >
                    <option value="">Select level</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>

                </select>
                {errors.level && <p className="text-sm text-red-600 mt-1">{errors.level}</p>}
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
                <select
                    name="gender"
                    value={memberForm.gender}
                    onChange={handleFormChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                >
                    <option value="">Select gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender}</p>}
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
                <input
                    type="text"
                    name="phone_no"
                    value={memberForm.phone_no}
                    onChange={handleFormChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                />
                {errors.phone_no && <p className="text-sm text-red-600 mt-1">{errors.phone_no}</p>}
            </div>
            <button
                type="submit"
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-300 cursor-pointer"
            >
                {editingIndex !== null ? "Update Member" : "Add Member"}
            </button>
        </form>
    )
}