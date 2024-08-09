"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, validateEmail, validatePhone, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const organization = formData.get("organization") as string;
  const services = formData.getAll("services") as string[];
  const message = formData.get("message") as string;

  // Validate all fields
  if (!validateString(name, 1, 100)) {
    return { error: "Name should be between 1 and 100 characters" };
  }
  if (!validateEmail(email)) {
    return { error: "Invalid email address" };
  }
  if (!validatePhone(phone)) {
    return { error: "Invalid phone number" };
  }
  if (!validateString(organization, 1, 100)) {
    return { error: "Organization name should be between 1 and 100 characters" };
  }
  if (services.length === 0) {
    return { error: "Please select at least one service" };
  }
  if (!validateString(message, 1, 5000)) {
    return { error: "Message should be between 1 and 5000 characters" };
  }

  try {
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "salihmesalih@gmail.com",
      subject: "New message from contact form",
      reply_to: email,
      react: React.createElement(ContactFormEmail, {
        name,
        email,
        phone,
        organization,
        services,
        message,
      }),
    });

    return { data };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};