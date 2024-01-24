const Button = ({
    type = 'button',
    onClick = () => {},
    disabled,
    children
}) => {
    return (
        <button
            disabled={disabled}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className="px-[24px] py-[12px] bg-cyan-950 hover:bg-opacity-80 text-white rounded-[8px] w-full disabled:bg-opacity-80"
            type={type}
        >
            {children}
        </button>
    )
}

export default Button