import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';

/**
 * Allima component displays all images for all users and provides options to view and delete images.
 */
const Allima = () => {
    // State to store all users and their images
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        // Retrieve all users from local storage
        const existingUsersString = localStorage.getItem('users');
        const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

        // Set the state with all users
        setAllUsers(existingUsers);
    }, []);

    /**
     * Handles the delete image action for a specific user.
     * @param {string} username - The username of the user.
     * @param {number} imageIndex - The index of the image to be deleted.
     */
    const handleDelete = (username, imageIndex) => {
        // Get the existing users from local storage
        const existingUsersString = localStorage.getItem('users');
        const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

        // Find the user based on the username
        const userIndex = existingUsers.findIndex((user) => user.username === username);

        if (userIndex !== -1) {
            // Remove the image at the specified index from the user's images array
            existingUsers[userIndex].images.splice(imageIndex, 1);

            // Update the users in local storage
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // Update the state to trigger a re-render
            setAllUsers([...existingUsers]);
            alert("Image Deleted !!");
        }
    };

    return (
        <div>
            {/* Include the Navbar component */}
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900 h-full flex flex-wrap justify-center p-4">
                {allUsers.map((user, userIndex) => (
                    <div key={userIndex}>
                        <div className="flex flex-wrap justify-center">
                            {user.images.map((image, imageIndex) => (
                                <div
                                    key={imageIndex}
                                    className="w-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-900 mx-2 my-4"
                                >
                                    <img
                                        key={imageIndex}
                                        src={image}
                                        alt={`User ${userIndex + 1}-${imageIndex + 1}`}
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                    <div className="p-4 pb-0">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">User Name: {user.username}</p>
                                    </div>
                                    <div className="p-4 pb-0">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">User Email: {user.email}</p>
                                    </div>
                                    <div className="p-4 pb-0">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Image: {imageIndex + 1}</p>
                                    </div>
                                    <div className="flex items-center space-x-3 p-4">
                                        {/* Link to view user images */}
                                        <Link
                                            to={`/user-images/${user.email}/${imageIndex}`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 50 50"
                                                width="14px"
                                                height="14px"
                                                style={{ fill: "#FFFFFF", cursor: 'pointer' }}
                                            >
                                                <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z" />
                                            </svg>
                                        </Link>
                                        {/* Delete image button */}
                                        <div>
                                            <svg
                                                onClick={() => handleDelete(user.username, imageIndex)}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 30 30"
                                                width="20px"
                                                height="20px"
                                                style={{ fill: "#FFFFFF", cursor: 'pointer' }}
                                            >
                                                {" "}
                                                <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Allima;
