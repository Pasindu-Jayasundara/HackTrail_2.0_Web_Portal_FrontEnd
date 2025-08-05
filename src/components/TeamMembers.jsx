export default function TeamMembers({ members, setMembers, setMemberForm, setEditingIndex, setAvailableLevels, availableLevels }) {

    const handleEditMember = (index) => {
        const memberToEdit = members[index];
        setMemberForm(memberToEdit);
        setEditingIndex(index);
        setAvailableLevels([
            ...availableLevels,
            memberToEdit.level
        ]);
    };

    const handleDeleteMember = (index) => {
        setMembers(prev => prev.filter((_, i) => i !== index));
    };


    return (

        <table border="1" cellPadding="8" cellSpacing="0" className="mt-20 mx-auto w-full text-center rounded-md shadow shadow-green-100 bg-green-100 overflow-hidden">
            <thead className="uppercase text-white text-sm">
                <tr className=" bg-green-600 ">
                    <th className="p-2 border border-white-300">Name</th>
                    <th className="p-2 border border-white-300">Email</th>
                    <th className="p-2 border border-white-300">TG</th>
                    <th className="p-2 border border-white-300">Level</th>
                    <th className="p-2 border border-white-300">Gender</th>
                    <th className="p-2 border border-white-300">Phone No</th>
                    <th className="p-2 border border-white-300">Actions</th>
                </tr>
            </thead>
            <tbody>
                {members.map((member, index) => (
                    <tr key={index}>
                        <td className="p-2">{member.name}</td>
                        <td className="p-2">{member.email}</td>
                        <td className="p-2">{member.tg}</td>
                        <td className="p-2">{member.level}</td>
                        <td className="p-2">{member.gender}</td>
                        <td className="p-2">{member.phone_no}</td>
                        <td className="p-2">
                            <button type="button" onClick={() => handleEditMember(index)}>Edit</button>{" "}
                            <button type="button" onClick={() => handleDeleteMember(index)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}