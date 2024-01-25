const CardWrapper = ({
    children
}) => {
    return (
        <div className="w-full sm:w-auto py-[40px] px-[30px] rounded-[10px] bg-white card-shadow max-w-full">
            {children}
        </div>
    )
}

export default CardWrapper