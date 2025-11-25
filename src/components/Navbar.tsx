import {NavLink} from 'react-router'

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <span className="text-xl font-semibold text-gray-900">
                            Flux
                        </span>
                        <div className="hidden md:flex space-x-1">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                    }`
                                }
                            >
                                About
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;