import { RootLayout } from "./components/layout/RootLayout";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Achievements } from "./components/sections/Achievements";
import { Contact } from "./components/sections/Contact";
import { useReducedMotionPreference } from "./hooks/useReducedMotionPreference";
import { useSmoothScroll } from "./animation/useSmoothScroll";
import { useScrollProgress } from "./animation/useScrollProgress";

function App() {
  useReducedMotionPreference();
  useSmoothScroll();
  useScrollProgress();

  return (
    <RootLayout>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
    </RootLayout>
  );
}

export default App;
