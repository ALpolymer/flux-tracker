import {Link, useNavigate} from "react-router";
import type {SignUpFormFields} from "../types";
import {z} from "zod";
import {useForm, type SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {fakeSignUp} from "../utils/fakeAuth.ts";



const passwordSchema = z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const SignUpSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters long")
        .max(30, "Username too long"),
    email: z
        .string()
        .min(1, "Email is required")
        .pipe(
            z.email({ message: "Invalid email address" })
        ),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords don't match",
            path: ['confirmPassword'],
        });
    }
})



const SignUp = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignUpFormFields>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit: SubmitHandler<SignUpFormFields> = (signUpData) => {
        try{
            fakeSignUp(signUpData);
            navigate("/signin");
        }
         catch(e){
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
                        Sign up
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                       Create an account to get started.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md">
                        <div className="mb-4">
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                {...register("username")}
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                            {errors.username && (<p className="text-red-600 text-sm">{errors.username.message}</p>)}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                {...register("email")}
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && (<p className="text-red-600 text-sm">{errors.email.message}</p>)}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                {...register("password")}
                                type="password"
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && (<p className="text-red-600 text-sm">{errors.password.message}</p>)}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input
                                {...register("confirmPassword")}
                                type="password"
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                            />
                            {errors.confirmPassword && (<p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>)}
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
                    {errors.root && (<p className="text-red-600 text-sm">{errors.root.message}</p>)}
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