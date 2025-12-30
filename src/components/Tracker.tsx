import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const Tracker = () => {
    return (
        <main className="bg-gray-50 h-[calc(100vh-4rem)] grid grid-cols-[240px_1fr]">
            <Sidebar />
            <div className="p-6 overflow-auto">
                <Outlet />
            </div>
        </main>
    );
};

export default Tracker;