"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars

  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        console.log("Login failed", (error as Error).message);
        toast.error((error as Error).message);
      } else {
        console.log("Login failed", error);
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen py-2 flex-col">
      <h1 className=" text-center text-white text-2xl">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />
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
        onClick={onLogin}
        className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Login here
      </button>
      <Link href="/signup">Visit signup page </Link>
    </div>
  );
}
