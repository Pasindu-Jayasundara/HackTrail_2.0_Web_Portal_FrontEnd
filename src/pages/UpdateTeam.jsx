import { useState, useEffect } from "react";
import { getTeam, updateTeam } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import TeamMembers from "../components/TeamMembers";
import TeamForm from "../components/TeamForm"

export default function UpdateTeam() {
    let { id: teamId } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        getTeam(teamId)
            .then(team => {
                setMembers(team.members);
            })
            .catch(err => console.error(err));
    }, []);


    const handleUpdateTeam = () => {
        const team = {
            members: members
        };

        updateTeam(teamId, team)
            .then(res => {
                console.log(res);
                navigate("/dashboard");
            })
            .catch(err => {
                console.error(err);
            });
    };

    const toDashboard = () => {
        navigate('/dashboard');
    }

    const teamFormProps = {
        members,
        setMembers,
        memberForm,
        setMemberForm,
        editingIndex,
        setEditingIndex,
        admin : true
    }

    const teamMemPrpos = {
        members,
        setMemberForm,
        setMembers,
        setEditingIndex
    }


    return (
        <div className="mb-20 mt-30 w-11/12 mx-auto">
            <button
                onClick={toDashboard}
                className="px-4 py-2 mb-6 bg-green-600 font-semibold text-white text-sm rounded hover:bg-green-700 transition transition-300 cursor-pointer"
            >
                Back
            </button>
            <div>

                <h2 className="text-3xl font-bold mb-8 text-center">Update Team</h2>

                <TeamForm {...teamFormProps} />

                <div className="text-center my-6">
                    <button
                    type="button"
                    onClick={handleUpdateTeam}
                    className="mx-auto px-6 py-3 text-white font-semibold rounded-lg shadow transition duration-300 bg-green-600 hover:bg-green-700 cursor-pointer"
                >
                    Update Team
                </button>
                </div>

                {members.length == 5 && (
                    <p className="text-center text-sm text-gray-600">
                        Team has no empty slots
                    </p>
                )}

                {members.length > 0 && (
                    <div className="mt-5">
                        <TeamMembers {...teamMemPrpos} />
                    </div>
                )}

            </div>
        </div>
    );
}
