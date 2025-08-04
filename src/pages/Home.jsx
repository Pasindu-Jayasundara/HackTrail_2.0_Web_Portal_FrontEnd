import img from "../assets/coder.webp"
import StatsPanel from "../components/StatsPanel"
import { ClockIcon, CurrencyDollarIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function Home() {

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
        <div className="mb-20 mt-20">
            <div className="flex flex-wrap">
                <div className="w-full sm:w-8/12 mb-10">
                    <div className="mx-auto h-full sm:p-10">
                        <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
                            <div className="w-full">
                                <h1 className="text-4xl lg:text-6xl font-bold">
                                    HackTrail <span className="text-green-600">2.0</span>
                                </h1>
                                <div className="w-20 h-2 bg-green-600 my-4"></div>
                                <p className="text-xl mb-10">
                                    Join the brightest minds at the University of Ruhuna for a 24-hour coding challenge where innovation meets impact. Build, solve, and compete one idea at a time
                                </p>
                            </div>
                        </header>
                    </div>
                    <StatsPanel />
                </div>
                <img
                    src={img}
                    alt="Leafs"
                    className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
                />
            </div>
            {/* Coming Soon Banner */}
            {/* Card Section */}
            
        </div>
    )
}
