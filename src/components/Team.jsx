import { useState, useEffect } from "react";

export default function Team(props) {
    const [leader, setLeader] = useState(null);
    const [empSlots, setEmpSlots] = useState([])

    useEffect(() => {
        const lead = props.members.find(mem => mem.level === 4);
        if (lead) {
            setLeader({
                name: lead.name,
                phone_no: lead.phone_no,
            });
        }

        const arr = [0, 1, 2, 3, 4];
        const levels = props.members.map(mem => mem.level)
        const emptyLevels = arr.filter(level => !levels.includes(level))
        setEmpSlots(emptyLevels)

    }, [props.members]);

    const Members = props.members.map((mem, idx) => (
        <tr key={idx}>
            <td>{mem.name}</td>
            <td>{mem.tg}</td>
            <td>{mem.level}</td>
            <td>{mem.gender}</td>
        </tr>
    ));

    const EmpSlots = empSlots.map((level, idx) => (
        <tr key={idx}>
            <td>Empty</td>
            <td>Empty</td>
            <td>{level}</td>
            <td>Empty</td>
        </tr>
    ));

    return (
        <div>
            <h2>Team {props.team_id}</h2>
            {empSlots.length > 0 && <a href="">Apply</a>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>TG_Number</th>
                        <th>Level</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {Members}
                    {EmpSlots}
                </tbody>
            </table>
            {leader && (
                <div>
                    <p>Leader: {leader.name}</p>
                    <p>Telephone: {leader.phone_no}</p>
                </div>
            )}
        </div>
    );
}
