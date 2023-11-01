import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../axios";

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextProps {
  products: ProductsProps[];
  User: UsersProps;
  LoginError: boolean;
  loadingLogin: boolean;
  loading: boolean;
  Cart: CartProps;
  subtotal: number;
  GetUser: (data: { username: string; password: string }) => void;
  HandleLessProduct: (id: number) => void;
  HandleAddProduct: (id: number) => void;
}

interface UsersProps {
  id: number;
  email: string;
  password: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  zipcode: string;
  geolocation: {
    lat: number;
    long: number;
  };
  phone: string;
}

interface CartProps {
  id?: number;
  userId?: number;
  date: string;
  products: CartProducts[];
}

export interface ProductsProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartProducts{
  productId: number;
  quantity: number;
  
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [AllUsers, setAllUsers] = useState<UsersProps[]>([]);
  const [User, setUser] = useState({} as UsersProps);
  const [LoginError, setLoginError] = useState<boolean>(false);
  const [loadingLogin, setloadingLogin] = useState<boolean>(false);
  const [Cart, setCart] = useState({} as CartProps);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  async function GetUser(data: { username: string; password: string }) {
    localStorage.clear();
    setloadingLogin(true);
    setLoginError(false);
    AllUsers.map((user) => {
      if (user.username === data.username && user.password === data.password) {
        setUser(user);
        setLoginError(true);
        GetCart(user.id);
      } else {
        setLoginError(true);
      }
    });
    setloadingLogin(false);
  }

  async function GetAllUsers() {
    const data = await api.get("users");
    setAllUsers(data.data);
  }

  async function GetDataProducts() {
    const data = await api.get("products");
    setProducts(data.data);
  }
  

  async function GetCart(id: number) {
    setLoading(true);
    const data = await api.get(`carts/${id}`);
    setCart(data.data);
  }
  function objIsEmpty(obj: object) {
    for (const _prop in obj) {
      return false;
    }
    return true;
  }


  function HandleLessProduct(id: number) {
    if(Cart.products.length > 0){
      setCart((state) => {
        const updatedProducts = state.products.map((product) => {
          if (id === product.productId) {
            if(product.quantity > 0){
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
        }
          return product;
        });
        return {
          ...state,
          products: updatedProducts,
        };
      });
        
    }
  }
  
  function HandleAddProduct(id: number) {
    if(Cart.products.length > 0){
      setCart((state) => {
        const updatedProducts = state.products.map((product) => {
          if (id === product.productId) {
            
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }
          return product;
        });
        return {
          ...state,
          products: updatedProducts,
        };
      });
      
        
    }
    
  }

  useEffect(() => {
    setLoading(true);
    GetDataProducts();
    GetAllUsers();
    setLoading(false);
  }, []);

  useEffect(() => {

    function GetSubtotalCart() {
      if (!objIsEmpty(Cart) && Cart.products.length > 0) {
        setLoading(true);
        Cart.products.map((Cartproduct) => {
          products.map((product) => {
            if (Cartproduct.productId === product.id) {
              return setSubtotal((state) => state + (product.price * Cartproduct.quantity));
            }
          })
        })
      }
    }

    GetSubtotalCart();
    setLoading(false);


  }, [Cart, products]);
  return (
    <CartContext.Provider
      value={{
        products,
        User,
        LoginError,
        loadingLogin,
        Cart,
        subtotal,
        loading,
        GetUser,
        HandleLessProduct,
        HandleAddProduct

      }}
    >
      {children}
    </CartContext.Provider>
  );
}
