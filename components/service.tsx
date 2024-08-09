import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { servicesData } from "@/lib/data";

type ServiceProps = (typeof servicesData)[number];

export default function Service({
  title,
  description,
  tags,
  imageUrl,
  link,
}: ServiceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const springConfig = { stiffness: 300, damping: 30, mass: 1 };
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, 0]),
    springConfig
  );
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [10, 0]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.8, 1]),
    springConfig
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotate,
        scale,
      }}
      className="group max-w-[300px] w-full"
    >
      <section className="bg-gray-100 h-full border border-black/5 rounded-lg overflow-hidden relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        <div className="p-4 flex flex-col h-full">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <ul className="flex flex-wrap mt-2 gap-1">
            {tags.map((tag, index: number) => (
              <li
                className="bg-black/[0.7] px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex-grow">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-24 relative overflow-hidden rounded-lg"
            >
              <Image
                src={imageUrl}
                alt="Service we offer"
                fill={true}
                sizes="(min-width: 640px) 300px, 100vw"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
