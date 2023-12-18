import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useParams } from 'react-router-dom';

/**
 * UserImages component displays images associated with a user.
 */
const UserImages = () => {
    // Get the user's email from the URL parameters
    const { email } = useParams();

    // State to manage user images
    const [userImages, setUserImages] = useState([]);

    // Fetch user images when the component mounts or the email changes
    useEffect(() => {
        const fetchUserImages = async () => {
            try {
                // Retrieve existing users from local storage
                const existingUsersString = localStorage.getItem('users');
                const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

                // Find the current user based on the email
                const currentUser = existingUsers.find((user) => user.email === email);

                // Set user images in state if the user is found
                setUserImages(currentUser ? currentUser.images : []);
            } catch (error) {
                console.error('Error fetching user images:', error);
            }
        };

        // Fetch user images
        fetchUserImages();
    }, [email]);

    return (
        <div>
            {/* Include the Navbar component */}
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900 h-screen flex flex-wrap justify-center p-4">
                {/* Map through user images and display each image */}
                {userImages.map((image, index) => (
                    <div
                        key={index}
                        className="w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-900 mx-2 my-4"
                        style={{ height: 'fit-content' }}
                    >
                        {/* Display the image */}
                        <img
                            src={image}
                            alt={`Image ${index}`}
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            {/* Display image information */}
                            <h5 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                                Image {index + 1}
                            </h5>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default UserImages;
