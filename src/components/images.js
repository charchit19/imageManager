import React, { useEffect, useState } from 'react';
import Navbar from './navbar';

/**
 * Images component displays a list of images associated with the current user.
 */
const Images = () => {
    // State to manage the user's images
    const [userImages, setUserImages] = useState([]);

    // Fetch user images from local storage when the component mounts
    useEffect(() => {
        const fetchUserImages = () => {
            // Get the current user's email from the token
            const currentUserEmail = localStorage.getItem('token');

            // Retrieve existing users from local storage
            const existingUsersString = localStorage.getItem('users');
            const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

            // Find the current user in the array
            const currentUser = existingUsers.find((user) => user.email === currentUserEmail);

            // Set the user's images to state
            if (currentUser) {
                setUserImages(currentUser.images || []);
            }
        };

        // Fetch user images
        fetchUserImages();
    }, []);

    return (
        <div>
            {/* Include the Navbar component */}
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900 h-screen flex flex-wrap justify-center">
                {userImages.map((image, index) => (
                    <div
                        key={index}
                        className="w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-900 mx-2 my-4"
                        style={{ height: 'fit-content' }}
                    >
                        <p>
                            <img src={image} alt={`User Uploaded ${index + 1}`} className="w-full h-40 object-cover rounded-t-lg" />
                        </p>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {/* You can add a title or description for each image */}
                                Image {index + 1}
                            </h5>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Images;
