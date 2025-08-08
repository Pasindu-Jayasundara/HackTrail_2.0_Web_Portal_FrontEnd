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
        <div className="text-center mb-20 mt-30 w-11/12 mx-auto">
            <StatsPanel />
            <button className="text-center px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition cursor-pointer font-semibold my- md:my-8" onClick={jsonToExcel}>Download Excel</button>
            {teams.length > 0 ? (
                            <div className="grid md:grid-cols-3 gap-6">
                                {Teams}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center min-h-[300px]">
                                <Spinner />
                            </div>
                        )}
        </div>
    );
}
