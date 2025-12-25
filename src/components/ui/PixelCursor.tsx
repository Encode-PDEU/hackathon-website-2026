import { motion } from "framer-motion";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useEffect, useState } from "react";

export const PixelCursor = () => {
    const { x, y } = useMousePosition();
    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Check for hoverable elements
        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 bg-white mix-blend-difference pointer-events-none z-[9999]"
            style={{
                width: isHovering ? 32 : 16,
                height: isHovering ? 32 : 16,
                x: x - (isHovering ? 16 : 8),
                y: y - (isHovering ? 16 : 8),
            }}
            animate={{
                scale: isClicking ? 0.8 : 1,
                rotate: isClicking ? 45 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28
            }}
        >
            {/* Crosshair details */}
            <div className="absolute inset-0 border-2 border-black opacity-20"></div>
        </motion.div>
    );
};
