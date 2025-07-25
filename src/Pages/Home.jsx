// pages/Home.jsx
import { useEffect, useRef } from "react";
import { Hero } from '../components/Hero';
import { PrudenceSection } from '../components/PrudenceSection';
import EventSection_Homepage from "../components/EventSection_Homepage";
import { BoardSection } from '../components/BoardSection';
import { boardMembersChief } from '../constants/boardMembers';
import { boardMembersjoints } from '../constants/jointboard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';





export default function Home() {
  const prudenceRef = useRef(null);

  const handleExploreClick = () => {
    prudenceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Navbar />
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <Hero onExploreClick={handleExploreClick} />
      {/* <PrudenceSection prudenceRef={prudenceRef} /> */}
      <EventSection_Homepage />
      <BoardSection 
        title="Chief Board 2025" 
        members={boardMembersChief} 
      />
      {/* <BoardSection 
        title="Joint Board 2025" 
        members={boardMembersjoints} 
      /> */}
    </div>
    <Footer/>
    </>

  );
}