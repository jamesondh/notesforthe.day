import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/default-layout";
import Home from "./pages/home";
import EditTemplate from "./pages/edit-template";
import Page404 from "./pages/page-404";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:day" element={<Home />} />
        <Route path="/edit-template" element={<EditTemplate />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/404" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
