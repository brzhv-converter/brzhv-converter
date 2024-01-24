import { useMemo, useState } from "react";
import eye from '../img/eye.svg';
import joinClassNames from "../helpers/joinClassNames";

const useField = ({
    label = '',
    name = '',
    placeholder = '',
    initialValue = '',
    isTogglable = false,
    maxLength = 50,
    validator = /.{3,50}/g
}) => {
    const [value, setValue] = useState(initialValue);
    const [isVisible, setIsVisible] = useState(!isTogglable);
    const [wasFocused, setWasFocused] = useState(false);

    const isValid = Boolean(value.match(validator));

    const Field = useMemo(() => (
        <label 
            className={joinClassNames(
                "relative flex flex-col gap-[8px]",
                !isValid && wasFocused && '!border-red-500 !text-red-500'
            )}
        >
            {label && (
                <h4>
                    {label}
                </h4>
            )}
            <input
                onFocus={() => setWasFocused(true)}
                name={name}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                type={isVisible ? 'text' : 'password'}
                maxLength={maxLength}
                className={joinClassNames(
                    isTogglable ? '!pr-[28px]' : '',
                    !isValid && wasFocused && '!border-red-500 !text-red-500 placeholder:text-red-500 placeholder:opacity-40'
                )}
            />
            {isTogglable && (
                <button
                    className="absolute right-[10px] bottom-[20px]"
                    onClick={() => setIsVisible(!isVisible)}
                    type="button"
                >
                    <img src={eye} alt="" className="" />
                </button>
            )}
        </label>
    ), [label, name, placeholder, isTogglable, isVisible, maxLength, isValid, wasFocused])

    return { Field, value, isValid }
}

export default useField