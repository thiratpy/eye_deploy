import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import LoadingModal from "./LoadingModal";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient( 
    "https://eggaokvibnheenenongc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZ2Fva3ZpYm5oZWVuZW5vbmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MzIwNjEsImV4cCI6MjA0NTAwODA2MX0.FunJBC2X_9yxcyF7ZYMij7yphMhcBD9hjI6TjNRoGxk"
);

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); 

        try {
            const { data, error } = await supabase
                .from("user")
                .select("roles")
                .eq("email", email.toLowerCase())
                .eq("password", password);

            if (error) {
                console.error("Error logging in:", error);
                setError("Error logging in. Please try again."); 
            } else if (data.length === 0) {
                console.error("Invalid credentials");
                setError("Invalid email or password."); 
            } else {
                const role = data[0].roles;
                localStorage.setItem("user_role", role);
                localStorage.setItem("user_email", email.toLowerCase());

                checkLoginStatus();
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("An error occurred. Please try again later."); 
        } finally {
            setLoading(false); 
        }
    };

    const checkLoginStatus = () => {
        const role = localStorage.getItem("user_role");
        if (role) {
            console.log("User logged in with role:", role);
            navigate("/"); 
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, [navigate]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center bg-gray-900"
        >
            <div className="bg-gray-800 p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-white mb-4">เข้าสู่ระบบ</h2>
                {error && ( 
                    <div className="text-red-500 mt-2 text-center">{error}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                            อีเมล
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="โปรดกรอกอีเมลของท่าน"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
                            รหัสผ่าน
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="โปรดกรอกรหัสผ่านของท่าน"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                        <Link
                            to="#" // Replace with the actual link for forgotten password
                            className="mt-2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        >
                            ลืมรหัส?
                        </Link>
                    </div>
                    <div className="mt-3">
                        <Link
                            className="text-sm text-blue-500 font-semibold cursor-pointer"
                            to="/register"
                        >
                            สร้างรหัสใหม่
                        </Link>
                    </div>
                </form>

                

                <LoadingModal show={loading} /> 
            </div>
        </motion.div>
    );
}

export default LoginPage;