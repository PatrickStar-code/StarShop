import { Route, Routes } from "react-router-dom";
import { Home } from "../../pages/home";
import { Defaultlayout } from "./defaultlayout";
import { CartSummary } from "../../pages/CartSummary";



export function Router() {
  return (
    <Routes>
      <Route path="/"element={<Defaultlayout/>}>
        <Route  index element={<Home/>} />
        <Route element={<CartSummary/>} path="/cart"/>
      </Route>
    </Routes>
  );
}
