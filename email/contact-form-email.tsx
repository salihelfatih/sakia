import React from "react";

type ContactFormEmailProps = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  services: string[];
  message: string;
};

export default function ContactFormEmail({
  name,
  email,
  phone,
  organization,
  services,
  message,
}: ContactFormEmailProps) {
  return (
    <div>
      <h1>Sakia Form Submission</h1>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Organization:</strong> {organization}
      </p>
      <p>
        <strong>Services:</strong> {services.join(", ")}
      </p>
      <p>
        <strong>Message:</strong>
      </p>
      <p>{message}</p>
    </div>
  );
}
