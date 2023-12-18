import React, { useState } from 'react';
import Navbar from './navbar';

/**
 * Dashboard component allows users to upload images.
 */
const Dashboard = () => {
    // State to manage the selected image
    const [selectedImage, setSelectedImage] = useState(null);

    /**
     * Handles the image upload event and sets the selected image URL.
     * @param {Object} e - The image upload event.
     */
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageUrl = reader.result;
                setSelectedImage(imageUrl);
            };

            reader.readAsDataURL(file);
        }
    };

    /**
     * Handles the upload button click, updates the user's images array, and saves it to local storage.
     */
    const handleUploadButtonClick = () => {
        if (selectedImage) {
            // Get the current user's email from the token
            const currentUserEmail = localStorage.getItem("token");

            // Retrieve existing users from local storage
            const existingUsersString = localStorage.getItem('users');
            const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

            // Find the current user in the array
            const currentUser = existingUsers.find((user) => user.email === currentUserEmail);

            if (currentUser) {
                // Update the user's images array
                const updatedUser = {
                    ...currentUser,
                    images: [...currentUser.images, selectedImage],
                };

                // Update the user in the array
                const updatedUsers = existingUsers.map((user) =>
                    user.email === currentUserEmail ? updatedUser : user
                );

                // Save the updated users array to local storage
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                alert("Image Uploaded");

                // Optionally, you can update the state or trigger any other action
                // setUsers(updatedUsers);
            } else {
                console.log('Current user not found');
            }
        }
    };

    return (
        <div>
            {/* Include the Navbar component */}
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900 h-screen">
                <div className="flex items-center justify-center h-full">
                    <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 shadow-md max-w-md w-full p-8 text-center">
                        <div className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <span className="w-8 h-8 mr-2" />
                            Upload Image
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

export default Dashboard;
