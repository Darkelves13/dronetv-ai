import LandingSection from "../components/landingSection";
import ServiceSection from "../components/serviceSection";
import TrainingSection from "../components/trainingSection";
import HomeEnquiryForm from "../components/homeEnquiryForm";
import Chatbot from "../components/chatbox";

function Home() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "5px 20px 80px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 70,
      }}
    >
      <LandingSection />
      <ServiceSection />
      <TrainingSection />
      <HomeEnquiryForm />
      <Chatbot />
    </div>
  );
}

export default Home;
