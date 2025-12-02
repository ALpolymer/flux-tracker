import {useForm, type SubmitHandler} from "react-hook-form";
import  {fakeAuth} from "../utils/fakeAuth.ts";
import type {LoginFormFields} from "../types";


const Login = () => {

    const {register
        ,handleSubmit
        ,setError
        , formState: {errors, isSubmitting}
    } = useForm<LoginFormFields>();


    const onSubmit : SubmitHandler<LoginFormFields> = async (data) => {
        try {
            await fakeAuth(data)
        } catch (e) {
            setError(
                "root",{
                    message:(e as Error).message,
                }
            )
        }
    }


    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Welcome back! Please enter your details.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                {...register("email",{
                                    required: "Email is required",
                                    pattern:{
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Not a valid email"
                                    }
                                })}
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && (<p className="text-red-600 text-sm">{errors.email.message}</p>)}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                {...register("password", {
                                    required:"Password is required",
                                    minLength:{
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    }

                                })}
                                type="password"
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && (<p className="text-red-600 text-sm">{errors.password.message}</p>)}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            {isSubmitting ? "Loading..." : "Submit"}
                        </button>
                        {errors.root && (<p className="text-red-600 text-sm">{errors.root.message}</p>)}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;