import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/authContext";
import { db } from "@/firebase/firebaseConfig";
import { PAGE_ROUTE } from "@/routes/routes";
import {
  signInWithGithub,
  signInWithGoogle,
} from "@/services/auth/authServices";
import { addDoc, collection } from "firebase/firestore";
import { Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Inputs {
  email: "string";
  password: "string";
  name: "string";
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<Inputs>();

  const { user, signUp, loading, setLoading } = useAuth();

  const router = useRouter();

  const handleUserSignIn = async (data: Inputs) => {
    setLoading(true);
    try {
      const userCreated = await signUp(data.email, data.password);
      if (userCreated) {
        await addDoc(collection(db, "Users"), {
          name: data.name,
          email: data.email,
        });

        toast.success("User Created");
        router.push(PAGE_ROUTE.PUBLIC_ROUTES.SIGNIN);
      }
      setLoading(false);
    } catch (error: any) {
      toast.error(error.code);
    }
    setLoading(false);
  };

  const signInGoogle = async () => {
    const googleLogin = await signInWithGoogle();
    if (googleLogin) {
      toast.success("login success");
    }
  };

  const signInGithub = async () => {
    const githubLogin = await signInWithGithub();
    if (githubLogin) {
      toast.success("login success");
    }
  };

  useLayoutEffect(() => {
    if (!loading && user) {
      router.push(PAGE_ROUTE.LOCALHOST);
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        <form
          onSubmit={handleSubmit(handleUserSignIn)}
          className="space-y-2 text-black"
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("name", { required: "Name is Required" })}
          />
          {errors.name && touchedFields && (
            <p className="text-xs text-red-900 font-normal">
              {errors.name.message}
            </p>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", { required: "Email is Required" })}
          />
          {errors.email && touchedFields && (
            <p className="text-xs text-red-900 font-normal">
              {errors.email.message}
            </p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "password is Required",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters",
              },
            })}
          />
          {errors.password && touchedFields && (
            <p className="text-xs text-red-900 font-normal">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2  mt-2 rounded-md transition"
          >
            {loading ? <Spinner /> : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="space-y-3">
          <button
            onClick={signInGoogle}
            className="w-full flex items-center justify-center border text-black border-gray-300 rounded-md py-2 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Continue with Google
          </button>
          <button
            onClick={signInGithub}
            className="w-full flex items-center justify-center border text-black border-gray-300 rounded-md py-2 hover:bg-gray-50 transition"
          >
            <Github className="mr-2" />
            Continue with GitHub
          </button>
          <p className="text-black mt-1 text-xs text-center">
            Already have a Account{" "}
            <Link
              className="text-blue-600 hover:text-black"
              href={PAGE_ROUTE.PUBLIC_ROUTES.SIGNIN}
            >
              Sign In{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
