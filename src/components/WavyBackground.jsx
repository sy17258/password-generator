import React, { useEffect, useRef } from 'react';

export const WavyBackground = ({ 
  children, 
  className = "", 
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  waveWidth = 100,
  backgroundFill = "white",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props 
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const animationSpeed = speed === "fast" ? 0.15 : speed === "slow" ? 0.05 : 0.1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    
    let animationFrameId;
    let phase = 0;
    
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, width, height);
      
      // Draw waves
      const waveCount = colors.length;
      const waveHeight = height / 10;
      
      for (let i = 0; i < waveCount; i++) {
        const wavePhase = phase + i * Math.PI * 0.5;
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = waveOpacity;
        ctx.beginPath();
        
        // Start at the left edge
        ctx.moveTo(0, height);
        
        // Draw wave
        for (let x = 0; x < width; x += 10) {
          const y = Math.sin(x / waveWidth + wavePhase) * waveHeight + height / 2;
          ctx.lineTo(x, y);
        }
        
        // Complete the path
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }
      
      phase += animationSpeed;
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    // Handle resize
    const handleResize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [backgroundFill, colors, waveOpacity, waveWidth, animationSpeed]);
  
  return (
    <div ref={containerRef} className={`relative ${className}`} {...props}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          filter: `blur(${blur}px)`,
          WebkitFilter: `blur(${blur}px)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default WavyBackground;