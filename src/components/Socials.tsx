import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaDiscord } from 'react-icons/fa';

const Socials = () => {
  return (
    <div className="flex justify-center space-x-6">
      <a href="https://github.com/TheDigitalNinja" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <FaGithub className="w-6 h-6 text-gray-400 hover:text-gray-300" />
      </a>
      <a href="https://www.linkedin.com/in/TheDigitalNinja" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FaLinkedin className="w-6 h-6 text-gray-400 hover:text-gray-300" />
      </a>
      <a href="https://www.facebook.com/RussellPerkinsDenver" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FaFacebook className="w-6 h-6 text-gray-400 hover:text-gray-300" />
      </a>
      <a href="https://www.instagram.com/perkinsrussell/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <FaInstagram className="w-6 h-6 text-gray-400 hover:text-gray-300" />
      </a>
      <a href="https://discord.gg/Rkrn8Udqp9" target="_blank" rel="noopener noreferrer" aria-label="Discord">
        <FaDiscord className="w-6 h-6 text-gray-400 hover:text-gray-300" />
      </a>
    </div>
  );
};

export default Socials;
