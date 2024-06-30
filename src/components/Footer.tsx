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