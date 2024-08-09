"use client";

import React, { useRef, useState, useEffect } from "react";
import SectionHeading from "./heading";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  TargetAndTransition,
} from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import { CheckCircle } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  services: string[];
  message: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

const services = [
  "Frontend Development",
  "API Development",
  "Database Design",
  "Machine Learning",
  "Mobile Development",
  "E-commerce Development",
  "SEO & Marketing",
  "Graphic Design",
  "Animation & Video",
];

export default function Contact() {
  const ref = useSectionInView("Contact Us");
  const componentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    services: [],
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
  const sentence =
    "Please contact us directly at info@info@sakia.io or through this form.";

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

  const handleCheckboxChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Invalid phone number";
    if (!formData.organization.trim())
      newErrors.organization = "Organization name is required";
    if (formData.services.length === 0)
      newErrors.services = "Please select at least one service";
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

    showToast("Email sent successfully!", "success");
    setFormData({
      name: "",
      email: "",
      phone: "",
      organization: "",
      services: [],
      message: "",
    });
  };

  const inputClasses = `w-full h-14 px-4 rounded-lg borderBlack 
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
        <br />
        <motion.a
          className="underline"
          href="mailto:info@sakialabs.io"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: sentence.length * 0.03 }}
        >
          info@sakialabs.io
        </motion.a>
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
          <h2 className="text-2xl font-bold mb-4 text-accent">
            Let's innovate together!
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  className={inputClasses}
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
              </div>
              <div>
                <input
                  className={inputClasses}
                  name="organization"
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Your organization name"
                  value={formData.organization}
                  onChange={handleInputChange}
                />
                {errors.organization && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.organization}
                  </p>
                )}
              </div>
              <div>
                <input
                  className={inputClasses}
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
              </div>
              <div>
                <input
                  className={inputClasses}
                  name="phone"
                  type="tel"
                  required
                  maxLength={15}
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Services</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {services.map((service) => (
                  <label
                    key={service}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                      formData.services.includes(service)
                        ? "bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700"
                        : "bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      className="hidden"
                      checked={formData.services.includes(service)}
                      onChange={() => handleCheckboxChange(service)}
                    />
                    <CheckCircle
                      className={`w-5 h-5 ${
                        formData.services.includes(service)
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>
            {errors.services && (
              <p className="text-red-500 text-sm mt-1">{errors.services}</p>
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
              Submit
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
            className={`fixed bottom-4 left-4 p-4 rounded-lg text-white ${
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
