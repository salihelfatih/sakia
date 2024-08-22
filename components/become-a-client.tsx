import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import { sendEmail } from "@/actions/sendEmail";

interface BecomeClientDialogProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  services: string[];
  message: string;
}

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

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  services: [],
  message: "",
};

const bounceVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.1, type: "spring", damping: 10, stiffness: 100 },
  }),
};

const BecomeClientDialog: React.FC<BecomeClientDialogProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState({ message: "", type: "" });
  const [clickCount, setClickCount] = useState(0);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer) clearTimeout(toastTimer);
    };
  }, [toastTimer]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please correct the errors in the form", "error");
      return;
    }
    const formDataToSend = new FormData(e.currentTarget);
    formDataToSend.append("formType", "becomeClient");
    const result = await sendEmail(formDataToSend);
    if (result.error) {
      showToast(result.error, "error");
    } else {
      showToast("We'll be in touch soon!", "success");
      setFormData(initialFormData);
      setTimeout(onClose, 2000);
    }
  };

  const inputClasses = `w-full h-10 px-3 rounded-md borderBlack 
    bg-white dark:bg-gray-800 text-black dark:text-white 
    transition-all duration-300 outline-none 
    focus:ring-2 focus:ring-blue-500 text-sm`;

  const shakeAnimation: TargetAndTransition = {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4, repeat: 2, repeatType: "reverse" as const },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 rounded-lg w-full max-w-[40rem] text-center relative max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <motion.h2
          variants={bounceVariant}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-xl font-bold mb-3 text-gray-800 dark:text-white"
        >
          Let's Innovate Together!
        </motion.h2>
        <motion.p
          variants={bounceVariant}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-gray-700 mb-4 dark:text-white/80 text-sm"
        >
          Please fill out the form below to apply for our services.
        </motion.p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <motion.div
            variants={bounceVariant}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  className={inputClasses}
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
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
                  onChange={handleChange}
                />
                {errors.organization && (
                  <p className="text-red-500 text-xs mt-1">
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
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={bounceVariant}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div className="mb-3">
              <h3 className="text-base font-semibold mb-2">Services</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {services.map((service) => (
                  <label
                    key={service}
                    className={`flex items-center gap-2 p-2 rounded-md border transition-colors text-xs ${
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
                      className={`w-4 h-4 ${
                        formData.services.includes(service)
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span className="text-xs">{service}</span>
                  </label>
                ))}
              </div>
            </div>
            {errors.services && (
              <p className="text-red-500 text-xs mt-1">{errors.services}</p>
            )}
          </motion.div>

          <motion.div
            variants={bounceVariant}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <textarea
              className={`${inputClasses} h-32`}
              name="message"
              placeholder="Your message"
              required
              maxLength={5000}
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-red-500 text-xs">{errors.message}</p>
            )}
          </motion.div>

          <motion.div
            variants={bounceVariant}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex justify-center"
          >
            <button
              type="submit"
              className="custom-button group flex items-center justify-center gap-2 h-10 w-28 rounded-full outline-none transition-all focus:scale-110 hover:scale-110 active:scale-105 disabled:scale-100 disabled:opacity-65 text-sm"
            >
              Submit
            </button>
          </motion.div>
        </form>
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
    </motion.div>
  );
};

export default BecomeClientDialog;
