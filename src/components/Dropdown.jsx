import { useState } from "react"
import joinClassNames from "../helpers/joinClassNames";
import OutSideClick from "./OutsideClick";

const buttonHeight = 36;

const Dropdown = ({
    options = [],
    onSelect = () => {},
    parser = (option) => option,
    alterParser
}) => {
    const [value, updateValue] = useState(options[0]);
    const [isDropped, updateDropped] = useState(false);

    const select = (option) => {
        updateDropped(false);
        updateValue(option);
        onSelect(option);
    }

    return (
        <div className="relative w-full">
            <button
                className="text-lg py-1 px-2 border-[1px] rounded-lg bg-soft-white w-full"
                onClick={() => updateDropped((state) => !state)}
            >
                {value ? parser(value) : 'Select'}
            </button>
            <OutSideClick
                isOpen={isDropped}
                onClick={() => updateDropped(false)}
            >
                <div 
                    className={joinClassNames(
                        "absolute top-[38px] max-h-[152px] flex-col flex transition-all duration-200 rounded-lg w-full scroll-hidden shadow-lg",
                        isDropped ? "overflow-auto" : "overflow-hidden"
                    )}
                    style={{ height: isDropped ? `${options.length * buttonHeight}px` : '0px' }}
                >
                    {options.map((option, index) => (
                        <button
                            key={parser(option)}
                            className={joinClassNames(
                                "text-lg py-1 px-2 bg-soft-white transition-all duration-200 hover:bg-slate-300",
                                index === 0 && 'rounded-t-lg',
                                index === options.length - 1 && 'rounded-b-lg'
                            )}
                            onClick={() => select(option)}
                        >
                            {alterParser ? `${parser(option)} - ${alterParser(option)}` : parser(option)}
                        </button>
                    ))}
                </div>
            </OutSideClick>
        </div>
    )
}

export default Dropdown