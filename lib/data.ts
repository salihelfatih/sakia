import React from "react";
import { StaticImageData } from "next/image";
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
    name: "Packages",
    hash: "#packages",
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

export const packageData = [
  {
    title: "Starter",
    description: "Perfect for small businesses just getting started.",
    price: "$1,499",
    features: [
      "Frontend Development",
      "E-commerce Integration",
      "Basic SEO",
      "Logo Design",
      "Social Media Integration",
      "1 month of support"
    ],
  },
  {
    title: "Growth",
    description: "Ideal for businesses looking to expand their online presence.",
    price: "$2,999",
    features: [
      "All Starter features",
      "Backend Development",
      "Database Design",
      "Advanced SEO",
      "Brand Identity Package",
      "3 months of support"
    ],
  },
  {
    title: "Enterprise",
    description: "Comprehensive solution for large-scale projects.",
    price: "$5,999",
    features: [
      "All Growth features",
      "Mobile App Development",
      "Advanced Database Solutions",
      "Machine Learning Integration",
      "Motion Graphics & Animations",
      "6 months of premium support"
    ],
  },
] as const;

export const expertiseAreas = [
  {
    title: "Web Development",
    description: "We craft secure and responsive web aplications using modern technologies.",
    services: [
      "Frontend Development",
      "Backend Development",
      // "Full-stack Development",
      "Database Design",
      "Content Management Systems",
      "E-commerce Solutions"
    ],
    technologies: [
      "React", "Next.js", "Vue.js", "Node.js", "Express", "ASP.NET", "Django", 
      "Laravel", "Spring Boot", "Ruby on Rails", "PostgreSQL", "MySQL",
      "MongoDB", "Firebase", "WordPress", "WooCommerce", "Stripe", "PayPal"
    ]

  },
  {
    title: "Mobile Development",
    description: "We develop mobile applications for both Android and iOS platforms.",
    services: [
      "iOS App Development",
      "Android App Development",
      "Cross-platform Development"
    ],
    technologies: ["Swift", "Kotlin", "React Native"]
  },
  {
    title: "Machine Learning",
    description: "We implement machine learning models that help make data-driven decisions.",
    services: [
      "Predictive Modeling",
      "Data Analysis and Visualization",
      "Computer Vision"
    ],
    technologies: ["Python", "PyTorch", "Scikit-learn"]
  },
  {
    title: "Digital Marketing",
    description: "We help businesses rank higher on search engines and reach more customers.",
    services: [
      "Search Engine Optimization (SEO)",
      "Content Marketing",
      "Paid Advertising"
    ],
    technologies: ["Google Ads", "Social Media Ads"]
  },
  {
    title: "Design Services",
    description: "We deliver stunning visuals that help businesses stand out from the competition.",
    services: [
      "Brand Identity Design",
      "Logo Design",
      "UI/UX Design",
    ],
    technologies: ["Photoshop", "Illustrator", "Figma", ]
  },
  {
    title: "Animation Services",
    description: "We deliver stunning visuals that help businesses stand out from the competition.",
    services: [
      "Motion Graphics",
      "2D Animation",
      "3D Animation",
    ],
    technologies: ["Blender", "Maya", "Toon Boom"]
  },
];

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
    link: "https://deeshak.com",
  },
  {
    title: "Nabeel Barber Shop",
    description:
      "A website for a barber shop that allows customers to book appointments online.",
    tags: ["WordPress", "Elementor", "WooCommerce", "SEO"],
    imageUrl: project1,
    link: "https://nabeelbarber.shop",
  },
] as const;

export const reviewsData = [
  {
    name: "Osman Malik",
    organization: "Radio Deeshak",
    comment: "I am very satisfied with the work done by Sakia Labs. They exceeded my expectations and I would highly recommend them to anyone looking for a reliable tech partner.",
    rating: 5,
    date: "2024-05-14",
    avatarUrl: client1,
  },
  {
    name: "Nabeel Musa",
    organization: "Nabeel Barber Shop",
    comment: "It was a great experience working with the team at Sakia Labs. They were very professional and delivered the project on time.",
    rating: 4.5,
    date: "2023-08-02",
    avatarUrl: client2,
  },
] as const;
