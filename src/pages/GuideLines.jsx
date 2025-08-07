export default function GuideLines() {
    return (
        <div className="w-11/12 mx-auto mt-30 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">HackTrail 2.0 Guidelines</h2>

            {/* About HackTrail */}
            <section className="bg-green-50 rounded-md border-[1.5px] border-green-600 shadow-lg shadow-green-800/15 p-6 mb-12">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">About HackTrail</h3>
                <ul className="list-decimal space-y-3 text-gray-800 ml-5">
                    <li>
                        <span className="font-semibold text-gray-900">Event Phases:</span>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li><span className="font-semibold text-gray-900">Phase 1:</span> Solution Identification & Presentation</li>
                            <li><span className="font-semibold text-gray-900">Phase 2:</span> Product Implementation & Final Presentation</li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Event Duration:</span> HackTrail 2.0 is a two-day overnight event, held on consecutive days.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Use of AI:</span> Participants are allowed to use any AI tools throughout the event.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Judging Criteria:</span> Winners will be selected by the judging panel based on overall performance and the quality and scope of the identified solution.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Time Management:</span> All teams must strictly adhere to the event schedule and timers.
                    </li>
                </ul>
            </section>

            {/* About Registration */}
            <section className="bg-green-50 rounded-md border-[1.5px] border-green-600 shadow-lg shadow-green-800/15 p-6 mb-12">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Individual Registration</h3>
                <ul className="list-decimal space-y-3 text-gray-800 ml-5">
                    <li>
                        <span className="font-semibold text-gray-900">Email Requirement:</span> Registration must be done using your Faculty of Technology email: <code>name_xxxxxxxx@fot.ruh.ac.lk</code>
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">TG Number Requirement:</span> You must provide a valid TG number assigned by the Faculty of Technology (e.g., <code>TG2021001</code>).
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Academic Level Diversity:</span> Each team must include members from at least <strong>three different academic levels</strong>. A maximum of 3 members can be from the same level, and the remaining 2 must be from two other different levels.
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li><strong>Level 0:</strong> Batch 9</li>
                            <li><strong>Level 1:</strong> Batch 8</li>
                            <li><strong>Level 2:</strong> Batch 7</li>
                            <li><strong>Level 3:</strong> Batch 6</li>
                            <li><strong>Level 4:</strong> Batch 5</li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Gender Ratio:</span> Teams must follow either a <strong>2:3 or 3:2</strong> ratio of boys to girls (or vice versa).
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Joining a Team:</span> If there are pre-registered teams with empty slots, you can join them through the portal.
                    </li>
                </ul>
            </section>

            {/* About Team */}
            
            <section className="bg-green-50 rounded-md border-[1.5px] border-green-600 shadow-lg shadow-green-800/15 p-6 mb-12">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Team Registration</h3>
                <ul className="list-decimal space-y-3 text-gray-800 ml-5">
                    <li>
                        <span className="font-semibold text-gray-900">Team Composition:</span> Each team must consist of exactly 5 members, including both boys and girls.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Registration:</span> All team members must register through the official registration portal.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Minimum Team Members:</span> A team must have at least 3 members to register.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Email Requirement:</span> Registration must be done using your Faculty of Technology email: <code>name_xxxxxxxx@fot.ruh.ac.lk</code>
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Academic Level Diversity:</span> Each team must include members from at least <strong>three different academic levels</strong>. A maximum of 3 members can be from the same level, and the remaining 2 must be from two other different levels.
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li><strong>Level 0:</strong> Batch 9</li>
                            <li><strong>Level 1:</strong> Batch 8</li>
                            <li><strong>Level 2:</strong> Batch 7</li>
                            <li><strong>Level 3:</strong> Batch 6</li>
                            <li><strong>Level 4:</strong> Batch 5</li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Gender Ratio:</span> Teams must follow either a <strong>2:3 or 3:2</strong> ratio of boys to girls (or vice versa).
                    </li>
                </ul>
            </section>
            
        </div>
    );
}
