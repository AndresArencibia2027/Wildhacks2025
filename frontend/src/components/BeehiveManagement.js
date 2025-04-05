"use client";
import * as React from "react";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { UploadSection } from "./UploadSection";
import { HistoryLink } from "./HistoryLink";

const BeehiveManagement = () => {
  return (
    <main className="flex flex-col bg-white min-h-[screen]">
      <Header />
      <div className="flex flex-col px-20 max-md:px-10 max-sm:px-5">
        <HeroSection />
        <UploadSection />
        <HistoryLink />
      </div>
    </main>
  );
};

export default BeehiveManagement;
