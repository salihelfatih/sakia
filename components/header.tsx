"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import Image from "next/image";
import BecomeClientDialog from "@/components/become-a-client";
import Logo from "@/public/logo.png";
import Magnetic from "@/components/magnetic";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection("Home");
    setTimeOfLastClick(Date.now());
  };

  const handleLinkClick = (sectionName: string) => {
    setActiveSection(sectionName as typeof activeSection);
    setTimeOfLastClick(Date.now());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buttonClasses =
    "flex items-center justify-center px-4 py-2 rounded-full bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:bg-gray-950 dark:bg-opacity-75 text-gray-500 hover:text-gray-950 transition dark:hover:text-gray-300 h-10";

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] lg:top-6 lg:h-[3.25rem] lg:w-[40rem] lg:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <motion.div
        className="fixed top-[0.75rem] left-[1rem] lg:top-[1.7rem] lg:left-[1rem] flex items-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Magnetic>
          <button
            onClick={handleLogoClick}
            className={`${buttonClasses} font-semibold`}
          >
            <Image
              src={Logo}
              alt="Logo"
              style={{ width: 24, height: 24 }}
              className="mr-2"
            />
            <span className="text-gray-800 dark:text-gray-200">Sakia Labs</span>
          </button>
        </Magnetic>
      </motion.div>

      <nav className="hidden lg:flex fixed top-[0.75rem] left-1/2 h-12 -translate-x-1/2 py-2 lg:top-[1.7rem] lg:h-[initial] lg:py-0">
        <ul className="flex w-[20rem] items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {links.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
                  {
                    "text-gray-950 dark:text-gray-200":
                      activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(link.hash.slice(1));
                  if (element) {
                    const yOffset = -100;
                    const y =
                      element.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                  handleLinkClick(link.name);
                }}
              >
                {link.name}
                {link.name === activeSection && (
                  <motion.span
                    className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="fixed top-[0.75rem] right-[4.5rem] lg:top-[1.7rem] lg:right-[1rem] h-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Magnetic>
          <button
            onClick={() => setShowClientDialog(true)}
            className={buttonClasses}
          >
            Become a Client
          </button>
        </Magnetic>
      </motion.div>

      <motion.div
        className="fixed top-[0.75rem] right-[1rem] lg:hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:bg-gray-950 dark:bg-opacity-75 text-gray-500 hover:text-gray-950 transition dark:hover:text-gray-300"
        >
          {showMobileMenu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            ref={mobileMenuRef}
            className="fixed inset-0 bg-white dark:bg-gray-900 shadow-lg z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full justify-center items-center">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="absolute top-4 right-4 text-gray-800 dark:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {links.map((link) => (
                <Link
                  key={link.hash}
                  href={link.hash}
                  className="py-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-center"
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                    setShowMobileMenu(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setShowClientDialog(true);
                  setShowMobileMenu(false);
                }}
                className="py-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-center"
              >
                Become a Client
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClientDialog && (
          <BecomeClientDialog
            onClose={() => setShowClientDialog(false)}
            initialPackage={""}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
