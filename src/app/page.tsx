import { Suspense } from "react";
import TopNav from "@/components/TopNav";
import HeroSection from "@/components/HeroSection";
import NextMatchCard from "@/components/NextMatchCard";
import NewsGrid from "@/components/NewsGrid";
import Footer from "@/components/Footer";
import AuthModalController from "@/components/AuthModalController";

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="flex-grow">
        <HeroSection />
        <NextMatchCard />
        <NewsGrid />
      </main>
      <Footer />
      <Suspense>
        <AuthModalController />
      </Suspense>
    </>
  );
}
