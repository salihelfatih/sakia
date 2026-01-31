import Hero from "@/components/sections/hero";
import Packages from "@/components/sections/packages";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Projects from "@/components/sections/projects";
import Differentiators from "@/components/sections/differentiators";
import Reviews from "@/components/sections/reviews";
import Contact from "@/components/sections/contact";
import Divider from "@/components/ui/divider";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col items-center px-4 w-full">
      <Hero
        headline="Steady hands for serious products"
        subheadline="We design and build calm, reliable software end-to-end, from early ideas to production systems."
        primaryCTA={{
          label: "Start a project",
          href: "#contact",
        }}
        secondaryCTA={{
          label: "See selected work",
          href: "#projects",
        }}
        microcopy="Selective engagements. Clear scope. Thoughtful execution."
      />
      <Divider />
      <Packages />
      <Divider />
      <About />
      <Services />
      <Divider />
      <Projects />
      <Divider />
      {/* <Differentiators /> */}
      <Reviews />
      <Divider />
      <Contact />
    </main>
  );
}
