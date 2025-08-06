import { useEffect, useState } from "react";
import { fetchUsers, fetchTeams } from "../api/api";
import Counter from "./Counter";

export default function StatsPanel() {
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [noOfTeams, setNoOfTeams] = useState(0);

  useEffect(() => {
    fetchUsers()
      .then(users => {
        setNoOfUsers(users.length);
      })
      .catch(err => console.log(err));

    
    fetchTeams()
      .then(teams => {
        setNoOfTeams(teams.length);
      })
      .catch(err => console.log(err));

    
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Counter number={noOfTeams} title="Teams" />
      <Counter number={noOfUsers} title="Participants" />
    </div>
  );
}
