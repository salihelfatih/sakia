"use server";

import sgMail from "@sendgrid/mail";
import { validateString, validateEmail, validatePhone, getErrorMessage } from "@/lib/utils";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

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

  let htmlContent: string;
  let subject: string;

  if (formType === "becomeClient") {
    const phone = formData.get("phone") as string;
    const organization = formData.get("organization") as string;
    const selectedPackage = formData.get("package") as string;

    // Additional validations for "Become a Client" form
    if (!validatePhone(phone)) {
      return { error: "Invalid phone number" };
    }
    if (!validateString(organization, 1, 100)) {
      return { error: "Organization name should be between 1 and 100 characters" };
    }
    if (!validateString(selectedPackage, 1, 100)) {
      return { error: "Please select a package" };
    }

    htmlContent = `
      <h1>New Client Application</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Organization:</strong> ${organization}</p>
      <p><strong>Selected Package:</strong> ${selectedPackage}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;
    subject = "New Client Application";
  } else {
    htmlContent = `
      <h1>Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;
    subject = "New Message from Contact Form";
  }

  const verifiedEmail = process.env.SENDGRID_VERIFIED_SENDER;
  const recipientEmail = process.env.RECIPIENT_EMAIL || verifiedEmail;

  if (!verifiedEmail) {
    console.error("SENDGRID_VERIFIED_SENDER is not set in environment variables");
    return { error: "Email configuration error" };
  }

  if (!recipientEmail) {
    console.error("Recipient email is not set");
    return { error: "Email configuration error" };
  }

  const msg = {
    to: recipientEmail,
    from: verifiedEmail,
    subject: subject,
    html: htmlContent,
    replyTo: email,
  };

  try {
    await sgMail.send(msg);
    return { data: "Email sent successfully" };
  } catch (error: unknown) {
    console.error("SendGrid error:", error);
    return {
      error: getErrorMessage(error),
    };
  }
};