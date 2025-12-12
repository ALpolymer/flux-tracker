import {NavLink} from 'react-router';
import LogOut from "./LogOut.tsx";
const Sidebar = () => {
    return (
        <div className="bg-stone-100  flex flex-col items-center justify-start px-8 py-3 border border-transparent shadow rounded-md">
            Sidebar
            <nav className="flex flex-col items-center gap-x-2 justify-between">
                <NavLink
                    to="dashboard"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink to="expenses"
                         className={({ isActive }) =>
                             `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                 isActive
                                     ? 'bg-indigo-50 text-indigo-700'
                                     : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                             }`
                         }>

                    Expenses
                </NavLink>
                <NavLink to="wallets"
                         className={({ isActive }) =>
                             `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                 isActive
                                     ? 'bg-indigo-50 text-indigo-700'
                                     : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                             }`
                         }
                >Wallets
                </NavLink>

                <NavLink to="categories"
                         className={({ isActive }) =>
                             `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                 isActive
                                     ? 'bg-indigo-50 text-indigo-700'
                                     : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                             }`
                         }
                >
                    Categories
                </NavLink>
                <LogOut/>
            </nav>
        </div>
    );
};

export default Sidebar;