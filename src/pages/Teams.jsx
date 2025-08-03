import { useEffect, useState } from "react";
import Team from "../components/Team";
import { fetchTeams } from "../api/api";

export default function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchTeams()
            .then(data => {
                const data_ = data.map(d => {
                    return {
                        ...d,
                        admin : false
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
        <div className="grid md:grid-cols-3 items-center justify-center gap-6">
            {teams.length > 0 ? Teams : <p>Loading team data...</p>}
        </div>
    );
}
