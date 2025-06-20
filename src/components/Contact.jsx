import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { useState } from 'react';

const Contact = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const success = await onSubmit(formData);

    if (success) {
      setSubmitStatus({ success: true, message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } else {
      setSubmitStatus({ success: false, message: error || 'Failed to send message' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br ">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Right side - Contact form */}
        <div className="p-8 rounded-xl backdrop-blur-sm  bg-opacity-20 shadow-xl border border-gray-700 border-opacity-50">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 mb-4">
            Let's Connect!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Your Name</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                placeholder="name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Your Email <span className="text-gray-400">(optional)</span>
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Your Message</label>
              <textarea 
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                placeholder="Hello, I'd like to talk about..."
                required
              ></textarea>
            </div>

            {submitStatus && (
              <div className={`p-3 rounded-lg ${
                submitStatus.success ? 'bg-green-900 bg-opacity-50 text-green-300' : 'bg-red-900 bg-opacity-50 text-red-300'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-6 py-3 ${
                isLoading ? 'bg-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              } text-white font-medium rounded-lg transition shadow-lg`}
            >
              {isLoading ? (
                'Sending...'
              ) : (
                <>
                  <FiSend className="mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Left side - Animated Smiley */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex justify-center items-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Smiley Face */}
            <div className="w-64 h-64 bg-gradient-to-br from-blue-500 rounded-full shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Eyes */}
              <div className="flex space-x-12 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-8 h-8 bg-gray-900 rounded-full relative"
                >
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="w-8 h-8 bg-gray-900 rounded-full relative"
                >
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                </motion.div>
              </div>
              
              {/* Mouth */}
              <motion.div
                animate={{
                  d: [
                    "M30,80 Q60,120 90,80",
                    "M30,80 Q60,60 90,80",
                    "M30,80 Q60,120 90,80"
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="w-24 h-12"
              >
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  <path 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    d="M30,80 Q60,120 90,80"
                  />
                </svg>
              </motion.div>
              
              {/* Blush */}
              <div className="flex space-x-16 mt-8">
                <div className="w-6 h-4 bg-opacity-40 rounded-full"></div>
                <div className="w-6 h-4  bg-opacity-40 rounded-full"></div>
              </div>
              
              {/* Sparkles */}
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: [0, -20],
                    x: Math.random() * 40 - 20
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute text-white text-xl"
                  style={{
                    top: `${Math.random() * 60 + 20}%`,
                    left: `${Math.random() * 60 + 20}%`,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
            
            {/* Floating message */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute -bottom-10 left-0 right-0 text-center"
            >
              <div className="bg-gray-800 bg-opacity-70 px-4 py-2 rounded-full shadow-md inline-block backdrop-blur-sm">
                <span className="text-sm font-medium text-white">Hi there! 👋</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;