import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { CategorySort } from "./CategorySort";
import type { CategoryWithID } from "../types/Category";

const ResponsiveAppBar = () => {
  const navigate = useNavigate();

  const handleSearch = (newQuery: string) => {
    const newParams = new URLSearchParams();
    newParams.set("q", newQuery);
    navigate({
      pathname: "/",
      search: newParams.toString(),
    });
  };

  const handleSortByCategory = (categories: CategoryWithID[]) => {
    const newParams = new URLSearchParams();
    if (categories.length > 0) {
      for (const category of categories) {
        newParams.append("category", category._id);
      }
    }
    console.log(newParams.toString());
    navigate({
      pathname: "/",
      search: newParams.toString(),
    });
  };

  return (
    <AppBar
      position="fixed"
      sx={{ width: "100%", background: "#e3dcc9" }}
      dir="rtl"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="a"
            href="/"
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              ml: 4,
              color: "inherit",
              "&:hover": {
                color: "white",
              },
            }}
          >
            <img src="/epilogue.png" width="100" height="50" />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2} // רווח של 16px בין האלמנטים
          >
            <CategorySort onCategorySelect={handleSortByCategory} />
            <SearchBar onSearch={handleSearch} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
