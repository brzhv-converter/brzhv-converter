import { useState } from 'react'
import useField from "../hooks/useField"
import Button from "./Button"

const SignUpForm = ({
    title = '',
    onSubmit = () => {}
}) => {
    const { Field: LoginField, value: login, isValid: isLogin } = useField({
        label: 'Login',
        placeholder: 'Enter your login...',
        name: 'login',
        validator: /^[a-z0-9]{3,50}$/i
    })

    const { Field: EmailField, value: email, isValid: isEmail } = useField({
        label: 'Email',
        placeholder: 'Enter your email...',
        name: 'email',
        validator: /^[\w.-]+@[a-z\d.-]+\.[a-z]{2,}$/ig
    })

    const { Field: WalletField, value: wallet, isValid: isWallet } = useField({
        label: 'Wallet',
        placeholder: 'Enter your wallet...',
        name: 'wallet'
    })

    const { Field: PasswordField, value: password, isValid: isPassword } = useField({
        label: 'Password',
        placeholder: 'Enter your password...',
        name: 'password',
        isTogglable: true
    })

    const [isSubmitted, updateIsSubmitted] = useState(false);

    const submit = () => {
        if (!isLogin || !isEmail || !isWallet || !isPassword) return;

        updateIsSubmitted(true);
        onSubmit({
            login,
            email,
            wallet,
            password
        })
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="w-full mb-[20px]">
                {title}
            </h2>
            <form className="w-full flex flex-col gap-[20px]">
                {LoginField}
                {EmailField}
                {WalletField}
                {PasswordField}
                <div className="pt-[20px] w-full">
                    <Button
                        disabled={isSubmitted}
                        type="submit"
                        onClick={submit}
                    >
                        Sign up
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm