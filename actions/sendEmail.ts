"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, validateEmail, validatePhone, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";
import BecomeClientEmail from "@/email/become-client-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const formType = formData.get("formType") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Common validations
  if (!validateString(name, 1, 100)) {
    return { error: "Name should be between 1 and 100 characters" };
  }
  if (!validateEmail(email)) {
    return { error: "Invalid email address" };
  }
  if (!validateString(message, 1, 5000)) {
    return { error: "Message should be between 1 and 5000 characters" };
  }

  let emailComponent;
  let subject;

  if (formType === "becomeClient") {
    const phone = formData.get("phone") as string;
    const organization = formData.get("organization") as string;
    const services = formData.getAll("services") as string[];

    // Additional validations for "Become a Client" form
    if (!validatePhone(phone)) {
      return { error: "Invalid phone number" };
    }
    if (!validateString(organization, 1, 100)) {
      return { error: "Organization name should be between 1 and 100 characters" };
    }
    if (services.length === 0) {
      return { error: "Please select at least one service" };
    }

    emailComponent = React.createElement(BecomeClientEmail, {
      name,
      email,
      phone,
      organization,
      services,
      message,
    });
    subject = "New client application";
  } else {
    emailComponent = React.createElement(ContactFormEmail, {
      name,
      email,
      message,
    });
    subject = "New message from contact form";
  }

  try {
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "hello@sakialabs.io",
      subject: subject,
      reply_to: email,
      react: emailComponent,
    });

    return { data };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};