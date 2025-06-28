import axiosClient from "../apis/axiosClient";
import { useEffect } from "react";

const WikiViewer = () => {
  useEffect(() => {
    const fetchWiki = async () => {
      try {
        const { data } = await axiosClient.get("/page/page1.html");
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWiki();
  }, []);

  return <div></div>;
};

export default WikiViewer;
