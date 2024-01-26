import { useWindowSize } from "@uidotdev/usehooks";

const Graph = ({
    graphHeightModifier = 0.3,
    graphWidthModifier = 0.5,
}) => {
    const { width, height } = useWindowSize();

    return (
        <>
            <canvas
                className="bg-soft-white mx-auto rounded-lg border-[1px]"
                height={height * graphHeightModifier}
                width={width * graphWidthModifier}
            >
                Something went wrong...
            </canvas>
        </>
    )
}

export default Graph