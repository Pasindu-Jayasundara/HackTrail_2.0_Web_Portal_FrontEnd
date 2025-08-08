export default function TeamMembers({ members, setMembers, setMemberForm, setEditingIndex }) {

    const handleEditMember = (index) => {
        const memberToEdit = members[index];
        setMemberForm(memberToEdit);
        setEditingIndex(index);
        // setAvailableLevels([
        //     ...availableLevels,
        //     memberToEdit.level
        // ]);
    };

    const handleDeleteMember = (index) => {
        setMembers(prev => prev.filter((_, i) => i !== index));
    };


    return (

        <div className="space-y-6 flex flex-col items-center">
    {members.map((member, index) => (
        <div
            key={index}
            className="max-w-xl w-full bg-white rounded-md border-[1.5px] border-green-600 shadow-lg shadow-green-800/15 hover:scale-105 transform transition-transform duration-300 p-6"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-x-6 text-sm text-gray-800">
                <div><strong>Name:</strong> {member.name}</div>
                <div><strong>Email:</strong> {member.email}</div>
                <div><strong>TG:</strong> {member.tg}</div>
                <div><strong>Level:</strong> {member.level}</div>
                <div><strong>Gender:</strong> {member.gender === "M" ? "Male" : "Female"}</div>
                <div><strong>Phone No:</strong> {member.phone_no}</div>
            </div>
            <div className="mt-4 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => handleEditMember(index)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition cursor-pointer"
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => handleDeleteMember(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </div>
    ))}
</div>


    )
}