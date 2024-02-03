import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import List from "./pages/List";
import Issue from "./pages/Issue";

function App() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleOpenSnackbar = (error: string) => {
    setOpen(true);
    setError(error);
  };

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    _reason?: string
  ) => {
    setOpen(false);
    setError("");
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            index
            element={
              <List
                onOpenSnackbar={handleOpenSnackbar}
                onCloseSnackbar={handleCloseSnackbar}
              />
            }
          />
          <Route
            path="/:issue_number"
            element={
              <Issue
                onOpenSnackbar={handleOpenSnackbar}
                onCloseSnackbar={handleCloseSnackbar}
              />
            }
          />
        </Routes>
      </Router>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </>
  );
}

export default App;
