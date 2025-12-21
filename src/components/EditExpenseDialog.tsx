import Dialog from "./Dialog";

interface EditExpenseDialogProps {
    isOpen: boolean;
    onClose: () => void;
}
const EditExpenseDialog = ({isOpen, onClose}:EditExpenseDialogProps) => {
    return (
        <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Transaction"
        >

            <Dialog.Body>
                <p>Form θα μπει εδώ αργότερα</p>
            </Dialog.Body>

            <Dialog.Footer>
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                    Άκυρο
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Αποθήκευση
                </button>
            </Dialog.Footer>

        </Dialog>
    );
};

export default EditExpenseDialog;