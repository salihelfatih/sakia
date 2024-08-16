import React from "react";

type BecomeClientEmailProps = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  services: string[];
  message: string;
};

export default function BecomeClientEmail({
  name,
  email,
  phone,
  organization,
  services,
  message,
}: BecomeClientEmailProps) {
  return (
    <div>
      <h1>New Client Application</h1>
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
