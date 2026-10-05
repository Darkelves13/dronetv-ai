import axios from "axios";
import { Select } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:3011/api/enquiries";

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  alignItems: "center",
  gap: 8,
};

function SingleEnquiryDetail({
  selectedEnquiry,
  setSelectedEnquiry,
}: {
  selectedEnquiry: any;
  setSelectedEnquiry: (val: any) => void;
}) {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const { data } = await axios.put(`${API_URL}/${selectedEnquiry._id}`, {
        status: newStatus,
      });
      return data.data;
    },
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: ["allenquiries"] });
      setSelectedEnquiry(updatedData);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_URL}/${selectedEnquiry._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allenquiries"] });
      setSelectedEnquiry(null);
    },
  });

  if (!selectedEnquiry) return null;

  const decodeText = (text: string) => {
    if (!text) return "";
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<[^>]*>?/gm, "")
      .trim();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={rowStyle}>
        <h3 style={{ margin: 0 }}>Name</h3>
        <p style={{ margin: 0, wordBreak: "break-word" }}>
          {selectedEnquiry.name}
        </p>
      </div>

      <div style={rowStyle}>
        <h3 style={{ margin: 0 }}>Email</h3>
        <p style={{ margin: 0, wordBreak: "break-all" }}>
          {selectedEnquiry.email}
        </p>
      </div>

      <div style={rowStyle}>
        <h3 style={{ margin: 0 }}>Phone Number</h3>
        <p style={{ margin: 0 }}>{selectedEnquiry.phone}</p>
      </div>

      <div style={rowStyle}>
        <h3 style={{ margin: 0 }}>User Type</h3>
        <p style={{ margin: 0 }}>{selectedEnquiry.userType}</p>
      </div>

      <div style={rowStyle}>
        <h3 style={{ margin: 0 }}>Status</h3>
        <Select
          size="xs"
          w={160}
          value={selectedEnquiry.status}
          data={["New", "Contacted", "In Progress", "Closed"]}
          onChange={(value) => {
            if (value && value !== selectedEnquiry.status) {
              updateStatusMutation.mutate(value);
            }
          }}
        />
      </div>

      <div style={rowStyle}>
        <h3 style={{ margin: 0 }}>Interest</h3>
        <p style={{ margin: 0, wordBreak: "break-word" }}>
          {decodeText(selectedEnquiry.interest)}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <h3 style={{ margin: 0 }}>Message</h3>
        <p
          style={{
            margin: 0,
            overflowY: "auto",
            maxHeight: 120,
            border: "2px solid black",
            borderRadius: 8,
            padding: 10,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {decodeText(selectedEnquiry.message)}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 10,
        }}
      >
        <button
          style={{
            border: "2px solid red",
            borderRadius: 15,
            padding: "6px 14px",
            backgroundColor: "#fafafa",
            color: "red",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => deleteMutation.mutate()}
        >
          Delete Enquiry
        </button>
      </div>
    </div>
  );
}

export default SingleEnquiryDetail;
