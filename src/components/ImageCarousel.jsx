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
    const [isTransitioning, setIsTransitioning] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);

    useEffect(() => {
        if (currentIndex === images.length){
            setTimeout(() => {
                setIsTransitioning(false);// Disable transition temporarily
                setCurrentIndex(0);// Reset to the first image
            }, 700); // Adjust to match the transition duration for smooth reset
        }
    }, [currentIndex]);

    return (
        <div className="relative overflow-hidden h-64 md:h-96">
            <div
                className={`flex transition-transform duration-700 ${isTransitioning ? 'transform ease-in-out' : ''}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTransitionEnd={() =>{
                    if (currentIndex === images.length) setIsTransitioning(false);
                }}
            >
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Slide ${index + 1}`} className="h-full w-full object-contain" />
                ))}
                <img src={images[0]} alt="Slide 1 Duplicate" className="w-full h-full object-contain" />
            </div>
        </div>
    );
};

export default ImageCarousel;

