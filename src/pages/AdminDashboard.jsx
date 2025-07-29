import { useEffect, useState } from "react";
import Team from "../components/Team";
import { fetchTeams } from "../api/api";

export default function AdminDashboard() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchTeams()
            .then(data => {
                const data_ = data.map(d => {
                    return {
                        ...d,
                        admin: true
                    }
                })
                setTeams(data_)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);


    const Teams = teams.map((team) =>
        <Team key={team.team_id} {...team} />
    );

    return (
        <main>
            {teams.length > 0 ? Teams : <p>Loading team data...</p>}
        </main>
    );
}
