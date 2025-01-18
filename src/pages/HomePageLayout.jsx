import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";
import PopularPosts from "../Components/PopularPosts";

import "./HomePageLayout.css";

function HomePageLayout() {
  return (
    <div className="homepage-layout">
      <Sidebar />
      <Outlet />
      <PopularPosts />
    </div>
  );
}

export default HomePageLayout;
