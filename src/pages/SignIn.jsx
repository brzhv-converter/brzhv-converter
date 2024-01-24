import { useEffect, useState } from "react"
import Background from "../components/Background"
import CardWrapper from "../components/CardWrapper"
import SignInForm from "../components/SignInForm"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { loginUser, verifyToken } from "../services/AuthService"
import { toast } from "react-toastify"

const SignIn = () => {
    const [isLoading, updateIsLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('session');
        if (!token) return;

        verifyToken({ token })
        .then((res) => {
            if (res.status === 200) {
                toast.success('Restored the session successfully.')
                navigate('/trade')
            }
        })
        .catch(() => localStorage.removeItem('session'))
    }, [navigate])

    const signIn = ({ email, password }) => {
        updateIsLoading(true);
        loginUser({ 
            email, password 
        }).then((res) => (
            res.json()
            .then((result) => {
                if (res.status !== 200) {
                    toast.error(result.message)
                } else {
                    toast.success('Success');
                    localStorage.setItem('session', result)
                    navigate('/trade')
                }
            })
        )).catch((err) => {
            toast.error(err);
        }).finally(() => updateIsLoading(false));
    }
    
    return (
        <main className='relative w-screen h-screen flex flex-col items-center justify-center -mt-[74px]'>
            <Background />
            <CardWrapper>
                {!isLoading ? (
                    <SignInForm
                        onSubmit={signIn}
                        title='Sign in'
                    />
                ) : (
                    <Spinner />
                )}
            </CardWrapper>
        </main>
    )
}

export default SignIn