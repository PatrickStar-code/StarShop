import { useContext } from "react";
import { CardProduct } from "./components/cardProduct";
import { CartContext } from "../../Context/Cart";

export function Home() {
  const { products } = useContext(CartContext);
  return (
    <>
      <div className="px-4 bg-white mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
          <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
            <div className="max-w-xl mb-6">
              <h2 className="font-sans text-3xl sm:mt-0 mt-6 font-medium tracking-tight text-black sm:text-4xl sm:leading-none max-w-lg mb-6">
                Todos Produtos
              </h2>
              <p className="text-black text-base md:text-lg">
               Compre um de nossos Produtos!{' '}Com o melhor preço do mercado
              </p>
            </div>
          
          </div>
          <img
            alt="logo"
            width="420"
            height="120"
            src="src\assets\headeriMG.jpg"
          />
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-medium flex items-center justify-center">
          Eletronics
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {products
            .filter((product) => product.category === "electronics")
            .map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-medium flex items-center justify-center">
        Jewelery
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {products
            .filter((product) => product.category === "jewelery")
            .map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-medium flex items-center justify-center">
        Men's clothing
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {products
            .filter((product) => product.category === "men's clothing")
            .map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-medium flex items-center justify-center">
        Women's clothing
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {products
            .filter((product) => product.category === "women's clothing")
            .map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
}
