const CardWrapper = ({
    children
}) => {
    return (
        <div className="py-[40px] px-[30px] rounded-[10px] bg-white card-shadow">
            {children}
        </div>
    )
}

export default CardWrapper