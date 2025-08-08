import { useEffect, useState } from "react";
import { registerTeam, fetchTeams } from "../api/api";
import TeamMembers from "../components/TeamMembers";
import TeamForm from "../components/TeamForm"
import { useNavigate } from "react-router-dom";



export default function RegisterTeam() {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [registeredTeamIds, setRegisteredTeamIds] = useState([]);
    const [memberForm, setMemberForm] = useState({
        name: "",
        email: "",
        tg: "",
        level: "",
        gender: "",
        phone_no: ""
    });

    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        fetchTeams()
            .then(data => {
                const teamIds = data.map(team => team.team_id_);
                setRegisteredTeamIds(teamIds);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);


    const handleRegisterTeam = () => {
        if (members.length > 2) {
            const team = {
                team_id: generateTeamId(),
                members: members
            };

            registerTeam(team)
                .then(res => {
                    console.log(res);
                    navigate("/teams")
                }).catch(err => {
                    console.error(err);
                });
        }
    };

    const generateTeamId = () => {
        const allPossibleIds = Array.from({ length: 15 }, (_, i) => i + 1);
        const availableIds = allPossibleIds.filter(id => !registeredTeamIds.includes(id));
        const randomIndex = Math.floor(Math.random() * availableIds.length);
        return availableIds[randomIndex];
    };

    const teamFormProps = {
        members,
        setMembers,
        memberForm,
        setMemberForm,
        editingIndex,
        setEditingIndex,
        admin: false
    }

    const teamMemPrpos = {
        members,
        setMemberForm,
        setMembers,
        setEditingIndex,
    }

    return (
        <div className="mb-20 mt-30 w-11/12 mx-auto">
            <button
                onClick={() => navigate("/guidelines")}
                className="px-4 py-2 mb-6 bg-green-600 font-semibold text-white text-sm rounded hover:bg-green-700 transition transition-300 cursor-pointer"
            >
                Guidelines
            </button>
            <h2 className="text-3xl font-bold mb-8 text-center  text-gray-900">Team Registration</h2>
            {registeredTeamIds.length < 15 ? (
                <TeamForm {...teamFormProps} />
            ) : (
                <p className="text-red-600 font-semibold mb-4">Registration is Full</p>
            )}

            <div className="my-6 text-center">
                <button
                    disabled={members.length < 3}
                    type="button"
                    onClick={handleRegisterTeam}
                    className={`px-6 py-3 text-white font-semibold rounded-lg shadow transition duration-300 ${members.length < 3
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    Register Team
                </button>

                {members.length < 3 && (
                    <p className="mt-2 text-sm text-gray-600">
                        Minimum of 3 members are needed
                    </p>
                )}

                {members.length == 5 && (
                    <p className="mt-2 text-sm text-gray-600">
                        Team has no empty slots
                    </p>
                )}
            </div>

            {members.length > 0 && <TeamMembers {...teamMemPrpos} />}
        </div>
    );
}
