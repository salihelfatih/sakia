"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { BsLinkedin, BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import BecomeClientDialog from "@/components/become-a-client";
import Magnetic from "@/components/magnetic";
import logo from "@/public/logo.webp";

const texts = [
  "We Empower People with Modern Technologies",
  "We Design Elegant Solutions with Purpose",
  "We Innovate for a Brighter Future",
];

enum AnimationState {
  Waiting,
  Typing,
  Pausing,
  Erasing,
}

const TypedText: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [animationState, setAnimationState] = useState(AnimationState.Waiting);

  useEffect(() => {
    if (animationState === AnimationState.Waiting) {
      const timer = setTimeout(() => {
        setAnimationState(AnimationState.Typing);
      }, 1000); // Delay start by 1 second
      return () => clearTimeout(timer);
    }

    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    switch (animationState) {
      case AnimationState.Typing:
        if (displayedText.length < currentText.length) {
          timeout = setTimeout(() => {
            setDisplayedText(currentText.slice(0, displayedText.length + 1));
          }, 60);
        } else {
          setAnimationState(AnimationState.Pausing);
        }
        break;

      case AnimationState.Pausing:
        timeout = setTimeout(() => {
          setAnimationState(AnimationState.Erasing);
        }, 1000);
        break;

      case AnimationState.Erasing:
        if (displayedText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayedText(displayedText.slice(0, -1));
          }, 30);
        } else {
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setAnimationState(AnimationState.Typing);
        }
        break;
    }

    return () => clearTimeout(timeout);
  }, [textIndex, displayedText, animationState]);

  return (
    <motion.div
      className="w-full max-w-[600px] h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-center whitespace-nowrap">
        {displayedText}
        {animationState !== AnimationState.Pausing &&
          animationState !== AnimationState.Waiting && (
            <span className="animate-blink inline-block ml-[-0.1em] w-[0.1em]">
              |
            </span>
          )}
      </p>
    </motion.div>
  );
};

export default function Intro() {
  const ref = useSectionInView("Home");
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [showClientDialog, setShowClientDialog] = useState(false);

  const logoRef = useRef(null);
  const typedTextRef = useRef(null);
  const buttonRef = useRef(null);
  const socialRef = useRef(null);

  const logoInView = useInView(logoRef, { once: false, amount: 0.5 });
  const typedTextInView = useInView(typedTextRef, { once: false, amount: 0.5 });
  const buttonInView = useInView(buttonRef, { once: false, amount: 0.5 });
  const socialInView = useInView(socialRef, { once: false, amount: 0.5 });

  return (
    <>
      <section
        ref={ref}
        id="home"
        className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem] px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center">
          <motion.div
            ref={logoRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              logoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src={logo}
              alt="Sakia Labs Logo"
              width={150}
              height={150}
              quality={95}
              priority={true}
              className="sm:w-[192px] sm:h-[192px]"
            />
          </motion.div>

          <motion.div
            ref={typedTextRef}
            className="w-full h-20 relative mt-4 sm:mt-6"
            initial={{ opacity: 0 }}
            animate={typedTextInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <TypedText />
            </div>
          </motion.div>

          <motion.div
            ref={buttonRef}
            className="w-full mt-4 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={
              buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ delay: 0.2 }}
          >
            <Magnetic>
              <button
                onClick={() => setShowClientDialog(true)}
                className="bg-gray-900 text-white px-6 py-3 sm:px-7 sm:py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition mb-3 text-base sm:text-lg"
              >
                Become a Client
              </button>
            </Magnetic>

            <motion.div
              ref={socialRef}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4"
              initial={{ opacity: 0, y: 50 }}
              animate={
                socialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ delay: 0.3 }}
            >
              {[
                { icon: BsFacebook, href: "https://facebook.com/sakialabs" },
                { icon: BsTwitter, href: "https://twitter.com/sakialabs" },
                { icon: BsInstagram, href: "https://instagram.com/sakialabs" },
                { icon: BsLinkedin, href: "https://linkedin.com/sakialabs" },
                { icon: FaGithubSquare, href: "https://github.com/sakialabs" },
              ].map((item, index) => (
                <Magnetic key={index}>
                  <a
                    className="bg-white p-2 sm:p-3 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <item.icon size={18} className="sm:w-5 sm:h-5" />
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showClientDialog && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setShowClientDialog(false)}
            ></div>
            <div className="bg-white p-6 sm:p-8 rounded-lg relative z-[1001] max-w-md w-full m-4">
              <BecomeClientDialog onClose={() => setShowClientDialog(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
