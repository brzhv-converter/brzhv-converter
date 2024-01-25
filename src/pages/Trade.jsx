import { useNavigate } from "react-router-dom";
import Background from "../components/Background"
import { verifyToken } from "../services/AuthService";
import { useEffect, useState } from "react";
import CardWrapper from "../components/CardWrapper";
import Spinner from "../components/Spinner";

const Trade = () => {
    const [userEmail, updateUserEmail] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const session = localStorage.getItem('session');

        if (!session) {
            navigate('/sign-in')
        }

        verifyToken({ token: session })
        .then((res) => {
            if (res.status === 200) {
                return res.json()
                .then((data) => updateUserEmail(data?.email))   
            } else {
                navigate('/sign-in')
            }
        })
        .catch(() => {
            navigate('/sign-in')
        })
    }, [navigate])

    return (
        <main className="relative">
            <Background />
            <CardWrapper>
                {(userEmail) ? (
                    <p>Trade</p>
                ) : (
                    <Spinner />
                )}
            </CardWrapper>
        </main>
    )
}

export default Trade