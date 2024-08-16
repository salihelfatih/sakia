"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  useScroll,
  useAnimationControls,
} from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { teamData, valuesData } from "@/lib/data";
import SectionHeading from "./heading";

type ValueProps = (typeof valuesData)[number];

function Value({
  title,
  description,
  icon,
  index,
}: ValueProps & { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="group"
    >
      <div className="bg-gray-100 h-full border border-black/5 rounded-lg overflow-hidden relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        <div className="p-4 flex flex-col h-full">
          <div className="mt-3 flex-grow flex items-center justify-center">
            <Image
              src={icon}
              alt={title}
              width={48}
              height={48}
              className="transition-transform duration-300 group-hover:scale-110 mb-2 dark:invert"
            />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

type TeamMemberProps = (typeof teamData)[number];

function TeamMember({ name, role, image }: TeamMemberProps) {
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
    useTransform(scrollYProgress, [0, 1], [-10, 0]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.8, 1]),
    springConfig
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate, scale }}
      className="group bg-gray-100 h-full border border-black/5 rounded-lg overflow-hidden relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 p-6 flex flex-col items-center"
    >
      <div className="w-40 h-40 relative mb-4 overflow-hidden rounded-full">
        <Image
          src={image}
          alt={name}
          fill={true}
          sizes="(min-width: 640px) 300px, 100vw"
          style={{ objectPosition: "center", objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-2xl font-semibold">{name}</h3>
      <p className="text-lg text-gray-700 dark:text-white/70">{role}</p>
    </motion.div>
  );
}

const AnimatedText = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const slogan = "Inspired by Tradition, Driven by Innovation";

  return (
    <motion.div
      ref={ref}
      className="text-gray-700 dark:text-white/80 -mt-6 mb-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <br />
      <motion.h4
        className="text-xl italic mb-4 relative"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.1 },
          },
        }}
      >
        {slogan.split(" ").map((word, wordIndex) => (
          <motion.span key={wordIndex} className="inline-block mr-[0.25em]">
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                    },
                  },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.h4>

      <motion.div
        className="mb-6 text-lg font-serif"
        style={{ fontSize: "0.95rem" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <strong>Sakia (SA-kee-yah)</strong> | <em>Arabic: </em>
        <strong>ساقية </strong> | <em>Waterwheel (n)</em>
        <br />
        <em>
          An ancient machine used for centuries to channel water for irrigation.
        </em>
      </motion.div>

      <motion.p
        className="text-base leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        At Sakia, the timeless waterwheel embodies the continuous flow of
        sustenance and life. Inspired by this symbol, we channel creativity and
        technology to craft digital solutions that uplift and empower. Our
        mission is to harness technology to <strong>cultivate growth</strong>,{" "}
        <strong>foster meaningful connections</strong>, and{" "}
        <strong>create a lasting positive impact</strong>. Every project we
        undertake is a step towards{" "}
        <strong>creating value and driving empowerment</strong> for communities
        and businesses alike.
      </motion.p>
    </motion.div>
  );
};

export default function About() {
  const ref = useSectionInView("About Us");

  const getGridColumns = () => {
    const teamSize = teamData.length;
    if (teamSize === 2) return "sm:grid-cols-2";
    if (teamSize === 3) return "sm:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  };

  return (
    <motion.section
      ref={ref}
      id="about"
      className="mb-8 scroll-mt-28 text-center custom-scroll"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
    >
      <div className="max-w-[60rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading size="large">About Us</SectionHeading>
        <AnimatedText />
        <SectionHeading size="medium">Our Core Values</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-16">
          {valuesData.map((value, index) => (
            <Value key={index} {...value} index={index} />
          ))}
        </div>

        <SectionHeading size="medium">Our Team</SectionHeading>
        <div className={`grid ${getGridColumns()} gap-8 mt-8 justify-center`}>
          {teamData.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
