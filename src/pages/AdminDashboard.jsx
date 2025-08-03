import { useEffect, useState } from "react";
import Team from "../components/Team";
import { fetchTeams, jsonToExcel } from "../api/api";
import StatsPanel from "../components/StatsPanel";

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
        <div className="my-20 ">
            <StatsPanel />
            <button className="text-center px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition cursor-pointer" onClick={jsonToExcel}>Download Excel</button>
            <div className="grid md:grid-cols-3 items-center justify-center gap-6 mt-6">
                {teams.length > 0 ? Teams : <p>Loading team data...</p>}
            </div>
        </div>
    );
}
