import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

const Ruffle = forwardRef((_, ref) => {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!document.querySelector('script[src="https://unpkg.com/@ruffle-rs/ruffle"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@ruffle-rs/ruffle';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const playSWF = (path, duration) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const ruffleInstance = window.RufflePlayer?.newest();
    if (!ruffleInstance) {
      console.error('RufflePlayer non disponible !');
      return;
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    const player = ruffleInstance.createPlayer();
    player.config = {
      autoplay: true,
      quality: 'high',
      wmode: 'transparent',
      splashScreen: false,
    };

    player.style.width = '900px';
    player.style.height = '700px';

    if (containerRef.current) {
      containerRef.current.appendChild(player);
      player.load(path);

      timeoutRef.current = setTimeout(() => {
        containerRef.current.innerHTML = '';
        setIsPlaying(false);
      }, duration * 1000);
    }

    setIsPlaying(true);
  };

  useImperativeHandle(ref, () => ({
    play: (path, duration) => playSWF(path, duration),
  }));

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 flex w-full h-full justify-center items-center pointer-events-none">
      <div ref={containerRef} />
    </div>
  );
});

export default Ruffle;
