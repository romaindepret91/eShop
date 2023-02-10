import Countdown from "react-countdown";
import { useEffect, useRef, useContext } from "react";
import { CartContext } from "../../context/CartContext";

export const Timer = ({ startCounter, counterData }) => {
  const counter = useRef();
  const { cart, setCart } = useContext(CartContext);

  const handleOnComplete = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("cartTotalPrice", JSON.stringify(0));
    if (localStorage.getItem("end_date") != null)
      localStorage.removeItem("end_date");
  };
  useEffect(() => {
    console.log(startCounter);
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
              Cart valid for {minutes}:{seconds} minutes
            </span>
          );
      }}
    />
  );
};
