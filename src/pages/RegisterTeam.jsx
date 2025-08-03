import { useEffect, useState } from "react";
import { registerTeam, fetchTeams } from "../api/api";
import TeamMembers from "../components/TeamMembers";
import TeamForm from "../components/TeamForm"


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

    const [editingIndex, setEditingIndex] = useState(null);

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
        const allPossibleIds = Array.from({ length: 15 }, (_, i) => i + 1);
        const availableIds = allPossibleIds.filter(id => !registeredTeamIds.includes(id));
        const randomIndex = Math.floor(Math.random() * availableIds.length);
        return availableIds[randomIndex];
    };

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
        <div>
            <h2>Team Registration</h2>
            {registeredTeamIds.length < 15 ? (<TeamForm {...teamFormProps} />) : <p>Registration is Full</p>}
            {members.length > 0 && (<TeamMembers {...teamMemPrpos} />)}
            {members.length < 3 && <p>Minimum Of 3 Members are needed</p>}
            <button disabled={members.length < 3} type="button" onClick={handleRegisterTeam} style={{ marginTop: '20px' }}>
                Register Team
            </button>
        </div>
    );
}
