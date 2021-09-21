export default function Order({order,removeOneFromCart,removeProductFromCart}){
    console.log(order)
    return (
        <div>
        <ul>
          <li>{order.product.title}</li>
          {/* <li>{res}</li> */}
          {/* <li>{productName.data.title}</li> */}
          <li>{order.quantity}</li>
          <li
            onClick={() => {
              removeOneFromCart(order.product._id);
            }}
          >
            {" "}
            -
          </li>

          <li
            onClick={() => {
              removeProductFromCart(order.product._id);
            }}
          >
            {" "}
            x
          </li>
          <button
            onClick={() => {
              console.log("for later")
            }}
          >
            {" "}
            Order now
          </button>
        </ul>
      </div>
    )
}