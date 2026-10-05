import { Button } from "@mantine/core";

function LandingSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        borderRadius: 15,
        padding: "clamp(30px, 6vw, 70px) clamp(15px, 4vw, 40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#064789",
        gap: 20,
        boxShadow: "5px 15px 10px 0px #ababab",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(32px, 6vw, 52px)",
          margin: 0,
          color: "#EBF2FA",
        }}
      >
        DroneTV AI
      </h1>
      <p
        style={{
          fontSize: "clamp(15px, 2.5vw, 18px)",
          maxWidth: 700,
          margin: 0,
          lineHeight: 1.6,
          color: "#EBF2FA",
        }}
      >
        Empowering industries and next-generation engineers with autonomous UAV
        solutions, precision aerial intelligence, and hands-on drone robotics
        training.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 15,
          marginTop: 15,
        }}
      >
        <Button
          size="md"
          radius={20}
          color="#427AA1"
          onClick={() => scrollToSection("services")}
        >
          Services
        </Button>
        <Button
          size="md"
          radius={20}
          color="#427AA1"
          onClick={() => scrollToSection("contact")}
        >
          Send an enquiry
        </Button>
      </div>
    </section>
  );
}

export default LandingSection;
