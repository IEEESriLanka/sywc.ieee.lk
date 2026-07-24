import Hero from "./components/Hero";
import EventCountdown from "./components/EventCountdown";
import Theme from "./components/Theme";

import Glimps from "./components/Glimps/Glimps";

import ParallaxText from "./components/ParallaxText/ParallaxText";

import Team from "./components/Team";
import Sponsorships from "./components/Sponsorships";
import Sponsors from "./components/Sponsors";


import RegisterCTA from "./components/RegisterCTA/RegisterCTA";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <EventCountdown />
      {/* <Marquee /> */}

      <Theme />

      <div id="sponsorships">
        <Sponsorships />
      </div>

      <div id="sponsors">
        <Sponsors />
      </div>
      <Glimps />
      <ParallaxText />

      {/* <Slider /> */}

      <div id="organizers">
        <Team />
      </div>
      <RegisterCTA />
      <Footer />
    </main>
  );
}
