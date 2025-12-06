import {NavLink} from 'react-router'

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="w-full px-6">
                <div className="flex justify-between items-center h-16">
                    <NavLink to="/" className="text-xl font-bold text-gray-900">
                        FLUX
                    </NavLink>

                    <div className="flex items-center space-x-3">
                        <NavLink
                            to="/register"
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            Sign Up
                        </NavLink>
                        <NavLink
                            to="/signin"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Sign In
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;