import { useState, useEffect } from "react";
import { getTeam } from "../api/api";
import { useParams } from 'react-router-dom';
import UserForm from "../components/UserForm";

export default function RegisterUser() {
    let { id: teamId } = useParams();
    
    const [availableLevels, setAvailableLevels] = useState([]);


    useEffect(() => {
        const allLevels = [0, 1, 2, 3, 4];

        getTeam(teamId)
            .then(res => {
                const takenLevels = res.members.map(member => member.level);
                const openLevels = allLevels.filter(level => !takenLevels.includes(level));
                setAvailableLevels(openLevels);
            })
            .catch(err => console.error(err));
    }, []);

    const userFormProps = {
        availableLevels,
        teamId
    }

    return (
        <main>
            <h2>Individual Registration</h2>
            <UserForm {...userFormProps} />
        </main>
    );
}
