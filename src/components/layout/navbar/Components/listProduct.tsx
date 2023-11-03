import { useContext} from "react";
import { CartContext } from "../../../../Context/Cart";
import { Minus, Plus, Trash } from "phosphor-react";

interface PropsListProducts {
  productId: number;
  quantity: number;
}

export function ListProduct({ product }: { product: PropsListProducts }) {
  const { products, HandleLessProduct,HandleRemoveProduct} = useContext(CartContext);

  const productFind = products.find(
    (produto) => produto.id === product.productId
  );
  const { image, title, price } = productFind || {};

  
  return (
    <div className="flex p-5 gap-4 flex-wrap">
      {image && <img src={image} alt={title} className="w-10 h-10" />}
      <div className="flex flex-col">
        <span className="font-bold">
          {title && title?.length > 20 ? title?.slice(0, 15) + "..." : title}
        </span>
        <span className="font-bold text-info mt-1">
          R$ {price && (price*product.quantity).toFixed(2)}
        </span>
      </div>
      <div className="flex gap-4">
        <button
          className="cursor-pointer"
          onClick={() => HandleLessProduct(product.productId)}
        >
          <Minus size={14} />
        </button>
        {product.quantity}
        <button className="cursor-pointer">
          <Plus size={14} />
        </button>
        <Trash size={20} fill="red" className="cursor-pointer ml-4" onClick={()=>HandleRemoveProduct(product.productId)}/>
      </div>
    </div>
  );
}
