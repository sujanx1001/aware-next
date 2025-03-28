
import Hero from '@/components/Hero';
import FeaturedCauses from '@/components/FeaturedCauses';
import BusinessShowcase from '@/components/BusinessShowcase';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedCauses />
        <BusinessShowcase />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
