import React, { useState } from 'react';
import '../global.css';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import Navbar from './navbar';

const Login = () => {
    const navigate = useNavigate();

    // State for form data and isAdmin status
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isAdmin, setIsAdmin] = useState(false);

    // Event handler for form input changes
    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            setIsAdmin(e.target.checked);
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Event handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve existing users from local storage
        const existingUsersString = localStorage.getItem('users');
        const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

        let targetUser;

        if (isAdmin) {
            // Admin login, check against admin credentials
            targetUser = {
                email: 'admin@gmail.com',
                password: '1234',
            };
        } else {
            // Regular user login, check against existing users
            targetUser = existingUsers.find((u) => u.email === formData.email);
        }

        if (targetUser && isAdmin === false) {
            // Regular user authentication
            const passwordMatch = await bcrypt.compare(
                formData.password,
                targetUser.password
            );

            if (passwordMatch) {
                localStorage.setItem("token", targetUser.email);
                alert("Login success");
                navigate("/dashboard");
            } else {
                alert('Invalid Credentials');
                console.log('Invalid password');
            }
        } else if (isAdmin) {
            // Admin authentication
            if (formData.email === targetUser.email && formData.password === targetUser.password) {
                localStorage.setItem("token", targetUser.email);
                alert("Login success");
                navigate("/users");
            } else {
                alert('Invalid Credentials');
                console.log('Invalid Credentials');
            }
        } else {
            // User not found
            alert("User not found!!");
            console.log('User not found');
        }
    };

    return (
        <div>
            <Navbar />
            <div>
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                        <p
                            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                        >
                            <img
                                className="w-8 h-8 mr-2"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                                alt="logo"
                            />
                            Images
                        </p>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4 md:space-y-6"
                                >
                                    {/* Email input */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* Password input */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* Admin checkbox */}
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="admin"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required=""
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="admin"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                Login as Admin
                                            </label>
                                        </div>
                                    </div>
                                    {/* Submit button */}
                                    <button type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Sign in
                                    </button>
                                    {/* Signup link */}
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet?{" "}
                                        <Link
                                            to="/register"
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Login;
