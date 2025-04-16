"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { CheckCircle2, ArrowRight, Shield, Bell, XCircle } from "lucide-react";

const steps = [
  {
    title: "Triaged & Reported",
    icon: CheckCircle2,
    description: "SOC Agent handled investigation and reporting",
  },
  {
    title: "Automated Response",
    icon: Shield,
    description: "Incident automatically contained",
  },
  {
    title: "Comprehensive Analysis",
    icon: CheckCircle2,
    description: "AI recognized patterns",
  },
  {
    title: "Accurate Detection",
    icon: Shield,
    description: "Zero false positives",
  },
  {
    title: "24/7 Coverage",
    icon: CheckCircle2,
    description: "No analyst fatigue",
  },
];

export default function WithSimbian() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !isInView) return;

    const timeline = gsap.timeline({
      defaults: { duration: 0.5, ease: "power2.out" },
    });

    timeline
      .fromTo(
        ".step-card",
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.2 }
      )
      .fromTo(
        ".connection-line",
        { width: "0%" },
        { width: "100%", duration: 1 },
        "-=0.5"
      )
      .fromTo(
        ".result-card",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.2 },
        "-=0.5"
      );

    setIsVisible(true);
  }, [isInView]);

  return (
    <section ref={containerRef} className="space-y-12">
      <motion.h2
        className="text-3xl font-semibold text-green-500 mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        With Simbian
      </motion.h2>

      <div className="relative">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-green-500/20 -translate-y-1/2 connection-line" />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <motion.div
                className="step-card bg-slate-800 p-6 rounded-xl border border-green-500/20 shadow-lg hover:shadow-green-500/10 transition-shadow duration-300"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-0 left-0 w-full h-full border-2 border-green-500/10 rounded-xl"
                  style={{ borderRadius: "inherit" }}
                />
                <step.icon className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </motion.div>
              
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"
                  animate={{
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-6 h-6 text-green-500" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <ResultCard
          title="Ignored Alerts"
          icon={<Bell className="w-8 h-8 text-green-500" />}
        />
        <ResultCard
          title="Wrongly Closed"
          icon={<XCircle className="w-8 h-8 text-green-500" />}
        />
        <ResultCard
          title="Active Threats"
          icon={<Shield className="w-8 h-8 text-green-500" />}
        />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <p>90% of alerts resolved automatically, 24/7</p>
        <p>Correlates alerts to your environment</p>
        <p>Investigate every alert—no SOAR needed</p>
      </motion.div>
    </section>
  );
}

function ResultCard({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <motion.div
      className="result-card bg-slate-800 p-6 rounded-xl border border-green-500/20 shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5,
          }}
          className="flex items-center"
        >
          <motion.span
            className="text-2xl font-bold text-green-500"
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            0
          </motion.span>
        </motion.div>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </motion.div>
  );
}