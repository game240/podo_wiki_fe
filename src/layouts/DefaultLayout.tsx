import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";

const DefaultLayout = () => {
  return (
    <main className="w-screen min-h-screen mx-auto bg-[#F5F5F5]">
      <NavBar />
      <Outlet />
    </main>
  );
};

export default DefaultLayout;
