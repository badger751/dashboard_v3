"use client"

// Import React and useState, as you might use useState for managing state in more complex scenarios.
import React from 'react';
// Importing motion from 'framer-motion' to apply animations.
import { motion } from 'framer-motion';
// Import custom components. Assuming the path is correct based on your initial code.
import { WavyBackground } from "@/components/ui/wave";
import { Button } from "@/components/ui/cssbutton";

// Define the ContactPage component.
const ContactPage = () => {
  // Animation variants for the container. This helps in keeping the animation properties organized and reusable.
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { delayChildren: 0.3, staggerChildren: 0.2 }
    },
  };

  // Return the JSX structure of the component.
  return (
    // Apply motion to animate the WavyBackground component.
    <WavyBackground className=" fixed flex flex-col justify-center items-center h-screen">
           <div className="text-white -mb-7 font-yeseva-one">
        <p className="text-9xl md:text-9xl lg:text-9xl font-bold">
          calm<span className="text-green-500">X</span>pace
        </p>
        <p className=" right-0 text-center font-yeseva-one font-light
         text-xl text-white mt-2">Empowering <span className='text-green-500' >your</span> journey with innovation.</p>

      </div>
      <div className=" content-center absolute top-2/3 font-semibold ">
      <Button
        borderRadius="1.75rem"
        className="bg-purple bg-opacity-40 bg-purple-500 size-full"
      >
        Join the waitlist 
      </Button>
    </div>
    </WavyBackground>
  );
};

// Export the ContactPage component for use in other parts of your application.
export default ContactPage;
