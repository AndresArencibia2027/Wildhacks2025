
"use client";
import React from 'react';
import VideoUpload from '../components/VideoUpload';
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import "./Home.css"; 



const Home = () => {
return (
    <div className="flex flex-col bg-white min-h-[screen]">
    <Header />
        <main className="flex flex-col px-20 max-md:px-10 max-sm:px-5">
        <HeroSection />
        <VideoUpload />
        </main>
    </div>
    );
};

export default Home;
