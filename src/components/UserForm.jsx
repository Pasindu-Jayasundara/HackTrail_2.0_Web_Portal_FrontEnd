import { useState } from "react";
import { validateForm } from "../utils/validation";
import { registerUser } from "../api/api";

export default function UserForm({ availableLevels, teamId }) {

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = await validateForm(userForm);
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
        <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto rounded-md border-[1.5px] border-green-600 shadow-lg shadow-green-800/15 space-y-6 bg-white p-8">
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={handleInputChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleInputChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">TG Number</label>
                <input
                    type="text"
                    name="tg"
                    value={userForm.tg}
                    onChange={handleInputChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                />
                {errors.tg && <p className="text-sm text-red-600 mt-1">{errors.tg}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Level</label>
                <select
                    name="level"
                    value={userForm.level}
                    onChange={handleInputChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                >
                    <option value="">Select level</option>
                    {availableLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
                {errors.level && <p className="text-sm text-red-600 mt-1">{errors.level}</p>}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
                <select
                    name="gender"
                    value={userForm.gender}
                    onChange={handleInputChange}
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
                    value={userForm.phone_no}
                    onChange={handleInputChange}
                    className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-green-400 focus:border-green-400 block w-full p-3"
                />
                {errors.phone_no && <p className="text-sm text-red-600 mt-1">{errors.phone_no}</p>}
            </div>

            <button
                type="submit"
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-300"
            >
                Register
            </button>
        </form>

    )
}