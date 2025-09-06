"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        console.log("Signup failed", (error as Error).message);
      } else {
        console.log("Signup failed", error);
      }
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen py-2 flex-col">
      <h1 className=" text-center text-white text-2xl">
        {loading ? "Processing" : "SignUp"}
      </h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className=" p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-900"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className=" p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-900"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className=" p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-900"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "Loading..." : "Signup"}
      </button>
      <Link href="/login">Visit login page </Link>
    </div>
  );
}
