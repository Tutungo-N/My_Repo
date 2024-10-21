import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import NavBar from '../components/NavBar';

const HomePage = () => {
    return (
        <div className="container mx-auto p-4 pt-20">
            {/* NavBar should remain fixed and responsive */}
            <NavBar />
            
            {/* Main content section */}
            <header className="text-center mt-8 md:mt-16">
                {/* Responsive heading text */}
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                    Welcome to TrackiBits
                </h1>
                
                {/* Responsive subheading text */}
                <p className="mt-2 md:mt-4 text-lg md:text-xl text-gray-600">
                    Track your habits easily and effectively!
                </p>
                
                {/* Responsive ImageCarousel */}
                <div className="mt-8">
                    <ImageCarousel />
                </div>
            </header>
        </div>
    );
};

export default HomePage;
