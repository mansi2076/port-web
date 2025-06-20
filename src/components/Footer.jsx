import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub size={20} />, url: 'https://github.com/mansi2076' },
    { icon: <FaLinkedin size={20} />, url: 'https://www.linkedin.com/in/mansi-birla-209075289' },
    { icon: <HiOutlineMail size={20} />, url: 'mailto:mansibirla0307@gmail.com' },
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Name/Logo - scrolls to top */}
          <button
            onClick={scrollToTop}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 hover:opacity-80 transition-opacity"
          >
            Mansi Birla
          </button>

          {/* Social links */}
          <div className="flex space-x-6 mb-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                aria-label={`${link.icon.type.name} link`}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-400 hover:text-primary transition-colors duration-300 capitalize text-sm md:text-base"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Mansi Birla. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;