import { useState } from "react";
import SearchAndFilter from "../components/searchAndFilter";
import EnquirySection from "../components/enquirySection";

function Admin() {
  const [selectedUserType, setSelectedUserType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div
      style={{
        maxWidth: 1200,
        width: "95%",
        margin: "0 auto",
        paddingBottom: 60,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 15,
          borderRadius: 15,
          width: "100%",
          minHeight: 80,
          padding: "15px 20px",
          backgroundColor: "#064789",

          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(22px, 4vw, 32px)",
            color: "#EBF2FA",
          }}
        >
          Admin Dashboard
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            flex: "1 1 auto",
            justifyContent: "flex-end",
          }}
        >
          <SearchAndFilter
            selectedUserType={selectedUserType}
            setSelectedUserType={setSelectedUserType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </header>
      <main>
        <EnquirySection
          selectedUserType={selectedUserType}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}

export default Admin;
