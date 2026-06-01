import { Navbar } from '../landing/Navbar';
import { Hero } from '../landing/Hero';
import { HowItWorks } from '../landing/HowItWorks';
import { ThemeShowcase } from '../landing/ThemeShowcase';
import { Privacy } from '../landing/Privacy';
import { CallToAction } from '../landing/CallToAction';
import { Footer } from '../landing/Footer';

export default function Landing() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Hero />
        <HowItWorks />
        <ThemeShowcase />
        <Privacy />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
}
