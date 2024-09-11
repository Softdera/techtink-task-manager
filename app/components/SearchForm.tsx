import React, { ChangeEvent } from "react";
import { TextField, Box } from "@mui/material";

interface SearchFormProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchQuery, onSearch }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Box component="form" display="flex" gap={2} mt={2}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleChange}
      />
    </Box>
  );
};

export default SearchForm;
