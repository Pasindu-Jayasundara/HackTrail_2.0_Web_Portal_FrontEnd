import { useNavigate } from "react-router-dom";
import img from "../assets/coder.webp"
import StatsPanel from "../components/StatsPanel"
import { ClockIcon, CurrencyDollarIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function Home() {
    const navigate = useNavigate();

    const features = [
        {
            title: "24-Hour Challenge",
            desc: "Push your coding skills to the limit in a non-stop development marathon.",
            icon: ClockIcon,
        },
        {
            title: "Big Prizes",
            desc: "Win exciting cash rewards and tech goodies for the top teams.",
            icon: CurrencyDollarIcon,
        },
        {
            title: "Team Spirit",
            desc: "Collaborate with brilliant minds and experience the thrill of teamwork.",
            icon: UsersIcon,
        },
    ];

    return (
        <div className="mt-16">
            <section className="flex md:flex-row flex-col">
                <div className="md:w-4/6 flex flex-col items-center justify-center mb-12 md:mb-0">
                    <div className="w-11/12 p-9">
                        <h1 className="text-5xl font-bold text-gray-900 animate-pulse">
                            HackTrail <span className="text-green-600">2.0</span>
                        </h1>
                        <div className="w-20 h-2 bg-green-600 my-4"></div>
                        <p className="text-lg mb-10 text-gray-700">
                            Join the brightest minds at the University of Ruhuna for a 24-hour coding challenge where innovation meets impact. Build, solve, and compete one idea at a time.
                        </p>
                    </div>
                    <StatsPanel />
                </div>
                <img
                    src={img}
                    alt="Leafs"
                    className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
                />
            </section>
            <section className="bg-gradient-to-r from-green-900 to-black py-20">
                <div className="w-11/12 max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">Coming Soon</h2>
                    <p className="text-lg text-green-100">
                        Stay tuned for exciting updates and announcements about HackTrail 2.0.
                    </p>
                </div>
            </section>
            <section className="py-20">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 animate-flicker capitalize">
                    Code the Future
                </h2>
                <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-6">
                    {
                        features.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={idx}
                                    className="cursor-pointer max-w-xs text-center bg-white border-[2px] border-green-500 rounded-xl shadow-md hover:shadow-green-400/60 hover:scale-105 transition duration-300 p-6"
                                >
                                    <div className="flex justify-center mb-4">
                                        <Icon className="h-14 w-14 text-green-600" />
                                    </div>
                                    <h5 className="mb-2 text-xl font-semibold text-gray-800">
                                        {card.title}
                                    </h5>
                                    <p className="text-gray-600 text-sm">
                                        {card.desc}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <section className="bg-green-100 py-28">
                <div className="w-11/12 max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-green-800 mb-8">Registration</h2>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <button
                            onClick={() => navigate("/reg/team")}
                            className="cursor-pointer px-8 py-4 text-lg bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition duration-300"
                        >
                            Team Registration
                        </button>
                        <button
                            onClick={() => navigate("/teams")}
                            className="cursor-pointer px-8 py-4 text-lg bg-white text-green-700 font-semibold border border-green-600 rounded-xl shadow hover:bg-green-50 transition duration-300"
                        >
                            Apply for a Team
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
