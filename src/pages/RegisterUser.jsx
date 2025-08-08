import { useState, useEffect } from "react";
import { getTeam } from "../api/api";
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from "../components/UserForm";

export default function RegisterUser() {
    let { id: teamId } = useParams();

    const navigate = useNavigate()
    const [members, setMembers] = useState([]);

    useEffect(() => {
        getTeam(teamId)
            .then(team => {
                setMembers(team.members)
            })
            .catch(err => console.error(err));
    }, []);

    const userFormProps = {
        members,
        teamId
    }

    return (
        <div className="mb-20 mt-30 w-11/12 mx-auto">
            <button
                onClick={() => navigate("/guidelines")}
                className="px-4 py-2 mb-6 bg-green-600 font-semibold text-white text-sm rounded hover:bg-green-700 transition transition-300 cursor-pointer"
            >
                Guidelines
            </button>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Individual Registration</h2>
            <UserForm {...userFormProps} />
        </div>
    );
}
