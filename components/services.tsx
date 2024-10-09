"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./heading";
import { expertiseAreas } from "@/lib/data";
import Service from "./service";

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1250); // 1.25s delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      className={`scroll-mt-20 mb-4 sm:mb-6 transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      whileInView={{ opacity: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
      >
        <SectionHeading size="medium">Our expertise</SectionHeading>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expertiseAreas.map((area, index) => (
          <Service key={index} {...area} />
        ))}
      </div>
    </motion.section>
  );
}
