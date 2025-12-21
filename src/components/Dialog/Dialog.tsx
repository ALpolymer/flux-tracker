
import {type ReactNode,type MouseEvent, useEffect, useRef} from "react";

export interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    closeOnBackdropClick?: boolean;
    closeOnEsc?: boolean;
    children?: ReactNode;
}

interface DialogBodyProps {
    children: ReactNode;
    className?: string;
}

interface DialogFooterProps {
    children?: ReactNode;
    className?: string;
}

const DialogBody = ({children, className = ""}:DialogBodyProps) =>{
return (
    <div className={`px-6 py-4 ${className}`}>
        {children}
    </div>
    )
}

const DialogFooter = ({children, className = ""}:DialogFooterProps) =>{
    return (
        <div className={`px-6 py-4 border-t border-gray-200 flex justify-end gap-3 ${className}`}>
            {children}
        </div>
    )
}



const Dialog = ({
                    isOpen,
                    onClose,
                    title,
                    closeOnBackdropClick = true,
                    closeOnEsc = true,
                    children}:DialogProps) => {

    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if(isOpen){
            dialog.showModal()
        } else {
            dialog.close()
        }
    },[isOpen])

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        const handleCancel = (e: Event) => {
            e.preventDefault()
            if(closeOnEsc){
                onClose()
            }
        }

        dialog.addEventListener("cancel", handleCancel)
        return () => dialog.removeEventListener("cancel", handleCancel)
    }, [closeOnEsc, onClose]);


    const handleBackdropClick = (e: MouseEvent<HTMLDialogElement> ) => {
        if(closeOnBackdropClick && e.target === dialogRef.current) {
            onClose()
        }
    }
    return (
        <dialog
            ref={dialogRef}
            onClick={handleBackdropClick}
            className="m-auto rounded-xl p-0 w-full max-w-md shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        >
            {title && (
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                </div>
            )}

            {children}
        </dialog>
    );
};

Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;

export default Dialog;