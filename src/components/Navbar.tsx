import {NavLink} from 'react-router'
import {useAuth} from "../context/useAuth.ts";


const Navbar = () => {

    const {authResponse} = useAuth();
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="w-full px-6">
                <div className="flex justify-between items-center h-16">

                    {authResponse ?
                        <div className="text-xl font-bold text-gray-900">
                            FLUX
                        </div>
                        :
                        <NavLink to="/" className="text-xl font-bold text-gray-900">
                            FLUX
                        </NavLink>
                    }


                    {authResponse ?
                        <div className = "w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                            {authResponse.user.username.substring(0,1).toUpperCase()}
                        </div>
                    :

                        <div className="flex items-center space-x-3">
                            <NavLink
                                to="/signup"
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
                    }


                </div>
            </div>
        </nav>
    );
};

export default Navbar;