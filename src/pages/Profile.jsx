import { useEffect, useState } from "react"
import Background from "../components/Background"
import CardWrapper from "../components/CardWrapper"
import { editUser, getUser, verifyToken } from "../services/AuthService"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import useField from "../hooks/useField"
import { ROUTES } from "../constants/routes"

const Profile = () => {
    const navigate = useNavigate();
    const [isSubmitted, updateIsSubmitted] = useState(false);

    const [initialUserData, updateUserData] = useState()

    const { Field: EmailField, value: email, isValid: isEmail } = useField({
        label: 'Email',
        placeholder: 'Enter your email...',
        name: 'email',
        validator: /^[\w.-]+@[a-z\d.-]+\.[a-z]{2,}$/ig,
        initialValue: initialUserData?.email,
        readOnly: true
    })

    const { Field: LoginField, value: login, isValid: isLogin } = useField({
        label: 'Login',
        placeholder: 'Enter your login...',
        name: 'login',
        validator: /^[a-z0-9]{3,50}$/i,
        initialValue: initialUserData?.login
    })

    const { Field: WalletField, value: wallet, isValid: isWallet } = useField({
        label: 'Wallet',
        placeholder: 'Enter your wallet...',
        name: 'wallet',
        initialValue: initialUserData?.wallet
    })

    const { Field: PasswordField, value: password, isValid: isPassword } = useField({
        label: 'Password',
        placeholder: 'Enter your password...',
        name: 'password',
        isTogglable: true,
        initialValue: initialUserData?.password
    })

    const isValid = isEmail && isLogin && isWallet && isPassword;

    useEffect(() => {
        const session = localStorage.getItem('session');

        if (!session) {
            navigate(ROUTES.signIn)
        }

        verifyToken({ token: session })
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                        .then((data) => getUser({ id: data?.email })
                        .then((res) => res.json()
                        .then((data) =>  updateUserData(data)
                    )).catch(() => {
                        navigate(ROUTES.signIn)
                    }
                    ))
                } else {
                    navigate(ROUTES.signIn)
                }
            })
    }, [navigate])

    const submit = () => {
        updateIsSubmitted(true);

        editUser({ id: initialUserData.id, email, login, wallet, password })
        .then((res) => {
            if (res.status === 200) {
                toast.success('Profile updated successfully');
                navigate(ROUTES.trade);
            } else {
                toast.error('Something went wrong');
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error('Something went wrong');
        })
        .finally(() => updateIsSubmitted(false));
    }

    return (
        <main className="relative">
            <Background />
            <CardWrapper>
                {(initialUserData && !isSubmitted) ? (
                    <div className="">
                        <h2 className="w-full mb-[20px]">
                            Profile
                        </h2>
                        <form 
                            className="w-full flex flex-col gap-[20px]"
                        >
                            {EmailField}
                            {LoginField}
                            {WalletField}
                            {PasswordField}
                            <div className="pt-[20px] w-full">
                                <Button
                                    disabled={isSubmitted || !isValid}
                                    type="submit"
                                    onClick={submit}
                                >
                                    Save changes
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <Spinner />
                )}
            </CardWrapper>
        </main>
    )
}

export default Profile