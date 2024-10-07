"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  BsLinkedin,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsTiktok,
} from "react-icons/bs";
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
      className="bg-white bg-opacity-80 p-2 text-gray-500 hover:text-gray-950 flex items-center justify-center rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:bg-gray-950 dark:bg-opacity-75 dark:text-gray-500 dark:hover:text-gray-300"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={18} />
    </motion.a>
  </Magnetic>
);

export default function Footer() {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsAndConditionsOpen, setIsTermsAndConditionsOpen] =
    useState(false);

  const handleOpenPrivacyPolicy = useCallback(() => {
    setIsPrivacyPolicyOpen(true);
  }, []);

  const handleClosePrivacyPolicy = useCallback(() => {
    setIsPrivacyPolicyOpen(false);
  }, []);

  const handleOpenTermsAndConditions = useCallback(() => {
    setIsTermsAndConditionsOpen(true);
  }, []);

  const handleCloseTermsAndConditions = useCallback(() => {
    setIsTermsAndConditionsOpen(false);
  }, []);

  return (
    <>
      <footer className="bg-white bg-opacity-80 dark:bg-gray-950 dark:bg-opacity-75 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] border-t border-white border-opacity-40 dark:border-black/40 mt-auto">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col space-y-6 md:flex-row md:justify-between md:items-center md:space-y-0">
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Sakia Labs. All Rights Reserved.
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
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
                Icon={BsTiktok}
                href="https://tiktok.com/@sakia.labs"
              />
              <SocialIcon
                Icon={BsLinkedin}
                href="https://www.linkedin.com/company/sakialabs"
              />
              <SocialIcon
                Icon={FaGithubSquare}
                href="https://github.com/sakialabs"
              />
            </motion.div>

            <motion.div
              className="text-center md:text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Phone: +1 (437) 219-9433
                <br />
                Email: hello@sakialabs.io
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
              onClick={handleOpenPrivacyPolicy}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-200 mr-4"
            >
              Privacy Policy
            </button>
            <button
              onClick={handleOpenTermsAndConditions}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-200"
            >
              Terms and Conditions
            </button>
          </motion.div>
        </div>
      </footer>
      <PrivacyPolicy
        isOpen={isPrivacyPolicyOpen}
        onClose={handleClosePrivacyPolicy}
      />
      <TermsAndConditions
        isOpen={isTermsAndConditionsOpen}
        onClose={handleCloseTermsAndConditions}
      />
    </>
  );
}
