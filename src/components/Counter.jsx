import CountUp from "react-countup";

export default function Counter({ number, title, emoji }) {
    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-xl shadow-md w-44 sm:w-48 bg-gradient-to-b from-white to-green-50 border border-green-100 hover:scale-105 transition-transform duration-300">
            {emoji && <span className="text-2xl mb-1">{emoji}</span>}
            <CountUp
                duration={1}
                end={number}
                className="text-4xl sm:text-5xl font-extrabold text-green-600"
            />
            <span className="mt-2 text-sm sm:text-base font-medium text-gray-700 text-center">
                {title}
            </span>
        </div>
    );
}
