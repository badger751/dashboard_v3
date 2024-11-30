"use client"

// use client directive is assumed to be already applied
import React, { useState } from 'react';
import Spline from "@splinetool/react-spline";

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isConsentChecked, setIsConsentChecked] = useState(false);

  const handleSend = async () => {
    if (!isConsentChecked) {
      alert('Please agree to subscribe to our newsletter.');
      return;
    }

    setIsSending(true);

    // Data to be sent
    const emailData = {
      email: email, // In a real application, this would be your business email
      subject: subject,
      content: content,
    };

    try {
      // Sending the data to the backend
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert('Email sent successfully');
        // Reset form fields
        setEmail('');
        setSubject('');
        setContent('');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Sending email failed:', error);
      alert('An error occurred while sending the email.');
    }
    setIsSending(false);
  };
  return (
    <div className="relative h-screen">
      <Spline scene="https://prod.spline.design/ewzg6Pw2WOVfPQ9D/scene.splinecode" />
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent p-8 rounded-lg shadow-lg max-w-md">
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-4 p-2 bg-transparent rounded border border-purple-500"
            required
          />
          <label className="sr-only " htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Name"
            className="w-full mb-4 p-2 rounded border bg-transparent border-purple-500"
            required
          />
          <label className="sr-only" htmlFor="content">Your message</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Your message"
            className="w-full mb-4 p-2 bg-transparent rounded border border-purple-500"
            required
          ></textarea>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="consent"
              checked={isConsentChecked}
              onChange={() => setIsConsentChecked(!isConsentChecked)}
              className="mr-2"
            />
            <label htmlFor="consent" className="text-gray-300 text-sm">
              By sharing your email you agree to subscribe to our newsletter
            </label>
          </div>
          <button
            type="submit"
            onClick={handleSend}
            className={`w-full bg-green-500 hover:bg-green-700 text-black font-bold py-2 rounded ${
              isSending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ContactPage;
