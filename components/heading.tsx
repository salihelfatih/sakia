import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  size?: "large" | "medium";
};

export default function SectionHeading({
  children,
  size = "large",
}: SectionHeadingProps) {
  const sizeClasses = size === "large" ? "text-3xl" : "text-2xl";
  return (
    <h2 className={`${sizeClasses} font-medium capitalize mb-8 text-center`}>
      {children}
    </h2>
  );
}
