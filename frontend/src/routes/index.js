import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Landing from "../pages";

// ------------------------------------------------

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
