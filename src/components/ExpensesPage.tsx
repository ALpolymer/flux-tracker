import {Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary";
import Expenses from "./Expenses";

function ErrorFallback() {
    return (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded">
            Something went wrong...
        </div>
    );
}

function LoadingSpinner() {
    return (
        <div className="p-8 text-center bg-gray-50 rounded border border-gray-200">
            <div className="text-blue-600 font-semibold animate-pulse">
                ⏳ Φόρτωση δεδομένων από τον server...
            </div>
        </div>
    );
}

const ExpensesPage = () => {
    return (
    <ErrorBoundary fallback={<ErrorFallback/>}>
        <Suspense fallback={<LoadingSpinner/>}>
             <Expenses />
        </Suspense>
    </ErrorBoundary>
    )
};

export default ExpensesPage;


