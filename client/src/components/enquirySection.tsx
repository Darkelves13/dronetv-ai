import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import SingleEnquiryDetail from "./enquiryDetails.tsx";

const fetchAllEnquiries = async () => {
  const { data } = await axios.get("http://localhost:3011/api/enquiries/");
  return data.data;
};

interface EnquirySectionProps {
  selectedUserType: string;
  searchQuery: string;
}

function EnquirySection({
  selectedUserType,
  searchQuery,
}: EnquirySectionProps) {
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  const {
    data: allEnquiries = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allenquiries"],
    queryFn: fetchAllEnquiries,
  });

  if (isError) return <h1>Error</h1>;

  const filteredEnquiries = allEnquiries.filter((enquiry: any) => {
    const matchesUserType =
      !selectedUserType ||
      selectedUserType.toLowerCase() === "all" ||
      enquiry.userType?.toLowerCase() === selectedUserType.toLowerCase();

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      enquiry.name?.toLowerCase().includes(query) ||
      enquiry.email?.toLowerCase().includes(query) ||
      enquiry.interest?.toLowerCase().includes(query);

    return matchesUserType && matchesSearch;
  });

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: 30 }}>loading...</div>
      ) : filteredEnquiries.length === 0 ? (
        <div
          style={{
            border: "2px solid black",
            borderRadius: 15,
            marginTop: 20,
            width: "100%",
            padding: 30,
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ margin: 0 }}>No enquiries available</h2>
        </div>
      ) : (
        filteredEnquiries.map((enquiry: any) => (
          <div key={enquiry._id} style={{ marginTop: 16 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))",
                gap: 10,
                placeItems: "center",
                border: "2px solid black",
                borderRadius: 15,
                padding: "12px 15px",
                width: "100%",
                backgroundColor: "#EBF2FA",
                boxSizing: "border-box",
                boxShadow: "5px 10px 10px 0px #ababab",
              }}
            >
              <p
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  backgroundColor: "#064789",
                  color: "white",
                  margin: 0,
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: 13,
                  boxSizing: "border-box",
                }}
              >
                {enquiry.name}
              </p>
              <p
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  backgroundColor: "#064789",
                  color: "white",
                  margin: 0,
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: 13,
                  boxSizing: "border-box",
                }}
              >
                {enquiry.email}
              </p>
              <p
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  backgroundColor: "#064789",
                  color: "white",
                  margin: 0,
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: 13,
                  boxSizing: "border-box",
                }}
              >
                {enquiry.phone}
              </p>
              <Button
                radius={20}
                size="sm"
                onClick={() => setSelectedEnquiry(enquiry)}
                color="#064789"
              >
                More...
              </Button>
            </div>
          </div>
        ))
      )}

      <Modal
        opened={Boolean(selectedEnquiry)}
        onClose={() => setSelectedEnquiry(null)}
        title={<h3 style={{ margin: 0 }}>User Enquiry</h3>}
        centered
        radius={15}
        size="lg"
      >
        <SingleEnquiryDetail
          selectedEnquiry={selectedEnquiry}
          setSelectedEnquiry={setSelectedEnquiry}
        />
      </Modal>
    </>
  );
}

export default EnquirySection;
