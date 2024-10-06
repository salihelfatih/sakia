import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, StarHalf } from "lucide-react";

type ReviewProps = {
  name: string;
  organization: string;
  comment: string;
  rating: number;
  date: string;
  avatarUrl: string | StaticImageData;
  index: number;
};

export default function Review({
  name,
  organization,
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
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const xProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -100 : 100, 0]
  );

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
          />
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }

    return stars;
  };

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
        x: xProgress,
      }}
      className="group mb-3 sm:mb-8 last:mb-0 w-full sm:w-[calc(50%-1rem)] max-w-[24rem]"
    >
      <section className="bg-gray-100 border border-black/5 rounded-lg overflow-hidden relative h-[280px] hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 flex flex-col shadow-sm">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
              <Image
                src={avatarUrl}
                alt={`Avatar of ${name}`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <h4 className="text-sm text-gray-600 dark:text-gray-400">
                {organization}
              </h4>
              <div className="flex items-center">
                <div className="flex">{renderStars(rating)}</div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {date}
                </span>
              </div>
            </div>
          </div>
          <p className="flex-grow leading-relaxed text-gray-700 dark:text-white/70 mb-4 overflow-y-auto">
            "{comment}"
          </p>
        </div>
      </section>
    </motion.div>
  );
}
