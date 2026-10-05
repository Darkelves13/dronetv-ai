import { useState, useEffect, useRef } from "react";
import { Tabs } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";

function StickyHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<string>(location.pathname);

  const isClickScrolling = useRef<boolean>(false);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (location.pathname === "/admin") {
      setActiveTab("/admin");
    } else if (location.pathname === "/" && activeTab === "/admin") {
      setActiveTab("/");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      // If user clicked a tab, keep the lock alive until scrolling stops for 150ms
      if (isClickScrolling.current) {
        if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
        scrollTimeout.current = window.setTimeout(() => {
          isClickScrolling.current = false;
        }, 150);
        return;
      }

      const servicesEl = document.getElementById("services");
      const coursesEl = document.getElementById("courses");
      const contactEl = document.getElementById("contact");

      const triggerPoint = 200; // 200px below the top of the viewport

      // Check if #contact is visible in the bottom 60% of the screen or near the bottom of the page
      const contactTop = contactEl
        ? contactEl.getBoundingClientRect().top
        : Infinity;
      const coursesTop = coursesEl
        ? coursesEl.getBoundingClientRect().top
        : Infinity;
      const servicesTop = servicesEl
        ? servicesEl.getBoundingClientRect().top
        : Infinity;

      const isNearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;

      if (isNearBottom || contactTop <= window.innerHeight * 0.55) {
        setActiveTab("contact");
      } else if (coursesTop <= triggerPoint) {
        setActiveTab("courses");
      } else if (servicesTop <= triggerPoint) {
        setActiveTab("services");
      } else {
        setActiveTab("/");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleTabChange = (value: string | null) => {
    if (!value) return;

    // Immediately highlight the clicked tab
    setActiveTab(value);

    if (value === "/admin") {
      navigate("/admin");
      return;
    }

    // Lock scroll listener while the smooth scroll is moving
    isClickScrolling.current = true;
    if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
    scrollTimeout.current = window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);

    if (value === "/") {
      if (location.pathname !== "/") {
        navigate("/");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(value)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(value)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        border: "2px solid black",
        borderRadius: 15,
        width: "100%",
        minHeight: 65,
        padding: "10px 16px",
        backdropFilter: "blur(3px)",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          cursor: "pointer",
          margin: 0,
          fontSize: "clamp(18px, 3.5vw, 26px)",
        }}
        onClick={() => handleTabChange("/")}
      >
        DroneTv AI
      </h1>

      <Tabs variant="pills" value={activeTab} onChange={handleTabChange}>
        <Tabs.List
          style={{
            flexWrap: "nowrap",
            overflowX: "auto",
            gap: 4,
          }}
        >
          <Tabs.Tab value="/" style={{ padding: "6px 10px", fontSize: 13 }}>
            Home
          </Tabs.Tab>
          <Tabs.Tab
            value="services"
            style={{ padding: "6px 10px", fontSize: 13 }}
          >
            Services
          </Tabs.Tab>
          <Tabs.Tab
            value="courses"
            style={{ padding: "6px 10px", fontSize: 13 }}
          >
            Courses
          </Tabs.Tab>
          <Tabs.Tab
            value="contact"
            style={{ padding: "6px 10px", fontSize: 13 }}
          >
            Contact
          </Tabs.Tab>
          <Tabs.Tab
            value="/admin"
            style={{ padding: "6px 10px", fontSize: 13 }}
          >
            Admin
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  );
}

export default StickyHeader;
