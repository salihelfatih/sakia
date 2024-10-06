import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { expertiseAreas } from "@/lib/data";
import { CheckCircle, Code, ChevronDown, ChevronUp } from "lucide-react";

type ServiceProps = (typeof expertiseAreas)[number];

export default function Service({
  title,
  description,
  services,
  technologies,
}: ServiceProps) {
  const [isServicesExpanded, setIsServicesExpanded] = React.useState(false);
  const [isTechnologiesExpanded, setIsTechnologiesExpanded] =
    React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const toggleServicesExpand = () => setIsServicesExpanded(!isServicesExpanded);
  const toggleTechnologiesExpand = () =>
    setIsTechnologiesExpanded(!isTechnologiesExpanded);

  const renderServices = (
    items: string[],
    isExpanded: boolean,
    toggleExpand: () => void
  ) => (
    <ul className="mt-2 space-y-1">
      {(isExpanded ? items : items.slice(0, 3)).map((item, index) => (
        <li
          key={index}
          className="flex items-center text-sm text-gray-700 dark:text-white/70"
        >
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2"></div>
          {item}
        </li>
      ))}
      {!isExpanded && items.length > 3 && (
        <li
          className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer flex items-center"
          onClick={toggleExpand}
        >
          +{items.length - 2} more
          <ChevronDown className="w-4 h-4 ml-1" />
        </li>
      )}
    </ul>
  );

  const renderTechnologies = (
    items: string[],
    isExpanded: boolean,
    toggleExpand: () => void
  ) => (
    <ul className="flex flex-wrap mt-2 gap-1">
      {(isExpanded ? items : items.slice(0, 3)).map((item, index) => (
        <li
          className="bg-black/[0.7] px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
          key={index}
        >
          {item}
        </li>
      ))}
      {!isExpanded && items.length > 3 && (
        <li
          className="bg-black/[0.7] px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-white rounded-full dark:text-white/70 cursor-pointer flex items-center"
          onClick={toggleExpand}
        >
          +{items.length - 3} more
          <ChevronDown className="w-3 h-3 ml-1" />
        </li>
      )}
    </ul>
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="group max-w-[300px] w-full"
    >
      <section className="bg-gray-100 h-full border border-black/5 rounded-lg overflow-hidden relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 shadow-sm">
        <div className="p-4 flex flex-col h-full">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <h4 className="mt-4 mb-2 text-sm font-semibold flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Services
          </h4>
          {renderServices(services, isServicesExpanded, toggleServicesExpand)}
          {isServicesExpanded && (
            <button
              className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex items-center"
              onClick={toggleServicesExpand}
            >
              Show less
              <ChevronUp className="w-4 h-4 ml-1" />
            </button>
          )}
          <h4 className="mt-4 mb-2 text-sm font-semibold flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Technologies
          </h4>
          {renderTechnologies(
            technologies,
            isTechnologiesExpanded,
            toggleTechnologiesExpand
          )}
          {isTechnologiesExpanded && (
            <button
              className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex items-center"
              onClick={toggleTechnologiesExpand}
            >
              Show less
              <ChevronUp className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </section>
    </motion.div>
  );
}
