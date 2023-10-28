import { Route, Routes } from "react-router-dom";
import { Home } from "../../pages/home";
import { Defaultlayout } from "./defaultlayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Defaultlayout/>}>
        <Route  index element={<Home/>} />
      </Route>
    </Routes>
  );
}
