import { useNavigate } from "react-router-dom"

export default function NotFound() {

    const navigate = useNavigate()

    return (
        <div className="h-[90vh] w-full flex flex-col items-center justify-center text-centerpx-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, the page you are looking for doesn't exist.</p>
            <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium cursor-pointer"
            >
                Go Home
            </button>
        </div>

    )
}