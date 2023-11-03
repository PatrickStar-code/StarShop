import { useContext } from "react";
import { CartContext } from "../../../../Context/Cart";
import { Minus, Plus, TrashSimple } from "phosphor-react";

interface CartSumamryProps{
    productId: number;
    quantity: number;
} 

export const Product = ({product} : {product: CartSumamryProps}) => {

    const {products,HandleLessProduct,HandleAddProduct,HandleRemoveProduct} = useContext(CartContext);
    
    const ProductFind = products.find((productSearch) => productSearch.id === product.productId);
    
      const { title,image,price, } = ProductFind || {};

    return(
    <div className="flex justify-between items-center mt-6 pt-6">
    <div className="flex  items-center">
      <img
        width="60"
        src={image}
      />

      <div className="flex flex-col ml-3">
        <span className="md:text-md font-medium">
          {title && title?.length > 20 ? title?.substring(0, 20) + "..." : title}
        </span>
        <span className="text-xs font-light text-gray-400">
        </span>
      </div>
    </div>

    <div className="flex justify-center items-center">
      <div className="pr-8 flex ">
        <span className="font-semibold cursor-pointer flex justify-center items-center" onClick={() => HandleLessProduct(product.productId)}><Minus size={16} /></span>
        <input
          type="text"
          disabled
          className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
          value={product.quantity}
        />
        <span className="font-semibold" onClick={() => HandleAddProduct(product.productId)}><Plus size={16} /></span>
      </div>

      <div className="pr-8 ">
        <span className="text-xs font-medium">R${price && (price*product.quantity).toFixed(2)}
</span>
      </div>
      <div>
        <TrashSimple size={16} onClick={() => HandleRemoveProduct(product.productId)} />
      </div>
    </div>
  </div>
    )
}