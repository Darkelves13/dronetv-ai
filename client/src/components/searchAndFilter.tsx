import { Input, Select } from "@mantine/core";
import { Search } from "lucide-react";

interface SearchAndFilterProps {
  selectedUserType: string;
  setSelectedUserType: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

function SearchAndFilter({
  selectedUserType,
  setSelectedUserType,
  searchQuery,
  setSearchQuery,
}: SearchAndFilterProps) {
  return (
    <>
      <Input
        placeholder="Search by name, email, interest"
        leftSection={<Search size={18} />}
        style={{ flex: "1 1 220px", maxWidth: 320 }}
        radius={15}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
      />
      <Select
        placeholder="Select user type"
        data={["All", "Student", "Customer", "Other"]}
        value={selectedUserType}
        onChange={(value) => setSelectedUserType(value || "All")}
        allowDeselect={false}
        style={{ flex: "1 1 130px", maxWidth: 160 }}
        radius={15}
      />
    </>
  );
}

export default SearchAndFilter;
