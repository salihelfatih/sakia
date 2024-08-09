"use client";

import { useRef } from "react";
import { reviewsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type ReviewProps = (typeof reviewsData)[number] & {
  index: number;
};

export default function Review({
  name,
  comment,
  rating,
  date,
  avatarUrl,
  index,
}: ReviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const xProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -100 : 100, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
        x: xProgress,
      }}
      className="group mb-3 sm:mb-8 last:mb-0 w-full sm:w-[calc(50%-1rem)] max-w-[24rem]"
    >
      <section className="bg-gray-100 border border-black/5 rounded-lg overflow-hidden relative h-[24rem] hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 flex flex-col">
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <Image
                src={avatarUrl}
                alt={`Avatar of ${name}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{name}</h3>
          </div>
          <p className="flex-grow leading-relaxed text-gray-700 dark:text-white/70 overflow-y-auto">
            {comment}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2">
            <li className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70">
              Rating: {rating}
            </li>
            <li className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70">
              {date}
            </li>
          </ul>
        </div>
      </section>
    </motion.div>
  );
}
