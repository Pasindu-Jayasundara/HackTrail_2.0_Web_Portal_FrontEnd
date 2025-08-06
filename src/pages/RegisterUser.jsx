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
        <div className="mb-20 mt-30 w-11/12 mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Individual Registration</h2>
            <UserForm {...userFormProps} />
        </div>
    );
}
