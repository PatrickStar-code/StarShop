import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
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
  HandleRemoveProduct: (id: number) => void;
  AddNewProduct(id: number): void;
  HandleLogout: () => void;
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

export interface CartProducts{
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
            if(product.quantity > 1){
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

  

  const getSubtotalCart = useCallback(() => {
    let subtotal = 0;
    if (!objIsEmpty(Cart) && Cart.products.length > 0) {
      Cart.products.forEach((cartProduct) => {
        const product = products.find((p) => p.id === cartProduct.productId);
        if (product) {
          subtotal += product.price * cartProduct.quantity;
        }
      });
    }
    return subtotal;
  }, [Cart, products]);

  function HandleRemoveProduct(id:number){
    Cart.products.forEach((product)=>{
      if(id === product.productId){
        setCart((state) => {
          const updatedProducts = state.products.filter((p) => p.productId !== id);
          return {
            ...state,
            products: updatedProducts,
          };
        });
      }
    })
  }
  
  function AddNewProduct(id:number){
    if(Cart.id !== undefined){
      const indexInCart = Cart.products.findIndex((product)=>{
        return id === product.productId
      })
      if(indexInCart !== -1){
        const updateProducts = Cart.products.map((product)=>{
          if(id === product.productId){
            return {
              ...product,
              quantity: product.quantity + 1
            }
          }
          return product
        })
        setCart((state)=>{
          return{
            ...state,
            products:updateProducts
          }
        })
      }
      else{
        setCart((state)=>{
          return{
            ...state,
            products:[
              ...state.products,
              {
                productId: id,
                quantity: 1
              }
            ]
          }
        })
      }
    }
    else{
      const NewCart = {
        id: 8,
        userId:0,
        date: (new Date).toString(),
        products:[
          {
            productId: id,
            quantity: 1
          }
        ]
      }
      setCart(NewCart)
    }
    
  }

  function HandleLogout(){
    setUser({} as UsersProps);
    setCart({} as CartProps);
    setLoginError(false);
  }

  
  useEffect(() => {
    setLoading(true);
    GetDataProducts();
    GetAllUsers();
    setLoading(false);
  }, []);
  
  useEffect(() => {
    setSubtotal(getSubtotalCart());
    setLoading(false);


  }, [getSubtotalCart]);
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
        HandleAddProduct,
        HandleRemoveProduct,
        AddNewProduct,
        HandleLogout
        

      }}
    >
      {children}
    </CartContext.Provider>
  );
}
