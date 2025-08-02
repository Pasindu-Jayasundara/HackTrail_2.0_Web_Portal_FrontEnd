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
        <main>
            <button onClick={toDashboard}>Back</button>
            <h2>Update Team</h2>
            <TeamForm {...teamFormProps} />
            {members.length > 0 && <TeamMembers {...teamMemPrpos} />}
            <button type="button" onClick={handleUpdateTeam} style={{ marginTop: '20px' }}>
                Update Team
            </button>
        </main>
    );
}
