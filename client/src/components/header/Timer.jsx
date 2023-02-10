import Countdown from "react-countdown";
import { useEffect, useRef, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { updateProductStock } from "../../dbRequests/products";

export const Timer = ({ startCounter, counterData }) => {
  const counter = useRef();
  const { cart, setCart } = useContext(CartContext);

  const handleOnComplete = async () => {
    for (const p of cart) {
      await updateProductStock(p._id, {
        size: p.selectedSize,
        quantity: p.quantityInCart,
      });
    }
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("cartTotalPrice", JSON.stringify(0));
    if (localStorage.getItem("end_date") != null)
      localStorage.removeItem("end_date");
  };

  useEffect(() => {
    if (startCounter || (localStorage.getItem("end_date") && cart.length)) {
      counter.current.start();
    } else counter.current.stop();
  }, [startCounter]);

  return (
    <Countdown
      onComplete={handleOnComplete}
      ref={counter}
      autoStart={false}
      onStart={() => {
        if (localStorage.getItem("end_date") == null)
          localStorage.setItem(
            "end_date",
            JSON.stringify(counterData.date + counterData.delay)
          );
      }}
      date={counterData.date + counterData.delay}
      renderer={({ minutes, seconds }) => {
        if (startCounter || (localStorage.getItem("end_date") && cart.length))
          return (
            <span className="counter">
              Cart expires in {minutes}:{seconds} minutes
            </span>
          );
      }}
    />
  );
};
