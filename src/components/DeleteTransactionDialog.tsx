import Dialog from "./Dialog";

interface DeleteTransactionDialogProps {
 onClose: () => void;
 onDelete: () => void;
 isOpen: boolean;
}

const DeleteTransactionDialog = ({onClose, isOpen, onDelete}:DeleteTransactionDialogProps) => {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Delete Transaction"
        >
            <Dialog.Body>
                <p>Are you sure you want to delete the transaction?</p>
            </Dialog.Body>


            <Dialog.Footer>
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    Delete
                </button>
            </Dialog.Footer>


        </Dialog>
    );
};

export default DeleteTransactionDialog;