import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import client1 from "@/public/avatars/client1.jpg";
import client2 from "@/public/avatars/client2.jpg";
// import client3 from "@/public/avatars/client3.jpg";
import member1 from "@/public/avatars/member1.jpg";
import member2 from "@/public/avatars/member2.jpg";
import member3 from "@/public/avatars/member3.jpg";
import member4 from "@/public/avatars/member4.jpg";
import project1 from "@/public/projects/project1.png";
import project2 from "@/public/projects/project2.png";
// import project3 from "@/public/projects/project3.png";
import service1 from "@/public/services/service1.jpg";
// import service2 from "@/public/services/service2.jpg";
// import service3 from "@/public/services/service3.jpg";
// import service4 from "@/public/services/service4.jpg";
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
    tags: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Material UI"],
    imageUrl: service1,
    link: "https://example.com/web-development",
    icon: React.createElement(FaReact),
  },
  {
    title: "API Development",
    description:
      "We build APIs that are fast, reliable, and easy to integrate with other services.",
    tags: ["Node.js", "Express", "Django", "ASP.NET"],
    imageUrl: service1,
    link: "https://example.com/api-development",
    icon: React.createElement
  },
  {
    title: "Database Design",
    description:
      "We design databases that are optimized for performance and scalability.",
    tags: ["PostgreSQL", "MySQL", "MongoDB"],
    imageUrl: service1,
    link: "https://example.com/database-design",
    icon: React.createElement
  },
  {
    title: "Machine Learning",
    description:
      "We build machine learning models that help businesses make data-driven decisions.",
    tags: ["Python", "PyTorch", "Pandas"],
    imageUrl: service1,
    link: "https://example.com/machine-learning",
    icon: React.createElement
  },
  {
    title: "Mobile Development",
    description:
      "We build mobile applications for both Android and iOS using React Native.",
    tags: ["React Native", "iOS", "Android"],
    imageUrl: service1,
    link: "https://example.com/mobile-development",
    icon: React.createElement(CgWorkAlt),
  },
  {
    title: "E-commerce Development",
    description:
      "We build online stores that are fast, secure, and easy to manage.",
    tags: ["WordPress", "Shopify", "Wix"],
    imageUrl: service1,
    link: "https://example.com/ecommerce-development",
    icon: React.createElement
  },
  {
    title: "SEO & Marketing",
    description:
      "We help businesses rank higher on search engines and reach more customers.",
    tags: ["Google Ads", "Facebook Ads", "Social Media Marketing"],
    imageUrl: service1,
    link: "https://example.com/seo-marketing",
    icon: React.createElement
  },
  {
    title: "Graphic Design",
    description:
      "We create stunning visuals that help businesses stand out from the competition.",
    tags: ["Brand Identity", "Logo Design", "UI/UX Design"],
    imageUrl: service1,
    link: "https://example.com/graphic-design",
    icon: React.createElement
  },
  {
    title: "Animation & Video",
    description:
      "We create animations and videos that bring your brand to life.",
    tags: ["Motion Graphics", "3D Animation", "Video Editing"],
    imageUrl: service1,
    link: "https://example.com/animation-video",
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
    title: "Sustainability",
    description: "We create solutions that are effective and sustainable, delivering long-term benefits for our clients.",
    icon:  value3,
  },
  {
    title: "Integrity",
    description: "We uphold the highest standards of honesty and transparency in all our interactions and deliverables.",
    icon: value4,
  },
] as const;

export const teamData = [
  {
    name: "Salih",
    role: "Founder & CEO",
    image: member1,
  },
  {
    name: "Zainab",
    role: "Lead Designer",
    image: member2,
  },
  {
    name: "Ahmed",
    role: "Lead Animator",
    image: member3,
  },
  {
    name: "Katie",
    role: "Content Manager",
    image: member4,
  },
] as const;

export const projectsData = [
  {
    title: "Nabeel Barber Shop",
    description:
      "A website for a barber shop that allows customers to book appointments online.",
    tags: ["React", "ASP.NET", "PostgreSQL", "Docker", "Material UI"],
    imageUrl: project1,
    link: "https://nabeelbarber.ca",
  },
  {
    title: "Radio Deeshak",
    description:
      "A music streaming platform that allows users to listen to their favorite songs.",
    tags: ["Next", "TypeScript", "Tailwind CSS", "MongoDB"],
    imageUrl: project2,
    link: "https:/deeshak.com",
  }
] as const;

export const reviewsData = [
  {
    name: "Nabeel Ahmed",
    comment: "It was a great experience working with the team at Sakia Labs. They were very professional and delivered the project on time.",
    rating: 5,
    date: "2023-08-02",
    avatarUrl: client1,
  },
  {
    name: "Osman Malik",
    comment: "I am very satisfied with the work done by Sakia Labs. They exceeded my expectations and I would highly recommend them to anyone looking for a reliable tech partner.",
    rating: 4.5,
    date: "2024-06-15",
    avatarUrl: client2,
  }
] as const;
