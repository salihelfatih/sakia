import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import client1 from "@/public/avatars/client1.jpg";
import client2 from "@/public/avatars/client2.jpg";
import member1 from "@/public/avatars/member1.jpg";
import member2 from "@/public/avatars/member2.jpg";
import project1 from "@/public/projects/project1.png";
import project2 from "@/public/projects/project2.png";
import value1 from "@/public/values/value1.png";
import value2 from "@/public/values/value2.png";
import value3 from "@/public/values/value3.png";
import value4 from "@/public/values/value4.png";


export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "Services",
    hash: "#services",
  },
  {
    name: "About Us",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Reviews",
    hash: "#reviews",
  },
  {
    name: "Contact Us",
    hash: "#contact",
  },
] as const;

export const servicesData = [
  {
    title: "Frontend Development",
    description:
      "We build responsive and user-friendly websites using modern technologies.",
    tags: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Material UI", "Framer Motion", "GSAP"],
    icon: React.createElement(FaReact),
  },
  {
    title: "API Development",
    description:
      "We build APIs that are fast, reliable, and easy to integrate with other services.",
    tags: ["Node.js", "Express", "ASP.NET", "Django"],
    icon: React.createElement
  },
  {
    title: "Database Design",
    description:
      "We design databases that are optimized for performance and scalability.",
    tags: ["PostgreSQL", "MySQL", "MongoDB"],
    icon: React.createElement
  },
  {
    title: "Machine Learning",
    description:
      "We build machine learning models that help businesses make data-driven decisions.",
    tags: ["Python", "PyTorch", "Pandas"],
    icon: React.createElement
  },
  {
    title: "Mobile Development",
    description:
      "We build mobile applications for both Android and iOS using React Native.",
    tags: ["React Native", "iOS", "Android"],
    icon: React.createElement(CgWorkAlt),
  },
  {
    title: "E-commerce Development",
    description:
      "We build online stores that are fast, secure, and easy to manage.",
    tags: ["WordPress", "Shopify", "Wix"],
    icon: React.createElement
  },
  {
    title: "SEO & Marketing",
    description:
      "We help businesses rank higher on search engines and reach more customers.",
    tags: ["Google Ads", "Facebook Ads", "Social Media Marketing"],
    icon: React.createElement
  },
  {
    title: "Graphic Design",
    description:
      "We create stunning visuals that help businesses stand out from the competition.",
    tags: ["Brand Identity", "Logo Design", "UI/UX Design", "Illustrations",],
    icon: React.createElement
  },
  {
    title: "Animation & Video",
    description:
      "We create animations and videos that bring your brand to life.",
    tags: ["Motion Graphics", "2D Animation", "3D Animation", "Video Editing"],

    icon: React.createElement
  }
] as const;

export const valuesData = [
  {
    title: "Empowerment",
    description: "We believe in the power of technology to uplift and enable people and businesses to reach their full potential.",
    icon: value1,
  },
  {
    title: "Collaboration",
    description: "We work closely with our clients, valuing their input and fostering a spirit of teamwork to achieve the best results.",
    icon: value2,
  },
  {
    title: "Integrity",
    description: "We uphold the highest standards of honesty and transparency in all our interactions and deliverables.",
    icon: value4,
  },
  {
    title: "Sustainability",
    description: "We create solutions that are effective and sustainable, delivering long-term benefits for our clients.",
    icon:  value3,
  },
] as const;

export const teamData = [
  {
    name: "Salih",
    role: "Founder & Technical Director",
    image: member1,
  },
  {
    name: "Ahmed",
    role: "Co-founder & Creative Director",
    image: member2,
  },
] as const;

export const projectsData = [
  {
    title: "Radio Deeshak",
    description:
      "A music streaming platform that allows users to listen to their favorite songs.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    imageUrl: project2,
    link: "https:/deeshak.com",
  },
  {
    title: "Nabeel Barber Shop",
    description:
      "A website for a barber shop that allows customers to book appointments online.",
    tags: ["WordPress", "Elementor", "WooCommerce", "SEO"],
    imageUrl: project1,
    link: "https://nabeelbarber.ca",
  },
] as const;

export const reviewsData = [
  {
    name: "Osman Malik",
    comment: "I am very satisfied with the work done by Sakia Labs. They exceeded my expectations and I would highly recommend them to anyone looking for a reliable tech partner.",
    rating: 5,
    date: "2024-06-15",
    avatarUrl: client2,
  },
  {
    name: "Nabeel Musa",
    comment: "It was a great experience working with the team at Sakia Labs. They were very professional and delivered the project on time.",
    rating: 4.5,
    date: "2023-08-02",
    avatarUrl: client1,
  },
] as const;
