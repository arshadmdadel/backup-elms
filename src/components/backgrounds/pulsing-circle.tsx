"use client"

import { PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

interface PulsingCircleBackgroundProps {
  className?: string
  position?: 'fixed' | 'absolute'
}

export default function PulsingCircleBackground({ 
  className = "", 
  position = 'fixed' 
}: PulsingCircleBackgroundProps) {
  return (
    <div className={`${position} inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Multiple pulsing circles for background effect */}
      
      {/* Large circle - top right */}
      <div className="absolute -top-32 -right-32 w-64 h-64 flex items-center justify-center opacity-30">
        <PulsingBorder
          colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700", "#FF6B35", "#8A2BE2"]}
          colorBack="#00000000"
          speed={2}
          roundness={1}
          thickness={0.08}
          softness={0.3}
          intensity={3}
          spotSize={0.15}
          pulse={0.2}
          smoke={0.8}
          smokeSize={6}
          scale={1}
          rotation={0}
          frame={9161408.251009725}
          style={{
            width: "256px",
            height: "256px",
            borderRadius: "50%",
          }}
        />
        
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.8)" }}
        >
          <defs>
            <path id="circle-large" d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
          </defs>
          <text className="text-xs fill-white/40 font-medium">
            <textPath href="#circle-large" startOffset="0%">
              ELMS • E-Learning Management System • ELMS • E-Learning Management System •
            </textPath>
          </text>
        </motion.svg>
      </div>

      {/* Medium circle - bottom left */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 flex items-center justify-center opacity-25">
        <PulsingBorder
          colors={["#8A2BE2", "#FF6B35", "#FFD700", "#00FF88", "#FF4C3E", "#E77EDC", "#BEECFF"]}
          colorBack="#00000000"
          speed={1.5}
          roundness={1}
          thickness={0.12}
          softness={0.25}
          intensity={4}
          spotSize={0.12}
          pulse={0.15}
          smoke={0.6}
          smokeSize={5}
          scale={0.8}
          rotation={180}
          frame={5000000}
          style={{
            width: "192px",
            height: "192px",
            borderRadius: "50%",
          }}
        />
        
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path id="circle-medium" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
          </defs>
          <text className="text-xs fill-white/35 font-medium">
            <textPath href="#circle-medium" startOffset="0%">
              Welcome • Login • Dashboard • Welcome • Login • Dashboard •
            </textPath>
          </text>
        </motion.svg>
      </div>

      {/* Small circle - center right */}
      <div className="absolute top-1/3 -right-16 w-32 h-32 flex items-center justify-center opacity-20">
        <PulsingBorder
          colors={["#00FF88", "#BEECFF", "#E77EDC", "#FF4C3E", "#FFD700", "#FF6B35", "#8A2BE2"]}
          colorBack="#00000000"
          speed={2.5}
          roundness={1}
          thickness={0.15}
          softness={0.2}
          intensity={2}
          spotSize={0.08}
          pulse={0.1}
          smoke={0.4}
          smokeSize={3}
          scale={0.6}
          rotation={90}
          frame={7500000}
          style={{
            width: "128px",
            height: "128px",
            borderRadius: "50%",
          }}
        />
        
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.4)" }}
        >
          <defs>
            <path id="circle-small" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
          </defs>
          <text className="text-xs fill-white/30 font-medium">
            <textPath href="#circle-small" startOffset="0%">
              UIU • University • UIU • University •
            </textPath>
          </text>
        </motion.svg>
      </div>

      {/* Tiny circle - top left */}
      <div className="absolute top-1/4 -left-8 w-24 h-24 flex items-center justify-center opacity-15">
        <PulsingBorder
          colors={["#FFD700", "#FF4C3E", "#8A2BE2", "#00FF88", "#BEECFF", "#E77EDC", "#FF6B35"]}
          colorBack="#00000000"
          speed={3}
          roundness={1}
          thickness={0.2}
          softness={0.15}
          intensity={1.5}
          spotSize={0.06}
          pulse={0.05}
          smoke={0.3}
          smokeSize={2}
          scale={0.4}
          rotation={270}
          frame={3000000}
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  )
}
