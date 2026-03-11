'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'motion/react'
import confetti from 'canvas-confetti'
import { CheckCircle2, ArrowRight, Download, Smartphone, AlertCircle, Loader2 } from 'lucide-react'

import Image from 'next/image'

// Simple device detection
const useDevice = () => {
  const [device, setDevice] = useState<'ios' | 'android' | 'desktop'>('desktop')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const detectDevice = () => {
      const ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {
        setDevice('ios')
      } else if (/android/.test(ua)) {
        setDevice('android')
      } else {
        setDevice('desktop')
      }
    }
    
    detectDevice()
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return { device, mounted }
}

export default function LandingPage() {
  const [step, setStep] = useState<'vote' | 'verifying' | 'gate'>('vote')
  const [vote, setVote] = useState<string | null>(null)
  const { device, mounted } = useDevice()

  // Animated counter for live votes
  const count = useSpring(0, { stiffness: 50, damping: 20, duration: 2000 })
  const displayCount = useTransform(count, (latest) => Math.round(latest).toLocaleString())

  useEffect(() => {
    if (mounted) {
      count.set(56)
    }
  }, [mounted, count])

  const handleVote = (choice: string) => {
    if (choice === 'Chipotle') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#003831', '#C69214', '#ffffff'] // Mustang Green, Gold, White
      })
    }
    
    setVote(choice)
    setStep('verifying')
    setTimeout(() => {
      setStep('gate')
    }, 800)
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden">
      {/* Subtle Dot Pattern Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '24px 24px', opacity: 0.5 }} />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative">
        {/* Background Accents */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-mustang-green/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-mustang-gold/5 rounded-full blur-3xl" />
        </div>

        <AnimatePresence mode="wait">
          {step === 'vote' && (
            <motion.div
              key="vote"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 120,
                duration: 0.8
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl space-y-12"
            >
              <div className="text-center space-y-6 md:space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-mustang-gold/10 text-mustang-gold-dark rounded-full border border-mustang-gold/20">
                    <Smartphone className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Student Movement</span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter uppercase">
                    We Want <br />
                    <motion.span 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                        delay: 0.2
                      }}
                      className="text-7xl md:text-[11rem] text-mustang-green underline decoration-mustang-green decoration-[8px] md:decoration-[14px] underline-offset-[16px] block mt-2"
                    >
                      Chipotle
                    </motion.span>
                  </h1>
                </div>
                <p className="text-slate-500 font-medium max-w-md mx-auto text-sm md:text-lg leading-relaxed">
                  Let&apos;s be honest, Picos <span className="underline decoration-mustang-green decoration-2 underline-offset-4">SUCKS</span>. Cast your vote in the app so we can make this a reality.
                </p>
              </div>

              {/* Kalshi-style Market Interface */}
              <div className="max-w-2xl mx-auto w-full space-y-4 md:space-y-6">
                {/* Live Sentiment Bar - Moved Up */}
                <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Votes</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <motion.span>{displayCount}</motion.span> Students Voted
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '74%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-mustang-green" 
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '26%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-slate-200" 
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                      <div className="text-mustang-green">Chipotle (74%)</div>
                      <div className="text-slate-400">Picos (26%)</div>
                    </div>
                  </div>
                </div>

                {/* Voting Buttons - Kalshi Style, but Biased */}
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      boxShadow: ['0px 0px 0px rgba(0, 56, 49, 0)', '0px 0px 20px rgba(0, 56, 49, 0.4)', '0px 0px 0px rgba(0, 56, 49, 0)']
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    onClick={() => handleVote('Chipotle')}
                    className="group relative flex flex-col justify-between bg-mustang-green p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-mustang-green hover:bg-mustang-green-light transition-all text-left overflow-hidden shadow-xl"
                  >
                    <div className="absolute top-0 right-0 bg-mustang-gold text-mustang-gold-dark text-[8px] md:text-[10px] font-black px-2 py-1 rounded-bl-xl uppercase tracking-widest">
                      The Move
                    </div>
                    <div className="relative z-10 space-y-1 md:space-y-2 mt-2">
                      <div className="text-[8px] md:text-[10px] font-bold text-mustang-gold uppercase tracking-widest">Option A</div>
                      <div className="text-xl md:text-3xl font-black text-white uppercase tracking-tight">Chipotle</div>
                      <div className="text-[9px] md:text-xs text-emerald-100 font-medium line-clamp-1">Replace Picos Forever</div>
                    </div>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote('Picos')}
                    className="group relative flex flex-col justify-between bg-slate-50 p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all text-left overflow-hidden opacity-70 grayscale hover:grayscale-0"
                  >
                    <div className="absolute top-0 right-0 bg-slate-200 text-slate-500 text-[8px] md:text-[10px] font-black px-2 py-1 rounded-bl-xl uppercase tracking-widest">
                      Boring
                    </div>
                    <div className="relative z-10 space-y-1 md:space-y-2 mt-2">
                      <div className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Option B</div>
                      <div className="text-lg md:text-2xl font-black text-slate-400 uppercase tracking-tight">Picos</div>
                      <div className="text-[9px] md:text-xs text-slate-400 font-medium line-clamp-1">Keep Sad Dining</div>
                    </div>
                    <div className="absolute inset-0 bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'verifying' && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                <svg className="w-full h-full animate-spin text-mustang-green" viewBox="0 0 100 100">
                  <circle className="opacity-20" cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" />
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset="200" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-mustang-green animate-spin" />
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">Authenticating...</h2>
            </motion.div>
          )}

          {step === 'gate' && (
            <motion.div
              key="gate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-slate-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-mustang-green" />
              
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2 text-mustang-gold-dark">
                    <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Action Required</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase leading-none">Lock In Your Vote</h2>
                  <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                    To ensure the integrity of the poll, all votes must be finalized via our mobile application.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-100 flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-mustang-green rounded-xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg shadow-mustang-green/20 shrink-0">
                    {vote === 'Chipotle' ? 'CH' : 'PI'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 truncate">Your Selection</div>
                    <div className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight truncate">{vote}</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 md:px-3 md:py-1 bg-mustang-gold/10 text-mustang-gold-dark text-[8px] md:text-[10px] font-black rounded-full uppercase border border-mustang-gold/20 shrink-0">
                    <div className="w-1.5 h-1.5 bg-mustang-gold-dark rounded-full animate-pulse" />
                    Pending
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {!mounted ? (
                    <div className="w-full h-14 md:h-16 bg-slate-100 rounded-xl md:rounded-2xl animate-pulse" />
                  ) : device === 'ios' ? (
                    <a
                      href="https://apps.apple.com/app/id6759310029"
                      className="flex items-center justify-center gap-2 md:gap-3 w-full bg-mustang-green text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-tight hover:bg-mustang-green-light transition-all shadow-xl shadow-mustang-green/20 active:scale-95 text-sm md:text-base"
                    >
                      <Download className="w-4 h-4 md:w-5 md:h-5" />
                      Open in App Store
                    </a>
                  ) : device === 'android' ? (
                    <button
                      className="flex items-center justify-center gap-2 md:gap-3 w-full bg-mustang-gold text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-tight hover:bg-mustang-gold-dark transition-all shadow-xl shadow-mustang-gold/20 active:scale-95 text-sm md:text-base"
                    >
                      <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
                      Join Android Waitlist
                    </button>
                  ) : (
                    <a
                      href="https://www.mustang-market.com/"
                      className="flex items-center justify-center gap-2 md:gap-3 w-full bg-mustang-gold text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-tight hover:bg-mustang-gold-dark transition-all shadow-xl shadow-mustang-gold/20 active:scale-95 text-sm md:text-base"
                    >
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      Go to the Site
                    </a>
                  )}
                  
                  <p className="text-center text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed px-2 md:px-4">
                    Mustang Market is a student-led platform. <br />
                    Not affiliated with Cal Poly San Luis Obispo.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main>
  )
}
