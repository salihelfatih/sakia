"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useInView,
  useAnimationControls,
  AnimatePresence,
} from "framer-motion";
import SectionHeading from "./heading";
import { packageData } from "@/lib/data";
import Package from "./package";
import { useSectionInView } from "@/lib/hooks";
import Magnetic from "@/components/magnetic";
import BecomeClientDialog from "./become-a-client";
import ComparisonDialog from "./comparison-dialog";

const AnimatedParagraph = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  React.useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 10 });
    }
  }, [isInView, controls]);

  return (
    <motion.p
      ref={ref}
      className="text-base leading-relaxed max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.p>
  );
};

export default function Packages() {
  const sectionRef = useSectionInView("Packages", 0.5);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isComparisonDialogOpen, setIsComparisonDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const buttonRef = useRef(null);
  const buttonInView = useInView(buttonRef, { once: true });

  const handleChoosePackage = (packageTitle: string) => {
    setSelectedPackage(packageTitle);
    setIsDialogOpen(true);
  };

  const handleContactUs = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const buttonClasses =
    "w-48 h-12 bg-gray-100 border border-black/5 rounded-full overflow-hidden relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 shadow-sm px-4 py-2 font-semibold text-base whitespace-nowrap";

  return (
    <motion.section
      ref={sectionRef}
      id="packages"
      className="scroll-mt-20 mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <SectionHeading size="large">Our Packages</SectionHeading>

      <motion.div className="mb-8 text-center">
        <AnimatedParagraph>
          Discover our meticulously crafted packages, each designed to elevate
          your organization to new heights. Whether you're a startup or an
          established enterprise, we have the perfect solution to meet your
          unique needs and drive your success.
        </AnimatedParagraph>
      </motion.div>

      <motion.div
        className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-6 px-4 sm:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {packageData.map((pack, index) => (
          <div
            key={index}
            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[350px]"
          >
            <Package {...pack} onChoosePackage={handleChoosePackage} />
          </div>
        ))}
      </motion.div>

      <motion.div className="mt-12 text-center">
        <AnimatedParagraph>
          Compare our packages to find your perfect fit, or let us customize a
          solution just for you. Unlock your organization's digital potential
          today!
        </AnimatedParagraph>
      </motion.div>

      <motion.div
        ref={buttonRef}
        className="w-full mt-8 flex justify-center items-center flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Magnetic>
          <button
            onClick={() => setIsComparisonDialogOpen(true)}
            className={buttonClasses}
          >
            Compare Packages
          </button>
        </Magnetic>
        <Magnetic>
          <button onClick={handleContactUs} className={buttonClasses}>
            Contact Us
          </button>
        </Magnetic>
      </motion.div>

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-[1000]"
          >
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsDialogOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg relative z-[1001] max-w-md w-full m-4"
            >
              <BecomeClientDialog
                onClose={() => setIsDialogOpen(false)}
                initialPackage={selectedPackage}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ComparisonDialog
        isOpen={isComparisonDialogOpen}
        onClose={() => setIsComparisonDialogOpen(false)}
      />
    </motion.section>
  );
}
