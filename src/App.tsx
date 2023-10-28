import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/layout/Routes";
import { CartProvider } from "./Context/Cart";
import { Loader } from "./components/loader";

export function App() {
  return (
    <CartProvider>
      <Loader/>
      <BrowserRouter basename="/">
        <Router />
      </BrowserRouter>
    </CartProvider>
  );
}
