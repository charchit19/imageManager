import React, { useState } from 'react';
import Navbar from './navbar';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * EditImage component allows users to replace an existing image with a new one.
 */
const EditImage = () => {
    // Retrieve parameters from the URL
    const { email, imageIndex } = useParams();

    // State to manage the new image
    const [newImage, setNewImage] = useState(null);

    // Hook to navigate to other pages
    const Navigate = useNavigate();

    /**
     * Handles the file upload event and sets the new image URL.
     * @param {Object} event - The file upload event.
     */
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setNewImage(URL.createObjectURL(file));
    };

    /**
     * Handles the upload button click, replaces the existing image, and updates local storage.
     */
    const handleUploadButtonClick = () => {
        // Get the existing users from local storage
        const existingUsersString = localStorage.getItem('users');
        const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

        // Find the user based on the email
        const userIndex = existingUsers.findIndex((user) => user.email === email);

        // Check if the user exists
        if (userIndex !== -1) {
            // Replace the image at the specified index with the new image
            existingUsers[userIndex].images[imageIndex] = newImage;

            // Update the users in local storage
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // Display success message
            alert('Image replaced successfully!');

            // Navigate to the "/allimg" page
            Navigate("/allimg");
        }
    };

    return (
        <div>
            {/* Include the Navbar component */}
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center justify-center h-screen">
                    <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 shadow-md max-w-md w-full p-8 text-center">
                        <div className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <span className="w-8 h-8 mr-2" />
                            Upload Image to Edit
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mb-4 text-white"
                        />
                        <button
                            onClick={handleUploadButtonClick}
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EditImage;
