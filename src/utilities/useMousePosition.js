import { useEffect, useRef } from "react";

const useMousePosition = (callback, lerpFactor = 0.05) => {
  const animationFrameId = useRef(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    // Disable parallax on mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate movement as a percentage (-1 to 1)
      const moveX = (clientX / innerWidth - 0.5) * 2;
      const moveY = (clientY / innerHeight - 0.5) * 2;

      // Set target positions
      targetX.current = moveX;
      targetY.current = moveY;
    };

    const animate = () => {
      // Smooth interpolation (lerp) - creates the delay effect
      currentX.current += (targetX.current - currentX.current) * lerpFactor;
      currentY.current += (targetY.current - currentY.current) * lerpFactor;

      if (callback) {
        callback(currentX.current, currentY.current);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [callback, lerpFactor]);
};

export default useMousePosition;
