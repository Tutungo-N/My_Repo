// src/components/ImageCarousel.jsx
import React, { useEffect, useState } from 'react';
import image1 from '../assets/image1.jpg'; 
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';

const images = [image1, image2, image3, image4, image5, image6]; // Array of images

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);

    return (
        <div className="relative overflow-hidden h-64 md:h-96">
            <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Slide ${index + 1}`} className="h-full w-full object-contain" />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;

