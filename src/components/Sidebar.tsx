import {Link} from 'react-router';
const Sidebar = () => {
    return (
        <div className="bg-blue-200">
            Sidebar
            <nav className="flex flex-col items-center gap-x-2 justify-between">
                <Link to="dashboard">Dashboard</Link>
                <Link to="expenses">Expenses</Link>
                <Link to="wallets">Wallets</Link>
                <Link to="categories">Categories</Link>
            </nav>
        </div>
    );
};

export default Sidebar;