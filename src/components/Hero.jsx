import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineDocumentText } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ScrambledText from './ScrambledText';

const Hero = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/mansi2076' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/mansi-birla-209075289' },
    { icon: <HiOutlineMail />, url: 'mailto:mansibirla0307@gmail.com' },
  ];

  const titles = [
    "Web Developer",
    "Software Engineer",
    "UI/UX Enthusiast",
    "Tech Innovator",
    "Problem Solver"
  ];

  const [currentTitle, setCurrentTitle] = useState(0);
  const [hoverContact, setHoverContact] = useState(false);
  const [showResumeButton, setShowResumeButton] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    // Show resume button after 1 second
    const buttonTimer = setTimeout(() => {
      setShowResumeButton(true);
    }, 1000);

    // Title rotation
    const titleInterval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => {
      clearTimeout(buttonTimer);
      clearInterval(titleInterval);
    };
  }, []);

  const handleResumeButtonClick = () => {
    setShowResumeButton(false);
    setShowWelcome(true);
  };

  const handleWelcomeClick = () => {
    setShowWelcome(false);
    setShowResume(true);
  };

  const closeResume = () => {
    setShowResume(false);
    setTimeout(() => {
      setShowResumeButton(true);
    }, 500);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-2 pb-10 w-full -mt-20 relative overflow-hidden"
    >
      {/* Floating Resume Button */}
      {showResumeButton && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-6 right-6 z-50"
        >
          <motion.button
            onClick={handleResumeButtonClick}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center text-white"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiOutlineDocumentText className="text-2xl" />
          </motion.button>
        </motion.div>
      )}

      {/* Welcome Message */}
      {showWelcome && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-6 right-6 z-50 cursor-pointer"
          onClick={handleWelcomeClick}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-full shadow-xl px-6 py-4 flex items-center space-x-3 border-2 border-purple-200 dark:border-purple-800"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
              <HiOutlineDocumentText className="text-xl" />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Welcome to my portfolio!</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Click to view my resume</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Resume Viewer */}
      {showResume && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeResume}
        >
          <div className="relative w-full max-w-6xl h-[90vh]">
            <button
              onClick={closeResume}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl z-10 transition-colors"
              aria-label="Close resume"
            >
              &times;
            </button>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full h-full bg-white rounded-lg overflow-hidden shadow-xl"
            >
              <iframe
                src="/public/Mansi_Birla.Resume.pdf"
                className="w-full h-full border-none"
                title="Mansi Birla's Resume"
                loading="eager"
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Animated background elements */}
      {hoverContact && (
        <>
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 z-0"
          />
          <motion.div 
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 0.05 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 z-0"
          />
        </>
      )}

      <div className="w-full px-2 sm:px-4 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
          {/* Left Content */}
          <div className="space-y-8 w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-400">
                Hello, I'm
              </h1>
              <h2 className="text-2xl md:text-4xl font-extrabold mt-2 text-gray-800 dark:text-white">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-text">
                  MANSI BIRLA
                </span>
              </h2>
              <motion.div
                key={currentTitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-semibold mt-4 text-gray-600 dark:text-gray-300 h-10"
              >
                {titles[currentTitle]}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mb-8"
            >
              <ScrambledText
                className="scrambled-text-demo"
                radius={100}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                I build exceptional digital experiences with React and modern web
                technologies. Passionate about creating efficient, scalable, and
                user-friendly applications.
              </ScrambledText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex space-x-6 mt-8"
            >
              <motion.a
                href="#contact"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onHoverStart={() => setHoverContact(true)}
                onHoverEnd={() => setHoverContact(false)}
                className="px-8 py-4 relative overflow-hidden rounded-lg font-medium transition-all duration-500 shadow-xl z-10"
                style={{
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
                }}
              >
                <motion.span 
                  className="relative z-10 text-white text-lg flex items-center"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  Contact Me
                  <motion.span 
                    className="ml-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    👋
                  </motion.span>
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>

              <motion.a
                href="#projects"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-500 hover:border-blue-500 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-gray-700 dark:text-gray-300 flex items-center"
              >
                View Work
                <span className="ml-2">→</span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex space-x-6 pt-8"
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500 transition-transform duration-300 hover:scale-125"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 blur-sm"
              />
              <div className="absolute inset-1 rounded-full overflow-hidden bg-white dark:bg-gray-900 border-4 border-white dark:border-gray-800 shadow-xl z-10">
                <motion.img
                  src="profile.jpg"
                  alt="Mansi Birla"
                  className="w-full h-full object-cover rounded-full"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute inset-0 rounded-full ring-2 ring-purple-400 dark:ring-purple-600 opacity-50 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;