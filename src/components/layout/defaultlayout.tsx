import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export  function Defaultlayout() {
  return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}
