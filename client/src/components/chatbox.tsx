import { useState, useRef, useEffect } from "react";
import { Input, Button } from "@mantine/core";

const predefinedQA = [
  {
    question: "What services does DroneTV provide?",
    answer:
      "DroneTV provides aerial photography & videography, multispectral agricultural surveying, thermal & industrial inspection, 3D GIS mapping, search & rescue UAV deployment, and custom autonomous swarm shows.",
  },
  {
    question: "What courses / training are available?",
    answer:
      "We offer hands-on courses in FPV Drone Building, Autonomous Drone Programming (ROS2 & Python), DGCA Certified Remote Pilot Training, Aerial Photogrammetry, Avionics & Pixhawk Labs, and Thermal UAV Operations.",
  },
  {
    question: "How can I contact DroneTV?",
    answer:
      "You can contact us by filling out the 'Send an Enquiry' form at the bottom of the Home page or clicking the 'Want to send an enquiry?' button above!",
  },
  {
    question: "How can I register?",
    answer:
      "To register for any course or workshop, scroll down to the Enquiry Form, select 'Student' as your user type, enter the course name under 'Interest', and submit your details.",
  },
  {
    question: "I am interested in a service.",
    answer:
      "Great! Please click 'Want to send an enquiry?' above, select 'Customer' as your user type, and mention the specific drone service you need so our team can send you a quote.",
  },
  {
    question: "I am a student.",
    answer:
      "Welcome! We have beginner-to-advanced workshops and certification programs with full hardware kits. Click 'Want to send an enquiry?' and select 'Student' to get started!",
  },
  {
    question: "I want to speak with someone.",
    answer:
      "We would love to speak with you! Please submit your name, email, and phone number in our Enquiry Form, and a DroneTV representative will call you shortly.",
  },
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [messages, setMessages] = useState<
    { sender: "bot" | "user"; text: string }[]
  >([
    {
      sender: "bot",
      text: "Hi! Welcome to DroneAI. Click a question below or type a message to get started!",
    },
  ]);

  const [chatInput, setChatInput] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSelectQuestion = (qa: { question: string; answer: string }) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: qa.question },
      { sender: "bot", text: qa.answer },
    ]);
  };

  const handleSendMessage = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    const matched = predefinedQA.find(
      (qa) =>
        qa.question.toLowerCase().includes(trimmed.toLowerCase()) ||
        qa.answer.toLowerCase().includes(trimmed.toLowerCase()),
    );

    const botReply = matched
      ? matched.answer
      : "Thanks for reaching out! Click 'Want to send an enquiry?' above to jump to our enquiry form.";

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: trimmed },
      { sender: "bot", text: botReply },
    ]);
    setChatInput("");
  };

  const scrollToEnquiryForm = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 90,
      }}
    >
      {!isOpen ? (
        <Button radius={20} onClick={() => setIsOpen(true)} color="#064789">
          Chat with DroneAI
        </Button>
      ) : (
        <div
          style={{
            width: "calc(100vw - 32px)",
            maxWidth: 380,
            height: "min(500px, 75vh)",
            border: "2px solid black",
            borderRadius: 15,
            backgroundColor: "white",
            padding: 15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 10,
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid black",
              paddingBottom: 8,
            }}
          >
            <h3 style={{ margin: 0 }}>DroneAI Assistant</h3>
            <Button
              size="xs"
              radius={15}
              color="#064789"
              onClick={() => setIsOpen(false)}
            >
              X
            </Button>
          </div>

          {/* Button to scroll directly to the Home Enquiry Form */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              radius={15}
              color="#064789"
              fullWidth
              onClick={scrollToEnquiryForm}
            >
              Want to send an enquiry?
            </Button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              border: "2px solid black",
              borderRadius: 10,
              padding: 10,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user" ? "#064789" : "#4c7da0",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: 15,
                  maxWidth: "85%",
                  fontSize: 13,
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 6,
              whiteSpace: "nowrap",
            }}
          >
            {predefinedQA.map((qa, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectQuestion(qa)}
                style={{
                  borderRadius: 15,
                  padding: "6px 12px",
                  fontSize: 12,
                  cursor: "pointer",
                  backgroundColor: "#064789",
                  color: "#EBF2FA",
                  flexShrink: 0,
                }}
              >
                {qa.question}
              </div>
            ))}
          </div>

          {/* Bottom Search / Chat Bar + Send Button */}
          <div style={{ display: "flex", gap: 8 }}>
            <Input
              placeholder="Ask a question..."
              radius={15}
              style={{ flex: 1 }}
              value={chatInput}
              onChange={(e) => setChatInput(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button radius={15} onClick={handleSendMessage} color="#064789">
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
