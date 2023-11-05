import { useContext } from "react";
import { CardProduct } from "./components/cardProduct";
import { CartContext } from "../../Context/Cart"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from "swiper/modules";


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
            src="/public/assets/undraw_shopping_app_flsj.svg"
          />
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-medium flex items-center justify-center">
          Eletronics
        </h3>
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          slidesPerView={4}
          grabCursor={true}
          className="mySwiper mt-4"
          breakpoints={{
            0 : {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480 : {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768 : {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024 : {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            
            
          }}
          >
          {products
            .filter((product) => product.category === "electronics")
            .map((product) => (
              <SwiperSlide  key={product.id}>
              <CardProduct product={product} />
              </SwiperSlide>
            ))}
            </Swiper>
      </div>
      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-medium flex items-center justify-center">
        Jewelery
        </h3>
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          slidesPerView={4}
          grabCursor={true}
          className="mySwiper mt-4"
          breakpoints={{
            0 : {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480 : {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768 : {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024 : {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            
            
          }}
          >
          {products
            .filter((product) => product.category === "jewelery")
            .map((product) => (
              <SwiperSlide key={product.id}>
              <CardProduct  product={product} />
              </SwiperSlide>
            ))}
            </Swiper>
      </div>
      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-medium flex items-center justify-center">
        Men's clothing
        </h3>
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          slidesPerView={4}
          grabCursor={true}
          className="mySwiper mt-4"
          breakpoints={{
            0 : {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480 : {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768 : {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024 : {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            
            
          }}
          >
                      {products
            .filter((product) => product.category === "men's clothing")
            .map((product) => (
              <SwiperSlide key={product.id}>
              <CardProduct product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-medium flex items-center justify-center">
        Women's clothing
        </h3>
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          slidesPerView={4}
          grabCursor={true}
          className="mySwiper mt-4"
          breakpoints={{
            0 : {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480 : {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768 : {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024 : {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            
            
          }}
          >          {products
            .filter((product) => product.category === "women's clothing")
            .map((product) => (
              <SwiperSlide key={product.id}>
              <CardProduct product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
