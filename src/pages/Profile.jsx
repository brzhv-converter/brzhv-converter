import { useEffect, useState } from "react"
import Background from "../components/Background"
import CardWrapper from "../components/CardWrapper"
import { getUser, verifyToken } from "../services/AuthService"
import Spinner from "../components/Spinner"
import { mask } from "../helpers/mask"

const Profile = () => {
    const [userData, updateUserData] = useState({
        email: '',
        login: '',
        wallet: '',
        password: ''
    })

    useEffect(() => {
        const session = localStorage.getItem('session');
        verifyToken({ token: session })
            .then((res) => res.json()
            .then((data) => getUser({ id: data?.email })
            .then((res) => res.json()
            .then((user) => updateUserData(user)
        ))))
    }, [])

    useEffect(() => {
        console.log(userData)
    }, [userData])

    return (
        <main className="relative">
            <Background />
            <CardWrapper>
                {userData.email ? (
                    <div className="">
                        <p>{userData.login}</p>
                        <p>{userData.email}</p>
                        <p>{userData.wallet}</p>
                        <p>{mask(userData.password)}</p>
                    </div>
                ) : (
                    <Spinner />
                )}
            </CardWrapper>
        </main>
    )
}

export default Profile