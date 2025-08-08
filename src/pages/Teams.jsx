import { useEffect, useState } from "react";
import Team from "../components/Team";
import { fetchTeams } from "../api/api";
import Spinner from "../components/Spinner";

export default function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchTeams()
            .then(data => {
                const data_ = data.map(d => {
                    return {
                        ...d,
                        admin: false
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
        <div className="mb-20 mt-30 w-11/12 mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Teams</h1>
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
