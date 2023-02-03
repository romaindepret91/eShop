import { useLocation } from "react-router-dom";

export default function ProductSheet() {
  const { state } = useLocation();
  console.log(state.product);
  return <div>Product Sheet</div>;
}
