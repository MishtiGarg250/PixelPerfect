import Footer from "@/components/home/blog-footer";
import HeroSection from "@/components/home/hero-section";
import Skills from "@/components/home/Skills";
import StudyPlan from "@/components/home/study-plan";
import TopArticles from "@/components/home/top-articles";

const page = async () => {
  return (
    <main>
      <HeroSection />
      <Skills/>
      <StudyPlan/>
      <TopArticles/>
      <Footer />
    </main>
  );
};

export default page;