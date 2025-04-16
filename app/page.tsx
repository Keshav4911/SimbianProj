"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WithoutSimbian from "@/components/without-simbian";
import WithSimbian from "@/components/with-simbian";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(".title-gradient", {
      backgroundPositionX: "200%",
      duration: 2,
      ease: "power2.out",
    });

    gsap.fromTo(
      ".content-section",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".content-section",
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <main 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden"
    >
      <motion.div 
        style={{ opacity }}
        className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,128,255,0.1)_0%,transparent_100%)] pointer-events-none"
      />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="title-gradient text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-300% animate-gradient">
            Security Operations Experience
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-xl text-gray-300"
          >
            Experience the future of security operations
          </motion.p>
        </motion.div>
        
        <div className="space-y-32">
          <div className="content-section">
            <WithoutSimbian />
          </div>
          <div className="content-section">
            <WithSimbian />
          </div>
        </div>
      </div>
    </main>
  );
}