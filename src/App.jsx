import { ref, set, onValue, push } from "firebase/database";
import { db } from "./firebase";
import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/Particles';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || true;
  });
  const [visitorCount, setVisitorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const countRef = ref(db, 'visitors/count');
    const updateCount = async () => {
      try {
        onValue(countRef, (snapshot) => {
          const currentCount = snapshot.val() || 0;
          const newCount = currentCount + 1;

          set(countRef, newCount)
            .then(() => setVisitorCount(newCount))
            .catch((error) => {
              console.error("Error updating count:", error);
              setVisitorCount(currentCount);
            });
        }, { onlyOnce: true });
      } catch (error) {
        console.error("Visitor count error:", error);
      }
    };
    updateCount();
  }, []);

  const handleContactSubmit = useCallback(async (messageData) => {
    if (!messageData?.name || !messageData?.message) {
      setSubmitError('Name and message are required');
      return false;
    }

    setIsLoading(true);
    setSubmitError(null);

    try {
      const messagesRef = ref(db, 'messages');
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, {
        name: String(messageData.name).trim(),
        email: String(messageData.email).trim() || 'No Email',
        message: String(messageData.message).trim(),
        timestamp: new Date().toISOString(),
        read: false
      });

      const visitorLogRef = ref(db, 'visitors/logs');
      await push(visitorLogRef, {
        name: messageData.name,
        email: messageData.email || 'No Email',
        messageTime: new Date().toISOString()
      });

      console.log("Message sent and visitor logged.");
      return true;
    } catch (error) {
      console.error("Submission error:", error.message);
      setSubmitError(`Failed to send message: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 -z-10 opacity-10 dark:opacity-20">
        <Particles
          particleColors={darkMode ? ['#3b82f6', '#8b5cf6', '#ec4899'] : ['#000000', '#333333']}
          particleCount={100}
          speed={0.5}
          particleBaseSize={2}
        />
      </div>

      <div className="dark:bg-gray-900/80 dark:text-gray-200 relative z-10">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="home" className="pt-32"><Hero /></section>
          <section id="about" className="pt-32"><About /></section>
          <section id="skills" className="pt-32"><Skills /></section>
          <section id="projects" className="pt-32"><Projects /></section>
          <section id="contact" className="pt-32">
            <Contact onSubmit={handleContactSubmit} isLoading={isLoading} error={submitError} />
          </section>
          <div className="text-center text-sm mt-4">
            {visitorCount > 0 ? `Visitors: ${visitorCount}` : 'Loading visitor count...'}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
