import React from 'react';
import '../index.css';

const AboutMe = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="flex flex-col max-w-lg bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 hover:animate-dance">About TrackiBits</h1>
                <p className="text-gray-700 text-2xl leading-relaxed text-semi-bold">
                    TrackiBits is a habit tracking application designed to help users create and manage their daily habits
                    effectively. The platform enables users to track their progress, stay motivated, and accomplish their goals
                    with ease. Start your journey today by creating habits that matter most to you!
                </p>
            </div>
        </div>
    );
};

export default AboutMe;
