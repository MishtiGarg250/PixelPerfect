import Footer from "@/components/home/blog-footer";
import HeroSection from "@/components/home/hero-section";
import Skills from "@/components/home/Skills";
import StudyPlan from "@/components/home/study-plan";


const page = async () => {
  return (
    <main>
      <HeroSection />
      <Skills/>
      <StudyPlan/>
      <Footer />
    </main>
  );
};

export default page;