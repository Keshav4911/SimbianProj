"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { AlertTriangle, XCircle, Shield, Bell } from "lucide-react";

const alerts = [
  "Phishing Email Detected",
  "Suspicious Login Attempt",
  "Malware Detection",
  "Unauthorized Access",
  "Data Exfiltration Attempt",
  "Ransomware Activity",
];

export default function WithoutSimbian() {
  const [ignoredAlerts, setIgnoredAlerts] = useState(200);
  const [wronglyClosed, setWronglyClosed] = useState(35);
  const [activeThreats, setActiveThreats] = useState(5);
  const [currentAlerts, setCurrentAlerts] = useState<{ id: number; text: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".alert-card"),
      {
        scale: 0.8,
        opacity: 0,
        y: 50,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      }
    );

    const interval = setInterval(() => {
      setIgnoredAlerts((prev) => prev + Math.floor(Math.random() * 3));
      setWronglyClosed((prev) => prev + Math.floor(Math.random() * 2));
      setActiveThreats((prev) => prev + Math.floor(Math.random() * 1));

      const newAlert = {
        id: Date.now(),
        text: alerts[Math.floor(Math.random() * alerts.length)],
      };
      setCurrentAlerts((prev) => [...prev.slice(-2), newAlert]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="space-y-8">
      <motion.h2
        className="text-3xl font-semibold text-red-500 mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Without Simbian
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AlertCard
          title="Ignored Alerts"
          count={ignoredAlerts}
          icon={<Bell className="w-8 h-8 text-yellow-500" />}
          alerts={currentAlerts}
          color="yellow"
        />
        <AlertCard
          title="Wrongly Closed"
          count={wronglyClosed}
          icon={<XCircle className="w-8 h-8 text-red-500" />}
          alerts={currentAlerts}
          color="red"
        />
        <AlertCard
          title="Active Threats"
          count={activeThreats}
          icon={<AlertTriangle className="w-8 h-8 text-orange-500" />}
          alerts={currentAlerts}
          color="orange"
        />
      </div>

      <motion.div 
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p>Wasting valuable analyst time on false positives</p>
        <p>Processing one alert at a time, missing the big picture</p>
        <p>More time fixing SOAR automation, less time on real threats</p>
      </motion.div>
    </section>
  );
}

function AlertCard({ title, count, icon, alerts, color }: any) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      duration: 0.3,
      scale: 1.02,
      ease: "power2.out",
      paused: true,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`alert-card bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-2xl transition-shadow duration-300 glow`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          className="floating"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
        <motion.span 
          className="text-2xl font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3 }}
        >
          {count}
        </motion.span>
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {alerts.map((alert: any) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`text-sm p-2 rounded bg-slate-700/50 border border-slate-600`}
            >
              {alert.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}