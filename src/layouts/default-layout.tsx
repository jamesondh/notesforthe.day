import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

export default function DefaultLayout() {
  return (
    <div className="container mx-auto px-2">
      <Outlet />
      <Footer />
    </div>
  );
}
