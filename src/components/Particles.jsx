import { useEffect, useRef, useCallback } from 'react';

const Particles = ({
  particleColors = ['#ffffff'],
  particleCount = 100,
  speed = 0.5,
  particleBaseSize = 2,
  moveParticlesOnHover = true
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mousePosRef = useRef({ x: null, y: null });
  const animationFrameIdRef = useRef(null);

  // Memoized resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  // Memoized mouse move handler
  const handleMouseMove = useCallback((e) => {
    mousePosRef.current = {
      x: e.clientX,
      y: e.clientY
    };
  }, []);

  // Initialize particles
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = Array.from({ length: particleCount }, () => {
      const colorIndex = Math.floor(Math.random() * particleColors.length);
      const color = particleColors[colorIndex];
      
      // Validate color format
      const validatedColor = isValidColor(color) ? color : '#ffffff';
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * particleBaseSize + 1,
        color: validatedColor,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed
      };
    });
  }, [particleCount, particleColors, particleBaseSize, speed]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Mouse interaction
      if (moveParticlesOnHover && mousePosRef.current.x && mousePosRef.current.y) {
        const dx = particle.x - mousePosRef.current.x;
        const dy = particle.y - mousePosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (100 - distance) / 50;
          
          particle.speedX = Math.min(Math.max(particle.speedX + forceDirectionX * force * 0.05, -5), 5);
          particle.speedY = Math.min(Math.max(particle.speedY + forceDirectionY * force * 0.05, -5), 5);
        }
      }

      // Update position with bounds checking
      particle.x = Math.max(particle.size, Math.min(particle.x + particle.speedX, canvas.width - particle.size));
      particle.y = Math.max(particle.size, Math.min(particle.y + particle.speedY, canvas.height - particle.size));

      // Apply friction with minimum speed threshold
      particle.speedX *= 0.99;
      particle.speedY *= 0.99;

      // Boundary bounce with damping
      if (particle.x <= particle.size || particle.x >= canvas.width - particle.size) {
        particle.speedX *= -0.8;
      }
      if (particle.y <= particle.size || particle.y >= canvas.height - particle.size) {
        particle.speedY *= -0.8;
      }
    });

    animationFrameIdRef.current = requestAnimationFrame(animate);
  }, [moveParticlesOnHover]);

  // Color validation helper
  const isValidColor = (color) => {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = color;
    return ctx.fillStyle !== '';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    handleResize();
    initParticles();
    animationFrameIdRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    if (moveParticlesOnHover) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleResize, initParticles, animate, handleMouseMove, moveParticlesOnHover]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      aria-hidden="true" // Accessibility improvement
    />
  );
};

export default Particles;