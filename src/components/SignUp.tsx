import {Link} from "react-router";

const SignUp = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                <div className="text-left">
                    <h2 className="text-3xl font-extrabold text-slate-900">
                        Sign up
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                       Create an account to get started.
                    </p>
                </div>

                <form className="mt-8 space-y-6">
                    <div className="rounded-md">
                        <div className="mb-4">
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input

                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input

                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input

                                type="password"
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input

                                type="password"
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-center gap-2">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="w-fit text-slate-600 text-sm">
                        Have an account?
                        <span>
                            <Link to="/signin"> Sign in now.</Link>
                        </span>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SignUp;