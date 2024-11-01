import { useEffect } from "react";
import { SidebarWithContentSeparator } from "@/components/ui/Sidebar.jsx";
import { StickyNavbar } from "@/components/ui/Nav.jsx";
import { useState } from "react";

const Layouts = () => {
  const [isMdScreen, setIsMdScreen] = useState(false);

  const handleMdScreen = () => {
    setIsMdScreen(window.innerWidth >= 768);
  };
  useEffect(() => {
    handleMdScreen();
    window.addEventListener("resize", handleMdScreen);
    return () => window.removeEventListener("resize", handleMdScreen);
  }, []);

  return (
    <div>{isMdScreen ? <SidebarWithContentSeparator /> : <StickyNavbar />}</div>
  );
};

export default Layouts;
