import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import type { CategoryWithID } from "../types/Category";
import { useCategories } from "../hooks/useCategories";

export const CategorySort: React.FC<{
  onCategorySelect?: (categories: CategoryWithID[]) => void;
}> = ({ onCategorySelect }) => {
  const { categories } = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<CategoryWithID[]>([]);

  const handleChange = (_: any, newValue: CategoryWithID[]) => {
    setSelectedCategories(newValue);
    if (onCategorySelect) {
      onCategorySelect(newValue);
    }
  };

  return (
    <div className="search-bar">
      <Autocomplete
        multiple
        options={categories || []}
        getOptionLabel={(option) => option.name}
        value={selectedCategories}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="סינון לפי קטגוריות"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              className: "search-input",
            }}
          />
        )}
      />
    </div>
  );
};
