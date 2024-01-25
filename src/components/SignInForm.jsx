import { useState } from "react";
import useField from "../hooks/useField"
import Button from "./Button"

const SignInForm = ({
    title = '',
    onSubmit = () => {}
}) => {
    const { Field: EmailField, value: email, isValid: isEmail } = useField({
        label: 'Email',
        placeholder: 'Enter your email...',
        name: 'email'
    })

    const { Field: PasswordField, value: password, isValid: isPassword } = useField({
        label: 'Password',
        placeholder: 'Enter your password...',
        name: 'password',
        isTogglable: true
    })

    const [isSubmitted, updateIsSubmitted] = useState(false);

    const submit = () => {
        if (!isEmail || !isPassword) return;

        updateIsSubmitted(true);
        onSubmit({
            email, 
            password
        });
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="w-full mb-[20px]">
                {title}
            </h2>
            <form className="w-full flex flex-col gap-[20px]">
                {EmailField}
                {PasswordField}
                <div className="pt-[20px] w-full">
                    <Button
                        disabled={isSubmitted}
                        type="submit"
                        onClick={submit}
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm