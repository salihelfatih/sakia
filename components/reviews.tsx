"use client";

import React from "react";
import SectionHeading from "./heading";
import { reviewsData } from "@/lib/data";
import Review from "./review";
import { useSectionInView } from "@/lib/hooks";

export default function Reviews() {
  const ref = useSectionInView("Reviews");

  return (
    <section ref={ref} id="reviews" className="scroll-mt-28 mb-8">
      <SectionHeading size="large">Our reviews</SectionHeading>
      <div className="flex flex-wrap justify-center gap-4 max-w-[52rem] mx-auto">
        {reviewsData.map((review, index) => (
          <Review key={index} {...review} index={index} />
        ))}
      </div>
    </section>
  );
}
