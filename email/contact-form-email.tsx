import React from "react";

type ContactFormEmailProps = {
  name: string;
  email: string;
  message: string;
};

export default function ContactFormEmail({
  name,
  email,
  message,
}: ContactFormEmailProps) {
  return (
    <div>
      <h1>Contact Form Submission</h1>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Message:</strong>
      </p>
      <p>{message}</p>
    </div>
  );
}
