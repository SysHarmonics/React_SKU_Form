"use client";

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { logoPath } from '@/lib/image';

interface LogoProps {
  className?: string;
  animate?: boolean;
}


export function Logo({ className = "", animate = true }: LogoProps) {
    const controls = useAnimation();
    const pathRef = useRef<SVGPathElement>(null);
  
    useEffect(() => {
      if (animate && pathRef.current) {
        controls.start({
          fillOpacity: [0, 1],
          pathLength: [0, 1],
          transition: {
            duration: 6.5,
            ease: "circInOut"
          }
        });
      }
    }, [animate, controls]);
  
    return (
      <div className={className}>
        <motion.svg 
          viewBox="0 0 4968 3431"  //logo viewbox
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient 
              id="logoFill" 
              x1="0%" 
              y1="0%" 
              x2="0%" 
              y2="100%"
            >
              <stop offset="0%" stopColor="#f705d8" stopOpacity="0" />
              <stop offset="100%" stopColor="#f705d8" stopOpacity="1" />
            </linearGradient>
          </defs>
          <motion.path
            ref={pathRef}
            d={logoPath}
            fill="url(#logoFill)"
            stroke="#f705d8"
            strokeWidth="2"
            initial={{ 
              fillOpacity: 0,
              pathLength: 0 
            }}
            animate={controls}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    );
  }