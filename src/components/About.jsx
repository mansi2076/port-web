"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [selectedCert, setSelectedCert] = useState(null);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      x: 5,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const dot = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    hover: {
      scale: 1.3,
      boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)"
    }
  };

  const emoji = {
    hover: { rotate: [0, 10, -10, 0] },
    float: {
      y: [0, -5, 0],
      transition: { 
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  // Certificates data
  const certificates = [
    {
      id: 5,
      title: "IBM SkillsBuild Front-end Web Development",
      issuer: "IBM & CSRBOX",
      date: "June 2024 - August 2024",
      description: "Completed 6-week summer internship program focused on front-end web development technologies.",
      imageUrl: "/public/ibm.png",
      certificateId: "1Hjv004coVwqcnVGlxt0x9HPwLwDjrGqw",
      uniqueId: "IBM2789",
      photoUrl:"/public/ibm.png"
    },
   {
  "id": 2,
  "title": "AI for Beginners",
  "issuer": "HP LIFE",
  "date": "May 2025",
  "description": "Gained a basic understanding of artificial intelligence (AI), including key concepts, applications, the importance of data in AI, business use cases, and ethical implications.",
  "imageUrl": "/public/hp.png"
},
    {
      id: 3,
      title: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "February 2023",
      description: "Certified in JavaScript fundamentals and common algorithms and data structures implementations.",
      imageUrl: "/certificates/javascript.jpg"
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      issuer: "Google",
      date: "December 2022",
      description: "Learned principles of user-centered design, wireframing, and prototyping.",
      imageUrl: "/certificates/design.jpg"
    },
  ];

  return (
    <div className="min-h-screen px-4 py-20 text-white">
      {/* Certificate Modal */}
      {selectedCert && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl w-full bg-gray-800 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Close Button */}
            <button 
              className="absolute top-4 right-4 z-50 bg-pink-600 hover:bg-pink-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all"
              onClick={() => setSelectedCert(null)}
              aria-label="Close certificate"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">{selectedCert.title}</h3>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="text-pink-300">{selectedCert.issuer}</span>
                <span className="text-gray-400">{selectedCert.date}</span>
                {selectedCert.certificateId && (
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    ID: {selectedCert.certificateId}
                  </span>
                )}
                {selectedCert.uniqueId && (
                  <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                    Unique ID: {selectedCert.uniqueId}
                  </span>
                )}
              </div>
              
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4 border border-gray-700">
                <img 
                  src={selectedCert.imageUrl} 
                  alt={selectedCert.title}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>
              
              <p className="text-gray-300 mb-4">{selectedCert.description}</p>
              
              <button 
                onClick={() => setSelectedCert(null)}
                className="mt-4 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Certifications
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Animated Title */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 mb-4">
            About Me
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-blue-500/0 via-pink-500 to-purple-500/0 mx-auto"
          />
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={container}
          className="relative pl-10 md:pl-12"
        >
          {/* Animated Line with Gradient */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute left-5 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/30 via-pink-400/50 to-purple-500/30"
          />

          {/* Personal Info */}
          <motion.div 
            variants={item}
            className="mb-14 relative group"
          >
            <motion.div
              variants={dot}
              className="absolute left-5 md:left-6 top-2 -translate-x-1/2 w-3 h-3  z-10"
            />
            
            <motion.div 
              whileHover={{ 
                x: 3,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="pl-6"
            >
              <motion.h3 
                className="text-xl md:text-2xl font-semibold text-blue-400 mb-3 flex items-center gap-2"
              >
                <motion.span 
                  variants={emoji}
                  animate="float"
                  whileHover="hover"
                  className="inline-block"
                >
                  👋
                </motion.span>
                Personal Info
              </motion.h3>
              
              <ul className="space-y-2 pl-2">
                {[
                  { label: "Name", value: "Mansi Birla", icon: "👩‍💻" },
                  { label: "Phone", value: "+91 9171815168", icon: "📱" },
                  { label: "Email", value: "mansibirla0307@gmail.com", icon: "✉️" },
                  { label: "Location", value: "Indore, MP", icon: "📍" }
                ].map((info, i) => (
                  <motion.li
                    key={i}
                    variants={item}
                    whileHover={{ 
                      x: 5,
                      color: "#ffffff"
                    }}
                    className="text-gray-300 flex items-start gap-2 py-1 cursor-default"
                  >
                    <span className="text-pink-400">{info.icon}</span>
                    <span>
                      <span className="font-medium text-white">{info.label}: </span>
                      {info.value}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Education */}
          <motion.div 
            variants={item}
            className="mb-14 relative group"
          >
            <motion.div
              variants={dot}
              className="absolute left-5 md:left-6 top-2 -translate-x-1/2 w-3 h-3  z-10"
            />
            
            <motion.div 
              whileHover={{ 
                x: 3,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="pl-6"
            >
              <motion.h3 
                className="text-xl md:text-2xl font-semibold text-blue-400 mb-3 flex items-center gap-2"
              >
                <motion.span 
                  variants={emoji}
                  animate="float"
                  whileHover="hover"
                  className="inline-block"
                >
                  🎓
                </motion.span>
                Education
              </motion.h3>
              
              <ul className="space-y-4 pl-2">
                {[
                  { 
                    degree: "Master's of Computer Applications", 
                    school: "Maulana Azad National Institute of Technology , Bhopal", 
                    period: "2023 - Present", 
                    cgpa: "CGPA: 8.09",
                    icon: "🏛️"
                  },
                  { 
                    degree: "Bachelor's of Computer Science", 
                    school: "Devi Ahilya Vishwavidyalaya University, Indore", 
                    period: "2020 - 2023", 
                    cgpa: "CGPA: 7.4",
                    icon: "📚"
                  }
                ].map((edu, i) => (
                  <motion.li
                    key={i}
                    variants={item}
                    whileHover={{ 
                      x: 5,
                      backgroundColor: "rgba(30, 41, 59, 0.3)"
                    }}
                    className="p-3 rounded-lg cursor-default"
                  >
                    <div className="flex gap-3">
                      <span className="text-blue-400 text-xl mt-0.5">{edu.icon}</span>
                      <div>
                        <p className="font-medium text-white">{edu.degree}</p>
                        <p className="text-gray-400">{edu.school}</p>
                        <div className="flex gap-3 mt-1.5">
                          <span className="text-xs text-pink-300 bg-pink-900/20 px-2 py-1 rounded-full">
                            {edu.period}
                          </span>
                          <span className="text-xs text-blue-300 bg-blue-900/20 px-2 py-1 rounded-full">
                            {edu.cgpa}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Certifications - Redesigned */}
          <motion.div 
            variants={item}
            className="relative group"
          >
            <motion.div
              variants={dot}
              className="absolute left-5 md:left-6 top-2 -translate-x-1/2 w-3 h-3 z-10"
            />
            
            <motion.div 
              whileHover={{ 
                x: 3,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="pl-6"
            >
              <motion.h3 
                className="text-xl md:text-2xl font-semibold text-blue-400 mb-3 flex items-center gap-2"
              >
                <motion.span 
                  variants={emoji}
                  animate="float"
                  whileHover="hover"
                  className="inline-block"
                >
                  📜
                </motion.span>
                Certifications
              </motion.h3>
              
              <div className="space-y-6 pl-2">
                {certificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    variants={item}
                    whileHover={{ 
                      y: -3,
                      scale: 1.01
                    }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 cursor-pointer transition-all duration-300 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-blue-900/20 p-3 rounded-lg border border-blue-800/50">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h4 className="font-medium text-white text-lg">{cert.title}</h4>
                            <span className="text-sm text-pink-300 bg-pink-900/20 px-3 py-1 rounded-full whitespace-nowrap">
                              {cert.date}
                            </span>
                          </div>
                          <p className="text-blue-300 mt-1">{cert.issuer}</p>
                          <p className="text-gray-400 mt-2 text-sm">{cert.description}</p>
                          {cert.certificateId && (
                            <div className="mt-3 flex gap-2 flex-wrap">
                              <span className="text-xs bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
                                Certificate ID: {cert.certificateId.slice(0, 8)}...
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <span className="text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1 transition-colors">
                          View Certificate
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;