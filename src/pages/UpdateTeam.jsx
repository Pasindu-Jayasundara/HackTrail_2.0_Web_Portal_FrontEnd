import { useState, useEffect } from "react";
import { getTeam, updateTeam } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import TeamMembers from "../components/TeamMembers";
import TeamForm from "../components/TeamForm"

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

    const teamFormProps = {
        availableLevels,
        setMembers,
        memberForm,
        setMemberForm,
        editingIndex,
        setEditingIndex
    }

    const teamMemPrpos = {
        members,
        setMemberForm,
        setMembers,
        setEditingIndex,
        setAvailableLevels,
        availableLevels
    }


    return (
        <div className="mb-20 mt-30 w-11/12 mx-auto text-center">
            <button
                onClick={toDashboard}
                className="mb-6 px-5 py-2 text-sm font-semibold text-green-700 border border-green-600 rounded hover:bg-green-50 transition duration-300"
            >
                Back
            </button>

            <h2 className="text-3xl font-bold mb-8 text-green-700">Update Team</h2>

            <TeamForm {...teamFormProps} />

            {members.length > 0 && (
                <div className="mt-10">
                    <TeamMembers {...teamMemPrpos} />
                </div>
            )}

            <button
                type="button"
                onClick={handleUpdateTeam}
                className="mt-6 px-6 py-3 text-white font-semibold rounded-lg shadow transition duration-300 bg-green-600 hover:bg-green-700"
            >
                Update Team
            </button>
        </div>
    );
}
