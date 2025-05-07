import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaDiscord, FaYoutube } from 'react-icons/fa';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const FollowMeWidget = () => {
  return (
    <div className={`${inter.className} mb-12`}>
      <h3 className="text-2xl font-bold mb-4 text-center">Stay Connected</h3>
      <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
        Follow me on social media for more tech insights and updates!
      </p>
      <div className="flex justify-center space-x-6">
        <a href="https://github.com/TheDigitalNinja" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-transform hover:scale-110">
          <FaGithub className="w-8 h-8 text-gray-700 dark:text-gray-300" />
        </a>
        <a href="https://www.linkedin.com/in/TheDigitalNinja" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-transform hover:scale-110">
          <FaLinkedin className="w-8 h-8 text-blue-600" />
        </a>
        <a href="https://www.facebook.com/RussellPerkinsDenver" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-transform hover:scale-110">
          <FaFacebook className="w-8 h-8 text-blue-500" />
        </a>
        <a href="https://www.instagram.com/perkinsrussell/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-transform hover:scale-110">
          <FaInstagram className="w-8 h-8 text-pink-600" />
        </a>
        <a href="https://discord.gg/Rkrn8Udqp9" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="transition-transform hover:scale-110">
          <FaDiscord className="w-8 h-8 text-indigo-500" />
        </a>
        <a href="https://www.youtube.com/TheDigitalNinja" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-transform hover:scale-110">
          <FaYoutube className="w-8 h-8 text-red-600" />
        </a>
      </div>
    </div>
  );
};

export default FollowMeWidget;