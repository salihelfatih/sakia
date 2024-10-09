"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./heading";
import { reviewsData } from "@/lib/data";
import Review from "./review";
import { useSectionInView } from "@/lib/hooks";

export default function Reviews() {
  const ref = useSectionInView("Reviews");

  return (
    <motion.section
      ref={ref}
      id="reviews"
      className="scroll-mt-28 mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      whileInView={{ opacity: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
      >
        <SectionHeading size="large">Our reviews</SectionHeading>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-4 max-w-[52rem] mx-auto">
        {reviewsData.map((review, index) => (
          <Review key={index} {...review} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
