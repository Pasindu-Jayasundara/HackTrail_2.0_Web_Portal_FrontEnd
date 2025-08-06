import { useState, useEffect } from "react";
import { getTeam } from "../api/api";
import { useParams } from 'react-router-dom';
import UserForm from "../components/UserForm";

export default function RegisterUser() {
    let { id: teamId } = useParams();

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
            <h2 className="text-3xl font-bold mb-8 text-center">Individual Registration</h2>
            <UserForm {...userFormProps} />
        </div>
    );
}
