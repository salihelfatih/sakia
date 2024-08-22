"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  TargetAndTransition,
} from "framer-motion";
import SectionHeading from "./heading";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

export default function Contact() {
  const ref = useSectionInView("Contact Us");
  const componentRef = useRef<HTMLDivElement>(null);

  const sentence =
    "We'd love to hear from you. Please fill out the form below.";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState({ message: "", type: "" });
  const [clickCount, setClickCount] = useState(0);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  useEffect(() => {
    return () => {
      if (toastTimer) clearTimeout(toastTimer);
    };
  }, [toastTimer]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message: string, type: string) => {
    setToast({ message, type });
    setClickCount((prev) => prev + 1);
    if (toastTimer) clearTimeout(toastTimer);
    const newTimer = setTimeout(() => {
      setToast({ message: "", type: "" });
      setClickCount(0);
    }, 5000);
    setToastTimer(newTimer);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please correct the errors in the form", "error");
      return;
    }

    const formDataToSend = new FormData(e.currentTarget);
    const { data, error } = await sendEmail(formDataToSend);

    if (error) {
      showToast(error, "error");
      return;
    }

    showToast("We'll be in touch soon!", "success");
    setFormData({ name: "", email: "", message: "" });
  };

  const inputClasses = `w-full px-4 rounded-lg borderBlack 
    bg-white dark:bg-gray-800 
    text-black dark:text-white 
    transition-all duration-300
    outline-none 
    focus:ring-2 focus:ring-blue-500`;

  const shakeAnimation: TargetAndTransition = {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4, repeat: 2, repeatType: "reverse" as const },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-full text-center overflow-hidden"
    >
      <SectionHeading>Contact us</SectionHeading>

      <motion.p
        className="text-gray-700 mb-4 dark:text-white/80"
        initial="hidden"
        animate="visible"
      >
        {sentence.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.03, delay: index * 0.03 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
      <motion.div
        ref={componentRef}
        className="max-w-[45rem] mx-auto"
        style={{
          opacity,
          rotateX,
          scale,
          transformPerspective: "1000px",
        }}
      >
        <div className="bg-gray-100 border border-black/5 rounded-lg overflow-hidden relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className={`${inputClasses} h-14`}
              name="name"
              type="text"
              required
              maxLength={100}
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}

            <input
              className={`${inputClasses} h-14`}
              name="email"
              type="email"
              required
              maxLength={500}
              placeholder="Your email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

            <textarea
              className={`${inputClasses} h-52`}
              name="message"
              placeholder="Your message"
              required
              maxLength={5000}
              value={formData.message}
              onChange={handleInputChange}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}

            <button
              type="submit"
              className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 disabled:scale-100 disabled:bg-opacity-65 self-center"
            >
              Send
            </button>
          </form>
        </div>
      </motion.div>
      <AnimatePresence>
        {toast.message && (
          <motion.div
            key={clickCount}
            initial={{ opacity: 0, y: 50, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-4 left-4 p-3 rounded-lg text-white text-sm ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ zIndex: 1000 }}
          >
            <motion.div
              animate={clickCount > 1 ? shakeAnimation : {}}
              onAnimationComplete={() => {
                if (clickCount > 1) {
                  setToast({ message: "", type: "" });
                  setClickCount(0);
                }
              }}
            >
              {toast.message}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
