import {useForm, type SubmitHandler} from "react-hook-form";
import type {LoginFormFields} from "../types";
import {useNavigate,Link} from "react-router";
import {useAuth} from "../context/useAuth.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


const signInSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .pipe(
            z.email({ message: "Invalid email address" })
        ),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long"),
});


const SignIn = () => {

    const navigate = useNavigate();

    const {onLogin} =useAuth()

    const {register
        ,handleSubmit
        ,setError
        , formState: {errors, isSubmitting}
    } = useForm<LoginFormFields>(
        {
            resolver: zodResolver(signInSchema),
            defaultValues:{
                email:"",
                password:""
            }
        }
    );


    const onSubmit : SubmitHandler<LoginFormFields> = async (data) => {
        try {
            await onLogin(data);
            navigate("/flux");
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
                <div className="text-left">
                    <h2 className="text-3xl font-extrabold text-slate-900">
                        Sign in
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md  -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                {...register("email",)}
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && (<p className="text-red-600 text-sm">{errors.email.message}</p>)}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                {...register("password")}
                                type="password"
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && (<p className="text-red-600 text-sm">{errors.password.message}</p>)}
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-center gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white
    ${isSubmitting ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"}
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
    transition-colors duration-200`}
                        >
                            {isSubmitting ? "Loading..." : "Sign in"}
                        </button>
                        {errors.root && (<p className="text-red-600 text-sm">{errors.root.message}</p>)}

                    </div>
                    <Link to="/signup" className="w-fit text-slate-600 text-sm">No account yet?</Link>
                </form>

            </div>
        </div>
    );
};

export default SignIn;