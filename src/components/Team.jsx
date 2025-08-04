import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTeam } from "../api/api";

export default function Team(props) {
    const navigate = useNavigate();
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
        <tr className="border-b-[1px] border-green-400" key={idx}>
            <td className="p-2">{mem.name.split(" ")[0]}</td>
            <td className="p-2">{mem.tg}</td>
            <td className="p-2">{mem.level}</td>
            <td className="p-2">{mem.gender}</td>
        </tr>
    ));

    const EmpSlots = empSlots.map((level, idx) => (
        <tr className="text-gray-400 border-b-[1px] border-green-400" key={idx}>
            <td className="p-2">Empty</td>
            <td className="p-2">Empty</td>
            <td className="p-2">{level}</td>
            <td className="p-2">Empty</td>
        </tr>
    ));

    const applyTeam = () => {
        navigate(`/reg/user/${props.team_id}`);
    }

    const handleEdit = () => {
        navigate(`/update_team/${props.team_id}`);
    }

    return (
        <div className="p-4 h-full z-10 bg-white rounded-md border-[1.5px] border-green-600 shadow-lg shadow-green-800/15 hover:scale-105 transition ">
            <h2 className="text-lg capitalize text-gray-700 font-semibold mb-4">Team {props.team_id}</h2>
            {props.admin && <div className="flex w-1/2 my-3.5">
                <button onClick={handleEdit} className="flex-1 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition cursor-pointer" >Edit</button>
                <button onClick={deleteTeam} className="flex-1 px-4 py-2 mx-3.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition cursor-pointer" >Delete</button>
            </div>}
            <table className="w-full text-center rounded-md shadow shadow-green-100 bg-green-100 overflow-hidden">
                <thead className="uppercase text-white text-sm">
                    <tr className=" bg-green-600 ">
                        <th className="p-2 border border-white-300">Name</th>
                        <th className="p-2 border border-white-300">TG_Number</th>
                        <th className="p-2 border border-white-300">Level</th>
                        <th className="p-2 border border-white-300">Gender</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {Members}
                    {EmpSlots}
                </tbody>
            </table>
            <div className="flex items-center justify-between mt-4">
                {leader && (
                    <div>
                        <p className="font-semibold">Leader: {leader.name}</p>
                        <p className="font-semibold">Telephone: {leader.phone_no}</p>
                    </div>
                )}
                {empSlots.length > 0 && !props.admin && <button className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition cursor-pointer" onClick={applyTeam} >Apply</button>}
            </div>
        </div>
    );
}
