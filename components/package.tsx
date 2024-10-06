import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { packageData } from "@/lib/data";

type PackageProps = (typeof packageData)[number] & {
  onChoosePackage: (title: string) => void;
};

export default function Package({
  title,
  description,
  price,
  features,
  onChoosePackage,
}: PackageProps) {
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
      <section className="bg-gray-100 h-full border border-black/5 rounded-lg overflow-hidden relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 shadow-sm">
        <div className="p-4 flex flex-col h-full">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <p className="mt-4 text-2xl font-bold">{price}</p>
          <ul className="mt-4 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onChoosePackage(title)}
            className="mt-6 w-full py-2 px-4 rounded-lg font-semibold transition duration-300 ease-in-out
             text-gray-200 bg-gray-900 hover:bg-gray-800 text-center shadow-sm
            "
          >
            Choose {title}
          </button>
        </div>
      </section>
    </motion.div>
  );
}
