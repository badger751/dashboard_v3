"use client"


import { useState, useEffect } from 'react';
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSceneLoaded(true);
      // Delay the form appearance slightly after the scene has loaded
      setTimeout(() => setShowForm(true), 500);
    }, 3000); // Adjust this time based on the actual loading time of your Spline scene
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!isConsentChecked) {
      alert('Please agree to subscribe to our newsletter.');
      return;
    }

    setIsSending(true);
    // Implement your sending logic here
    alert('Email sent successfully!');
    setEmail('');
    setSubject('');
    setContent('');
    setIsSending(false);
  };

  return (
    <div className="relative h-screen">
      <AnimatePresence>
        {!isSceneLoaded && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-black z-10"
          >
            <p className="text-4xl font-mono">Good things are about to come</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isSceneLoaded && (
        <Spline scene="https://prod.spline.design/ewzg6Pw2WOVfPQ9D/scene.splinecode" />
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ duration: 1 }}
            className="absolute top-1/2  transform -translate-y-1/2 bg-transparent p-8 rounded-lg shadow-lg max-w-md"
          >
            <form onSubmit={handleSend} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className=" text-white bg-transparent block w-full p-2 rounded border border-purple-700"
                required
              />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Name"
                className=" font-yeseva one text-white bg-transparent block w-full p-2 rounded border border-purple-700"
                required
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Your thoughts"
                className=" text-white bg-transparent block w-full p-2 rounded border border-purple-700"
               
                required
              ></textarea>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isConsentChecked}
                  onChange={() => setIsConsentChecked(!isConsentChecked)}
                  className="w-4 h-4"
                />
                <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                  By sharing your email you agree to subscribe to our newsletter.
                </label>
              </div>
              <button
                className={`w-full bg-green-500 text-black font-serif py-2 rounded ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
