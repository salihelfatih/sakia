"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useAnimationControls,
  AnimatePresence,
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
      className="text-gray-700 mb-8 dark:text-white/80 max-w-[45rem] mx-auto text-center px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg leading-relaxed"
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.p>
  );
};

export default function Contact() {
  const ref = useSectionInView("Contact Us", 0.5);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState({ message: "", type: "" });
  const [clickCount, setClickCount] = useState(0);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

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

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="mb-20 sm:mb-28 w-full scroll-mt-28 flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
    >
      <SectionHeading>Contact us</SectionHeading>

      <AnimatedParagraph>
        We'd love to hear from you! Please fill out the form below.
      </AnimatedParagraph>

      <motion.div
        className="w-full max-w-[45rem] px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <div className="bg-gray-100 border border-black/5 rounded-lg overflow-hidden relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 p-6 shadow-sm">
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
              className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-white bg-opacity-80 border border-black/5 hover:bg-white hover:bg-opacity-100 dark:bg-gray-950 dark:bg-opacity-75 dark:hover:bg-opacity-100 shadow-sm font-semibold text-xs sm:text-sm whitespace-nowrap rounded-full outline-none focus:scale-110 active:scale-105 transition text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-100 disabled:scale-100 disabled:bg-opacity-65 mx-auto"
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
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
