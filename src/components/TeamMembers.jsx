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

        <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px' }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>TG</th>
                    <th>Level</th>
                    <th>Gender</th>
                    <th>Phone No</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {members.map((member, index) => (
                    <tr key={index}>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member.tg}</td>
                        <td>{member.level}</td>
                        <td>{member.gender}</td>
                        <td>{member.phone_no}</td>
                        <td>
                            <button type="button" onClick={() => handleEditMember(index)}>Edit</button>{" "}
                            <button type="button" onClick={() => handleDeleteMember(index)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}