"use client"
import React from 'react';

const Maintain = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <div className="flex flex-col items-center p-8 bg-gray-800 rounded-3xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl max-w-lg mx-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-24 h-24 text-blue-500 animate-spin-slow mb-6"
                >
                    <path d="M11.99 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-8a1 1 0 0 1-1-1V5a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1zm4 2a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zm-8 2a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zM9 17a1 1 0 0 1-1-1V12a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V12a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zM4.09 7.64a1 1 0 0 1 1.73-1L7.5 8.92a1 1 0 0 1-1 1.73L4.09 7.64zM16.5 8.92a1 1 0 0 1 1-1.73l1.68 1.25a1 1 0 0 1-1.73 1L16.5 8.92zM7.5 15.08a1 1 0 0 1-1.73 1L4.09 17.36a1 1 0 0 1 1.73 1l1.68-1.25a1 1 0 0 1-1-1.73zM18.91 17.36a1 1 0 0 1-1.73-1l1.68-1.25a1 1 0 0 1 1.73 1l-1.68 1.25z" />
                </svg>

                <h1 className="text-4xl font-extrabold text-blue-500 mb-2 drop-shadow-lg">
                    Under Maintenance
                </h1>
                <p className="text-xl text-gray-400 text-center font-light mb-6">
                    We're busy making some significant improvements to the site.
                </p>
                <p className="text-lg text-gray-500 text-center max-w-sm">
                    We appreciate your patience! We'll be back online as soon as possible with a better experience.
                </p>
            </div>
            <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Maintain;
