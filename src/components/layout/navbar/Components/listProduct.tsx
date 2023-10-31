

interface PropsListProducts {
    productId: number,
    productQuantity: number
}


export function ListProduct({product} : {product: PropsListProducts }) {
  
    return (
        <div>
            {product.productId}
        </div>
    )
}