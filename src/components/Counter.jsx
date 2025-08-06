import CountUp from "react-countup";

export default function Counter({ number, title }) {
    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md w-40">
            <CountUp
                duration={1}
                end={number}
                className="text-4xl font-extrabold text-green-600"
            />
            <span className="mt-2 text-sm font-medium text-gray-700">{title}</span>
        </div>
    );
}
