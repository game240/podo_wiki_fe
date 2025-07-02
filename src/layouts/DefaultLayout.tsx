import { Outlet } from "react-router-dom";

// import NavBar from "../components/navbar/NavBar";

const DefaultLayout = () => {
  return (
    <main className="w-screen min-h-screen mx-auto">
      {/* <NavBar /> */}
      <Outlet />
    </main>
  );
};

export default DefaultLayout;
