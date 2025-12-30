import { NavLink, useNavigate } from 'react-router';
import { LayoutDashboard, Receipt, Wallet, Tags, LogOut } from 'lucide-react';
import { useAuth } from "../context/useAuth.ts";

const Sidebar = () => {
    const navigate = useNavigate();
    const { onLogout } = useAuth();

    const handleLogOut = () => {
        navigate("/");
        onLogout();
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`;

    return (
        <aside className="bg-white h-full flex flex-col border-r border-gray-200">
            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                <NavLink to="dashboard" className={navLinkClass}>
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                </NavLink>

                <NavLink to="expenses" className={navLinkClass}>
                    <Receipt className="w-5 h-5" />
                    Transactions
                </NavLink>

                <NavLink to="wallets" className={navLinkClass}>
                    <Wallet className="w-5 h-5" />
                    Wallets
                </NavLink>

                <NavLink to="categories" className={navLinkClass}>
                    <Tags className="w-5 h-5" />
                    Categories
                </NavLink>
            </nav>

            {/* Logout at bottom */}
            <div className="px-3 py-4 border-t border-gray-200">
                <button
                    onClick={handleLogOut}
                    className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Log Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;