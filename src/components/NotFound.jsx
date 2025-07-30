import { useNavigate } from "react-router-dom"

export default function NotFound() {

    const navigate = useNavigate()

    return (
        <div>
            <h2>404 Not Found</h2>
            <button onClick={() => navigate('/')}>
                Go Home
            </button>
        </div>
    )
}