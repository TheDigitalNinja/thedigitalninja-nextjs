/**
 * @file src/components/Footer.tsx
 * @fileoverview Footer component for The Digital Ninja website
 * @description This file defines a reusable Footer component that displays
 *              social media links and copyright information. It uses react-icons
 *              for social media icons and dynamically updates the copyright year.
 * 
 * @component Footer
 * @returns {JSX.Element} The rendered footer component with social links and copyright
 */

import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-4">
          <ul className="text-gray-400 flex space-x-6">
            <li>
              <a href="https://github.com/TheDigitalNinja" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub className="w-6 h-6" />
              </a>  
            </li>
            <li>
              <a href="https://www.linkedin.com/in/TheDigitalNinja" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/RussellPerkinsDenver" target="_blank" rel="noopener noreferrer" aria-label="Facebook">  
                <FaFacebook className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/perkinsrussell/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="w-6 h-6" />  
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Russell (TheDigitalNinja) Perkins. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;