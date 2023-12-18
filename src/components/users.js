import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';

/**
 * Users component displays a table of users with associated information.
 */
const Users = () => {
    // State to manage the list of users
    const [users, setUsers] = useState([]);

    // Fetch users from local storage when the component mounts
    useEffect(() => {
        const fetchUsers = () => {
            // Retrieve users from local storage
            const existingUsersString = localStorage.getItem('users');
            const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

            // Set the users state with the retrieved data
            setUsers(existingUsers);
        };

        // Fetch users
        fetchUsers();
    }, []);

    /**
     * Handles the deletion of a user based on their email.
     * @param {string} email - The email of the user to be deleted.
     */
    const handleDeleteUser = (email) => {
        // Filter out the user with the specified email
        const updatedUsers = users.filter((user) => user.email !== email);

        // Update the local storage with the new user list
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Update the state to reflect the changes
        setUsers(updatedUsers);
    };

    return (
        <div>
            {/* Include the Navbar component */}
            <Navbar />
            <div className="relative overflow-x-auto shadow-md bg-gray-50 dark:bg-gray-900 h-screen">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-4">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                No of Images
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                className={index % 2 !== 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.images.length}
                                </td>
                                <td className="px-6 py-4">
                                    {/* Link to user images */}
                                    <Link
                                        to={`/user-images/${user.email}`}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                                    >
                                        Images
                                    </Link>
                                    {/* Button to delete user */}
                                    <button
                                        onClick={() => handleDeleteUser(user.email)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
