import { useState } from "react";
import { Input, Button, Select } from "@mantine/core";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:3011/api/enquiries/";

function HomeEnquiryForm() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "Student",
    interest: "",
    message: "",
  });

  const [formFeedback, setFormFeedback] = useState<string>("");

  const createEnquiryMutation = useMutation({
    mutationFn: async (newEnquiry: typeof formData) => {
      const { data } = await axios.post(API_URL, newEnquiry);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allenquiries"] });
      setFormFeedback("Enquiry sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        userType: "Student",
        interest: "",
        message: "",
      });
    },
    onError: (error: any) => {
      setFormFeedback(
        error?.response?.data?.message || "Please fill all fields properly.",
      );
    },
  });

  const handleFormSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.userType ||
      !formData.interest ||
      !formData.message
    ) {
      setFormFeedback("Please fill in all fields!");
      return;
    }
    setFormFeedback("");
    createEnquiryMutation.mutate(formData);
  };

  return (
    <section id="contact" style={{ scrollMarginTop: 110 }}>
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          border: "2px solid black",
          borderRadius: 15,
          padding: 25,
          backgroundColor: "white",
          boxShadow: "5px 10px 10px 0px #ababab",
        }}
      >
        <h2 style={{ margin: 0, textAlign: "center" }}>Send an Enquiry</h2>

        <Input
          placeholder="Your Name"
          radius={10}
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.currentTarget.value })
          }
        />

        <Input
          placeholder="Your Email"
          radius={10}
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.currentTarget.value })
          }
        />

        <Input
          placeholder="Phone Number"
          radius={10}
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.currentTarget.value })
          }
        />

        <Select
          placeholder="Select User Type"
          radius={10}
          data={["Student", "Customer", "Other"]}
          value={formData.userType}
          allowDeselect={false}
          onChange={(value) =>
            setFormData({ ...formData, userType: value || "Student" })
          }
        />

        <Input
          placeholder="Interest (e.g., FPV Workshop, Mapping)"
          radius={10}
          value={formData.interest}
          onChange={(e) =>
            setFormData({ ...formData, interest: e.currentTarget.value })
          }
        />

        <Input
          placeholder="Your Message"
          radius={10}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.currentTarget.value })
          }
        />

        {formFeedback && (
          <p
            style={{
              margin: 0,
              fontSize: 13,
              textAlign: "center",
              color: formFeedback.includes("successfully") ? "green" : "red",
            }}
          >
            {formFeedback}
          </p>
        )}

        <Button
          radius={15}
          color="#064789"
          loading={createEnquiryMutation.isPending}
          onClick={handleFormSubmit}
        >
          Submit Enquiry
        </Button>
      </div>
    </section>
  );
}

export default HomeEnquiryForm;
