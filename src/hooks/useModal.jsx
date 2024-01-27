import { useState } from "react"
import joinClassNames from "../helpers/joinClassNames";

const useModal = ({
    onClose = () => {},
    onOpen = () => {},
} = {}) => {
    const [isOpen, updateIsOpen] = useState(false);

    const open = () => {
        updateIsOpen(true);
        onOpen();
    };
    const close = () => {
        updateIsOpen(false);
        onClose();
    };

    const Modal = ({ children }) => (
        <div
            id="modal"
            className={joinClassNames(
                "fixed top-0 left-0 w-screen h-[100dvh] transition-opacity duration-1000 cursor-default flex justify-center items-center bg-slate-700 bg-opacity-70 z-[50]",
                isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            )}
            onClick={(e) => e.target.id === "modal" && close()}
        >
            <div className="mx-auto">
                {children}
            </div>
        </div>
    )

    return { open, close, Modal };
}

export default useModal