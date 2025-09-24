"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import PulsingCircleBackground from "@/components/backgrounds/pulsing-circle"
import { LoginForm } from "@/components/auth/login-form"

/**
 * Enhanced login page with animated pulsing circle background
 * Uses the same LoginForm component with background styling
 */
export default function AnimatedLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Pulsing Circle Background */}
      <PulsingCircleBackground className="z-0" />
      
      {/* Back to Simple Login Link */}
      <Link 
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-white/70 hover:text-white transition-colors glassmorphic p-3 rounded-lg hover:glow-cyan"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Simple Login</span>
      </Link>
      
      {/* Content Layer */}
      <div className="relative z-10">
        <LoginForm showBackground={true} />
      </div>
    </div>
  )
}
