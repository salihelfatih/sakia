import Intro from "@/components/intro";
import Services from "@/components/services";
import About from "@/components/about";
import Projects from "@/components/projects";
import Reviews from "@/components/reviews";
import Contact from "@/components/contact";
import Divider from "@/components/divider";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <Divider />
      <Services />
      <Divider />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Reviews />
      <Divider />
      <Contact />
    </main>
  );
}
