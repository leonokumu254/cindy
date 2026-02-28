import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { CONFIG } from '../constants';
import './ParticleCanvas.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  icon: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  const createParticle = (x?: number, y?: number): Particle => {
    const icons = CONFIG.assets.floatingIcons;
    return {
      x: x ?? Math.random() * window.innerWidth,
      y: y ?? -50, // Start above screen if not specified
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 3 + 2,
      icon: icons[Math.floor(Math.random() * icons.length)],
      size: Math.random() * 20 + 20,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    };
  };

  const spawnParticles = (count: number, x?: number, y?: number) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(x, y));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initial burst
    spawnParticles(50);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Remove if off screen
        if (p.y > canvas.height + 50) {
          particlesRef.current.splice(index, 1);
          // Respawn occasionally to keep flow
          if (Math.random() < 0.1) {
             particlesRef.current.push(createParticle());
          }
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.icon, 0, 0);
        ctx.restore();
      });

      // Constant trickle
      if (particlesRef.current.length < 30) {
        particlesRef.current.push(createParticle());
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleClick = (e: MouseEvent) => {
    spawnParticles(10, e.clientX, e.clientY);
  };

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      onClick={handleClick}
    />
  );
}
