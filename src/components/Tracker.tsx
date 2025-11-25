import {Outlet} from "react-router";
import Sidebar from "./Sidebar";
const Tracker = () => {
    return (
        <main className="bg-amber-300 h-screen py-3 grid grid-cols-[200px_minmax(900px,_1fr)_100px] gap-2">
           <Sidebar />
            <Outlet />
        </main>
    );
};

export default Tracker;