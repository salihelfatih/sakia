"use client";
import React, { useState, useEffect } from "react";
import SectionHeading from "./heading";
import { servicesData } from "@/lib/data";
import Service from "./service";
import { useSectionInView } from "@/lib/hooks";

export default function Services() {
  const ref = useSectionInView("Services");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1250); // 1.25s delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      id="services"
      className={`scroll-mt-20 mb-4 sm:mb-6 transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <SectionHeading size="large">Our services</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {servicesData.map((service, index) => (
          <Service key={index} {...service} />
        ))}
      </div>
    </section>
  );
}
