import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import useThemeStore from "../store/useThemesStore";

export default function Layout() {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
}
