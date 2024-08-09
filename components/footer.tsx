"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsLinkedin, BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import Magnetic from "@/components/magnetic";
import PrivacyPolicy from "./privacy-policy";
import TermsAndConditions from "./terms-and-conditions";

interface SocialIconProps {
  Icon: React.ElementType;
  href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ Icon, href }) => (
  <Magnetic>
    <motion.a
      className="bg-white bg-opacity-80 p-2 sm:p-3 text-gray-500 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:bg-gray-950 dark:bg-opacity-75 dark:text-gray-500 dark:hover:text-gray-300"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={18} className="sm:w-5 sm:h-5" />
    </motion.a>
  </Magnetic>
);

export default function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);

  const handleClosePrivacyPolicy = useCallback(() => {
    setShowPrivacyPolicy(false);
  }, []);

  const handleCloseTermsAndConditions = useCallback(() => {
    setShowTermsAndConditions(false);
  }, []);

  return (
    <>
      <footer className="bg-white bg-opacity-80 dark:bg-gray-950 dark:bg-opacity-75 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] border-t border-white border-opacity-40 dark:border-black/40">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-wrap justify-between items-center">
            <motion.div
              className="w-full md:w-1/3 mb-4 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Sakia Labs. All Rights Reserved.
              </p>
            </motion.div>
            <motion.div
              className="w-full md:w-1/3 mb-4 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-center space-x-4">
                <SocialIcon
                  Icon={BsFacebook}
                  href="https://facebook.com/sakialabs"
                />
                <SocialIcon
                  Icon={BsTwitter}
                  href="https://twitter.com/sakialabs"
                />
                <SocialIcon
                  Icon={BsInstagram}
                  href="https://instagram.com/sakialabs"
                />
                <SocialIcon
                  Icon={BsLinkedin}
                  href="https://linkedin.com/sakialabs"
                />
                <SocialIcon
                  Icon={FaGithubSquare}
                  href="https://github.com/sakialabs"
                />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-right">
                Phone: +1 (123) 456-7890
                <br />
                Email: info@sakia.io
              </p>
            </motion.div>
          </div>
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              // style={{ textDecoration: "underline" }}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-950  dark:hover:text-gray-200 mr-4"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setShowTermsAndConditions(true)}
              // style={{ textDecoration: "underline" }}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-200"
            >
              Terms and Conditions
            </button>
          </motion.div>
        </div>
      </footer>
      <AnimatePresence>
        {showPrivacyPolicy && (
          <PrivacyPolicy onClose={handleClosePrivacyPolicy} />
        )}
        {showTermsAndConditions && (
          <TermsAndConditions onClose={handleCloseTermsAndConditions} />
        )}
      </AnimatePresence>
    </>
  );
}
