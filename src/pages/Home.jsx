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
        <div className="mt-16">
            <section className="flex flex-wrap">
                <div className="w-full sm:w-8/12 mb-10">
                    <div className="mx-auto h-full sm:p-10">
                        <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
                            <div className="w-full">
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 animate-pulse">
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
            </section>
            {/* Coming Soon Banner */}
            <section className="bg-gradient-to-r from-green-900 to-black py-20">
                <div className="w-11/12 max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">Coming Soon</h2>
                    <p className="text-lg text-green-100">
                        Stay tuned for exciting updates and announcements about HackTrail 2.0.
                    </p>
                </div>
            </section>

            {/* Card Section */}
            <section className="py-20
             pb-20">
                <h2 className="text-5xl font-bold text-center text-gray-900 mb-20 animate-flicker capitalize">
                    Code the Future
                </h2>
                <div className="w-11/12 mx-auto grid grid-cols-3 place-items-center gap-4">
                    {
                        features.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    className=" max-w-xs h-full text-center bg-white border-[2px] border-green-500 rounded-xl shadow-md hover:shadow-green-400/60 hover:scale-105 transition duration-300 p-6"
                                    key={idx}
                                >
                                    <div className="flex justify-center mb-4">
                                        <Icon className="h-16 w-16 text-green-600" />
                                    </div>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
                                        {card.title}
                                    </h5>
                                    <p className="text-gray-600">
                                        {card.desc}
                                    </p>
                                </div>


                            )
                        })
                    }
                </div>
            </section>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fill-opacity="1" d="M0,96L1440,0L1440,0L0,0Z"></path></svg> */}
            {/* Registration section */}
            <section className="bg-green-100 py-35">
                <div className="w-11/12 max-w-6xl mx-auto text-center">
                    <h2 className="text-5xl font-bold text-green-800 mb-8">Registration</h2>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a
                            href="http://"
                            className="px-8 py-4 text-lg bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition duration-300"
                        >
                            Team Registration
                        </a>
                        <a
                            href="http://"
                            className="px-8 py-4 text-lg bg-white text-green-700 font-semibold border border-green-600 rounded-xl shadow hover:bg-green-50 transition duration-300"
                        >
                            Apply for a Team
                        </a>
                    </div>

                </div>
            </section>

        </div>
    )
}
