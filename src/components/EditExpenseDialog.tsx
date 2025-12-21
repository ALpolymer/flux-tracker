import  {type ReactNode, useRef, useEffect} from "react";

type EditExpenseDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const EditExpenseDialog = ({children, isOpen, onClose}:EditExpenseDialogProps) => {

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current
        if(!dialog) return

        if(isOpen){
            dialog.showModal()
        } else {
            dialog.close();
        }
    }, [isOpen]);

    useEffect(() => {
        const dialog = dialogRef.current
        if(!dialog) return

        const handleCancel = (e : Event) => {
            e.preventDefault()
            onClose()
        }

        dialog.addEventListener("cancel", handleCancel);

        return () => {
            dialog.removeEventListener("cancel", handleCancel);
        }


    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        // Αν το click target είναι το ίδιο το dialog (όχι τα children)
        if (e.target === dialogRef.current) {
            onClose();
        }
    };



    return (
        <dialog
            className="m-auto rounded-xl p-0 w-full max-w-md shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
            ref={dialogRef}
            onClick={handleBackdropClick}
        >
            {children}

            <button onClick={() => onClose()}>Close</button>
        </dialog>
    );
};

export default EditExpenseDialog;