import { useRoutes } from "react-router-dom";
import Homepage from "./homepage/Homepage";
import ProductCatalog from "./products/ProductCatalog";
import ProductSheet from "./products/ProductSheet";

const routes = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: [
      "/products/all",
      "/products/men",
      "/products/women",
      "/products/all/*",
      "/products/men/*",
      "/products/women/*",
    ],
    element: <ProductCatalog />,
  },
  {
    path: "/products/:slug",
    element: <ProductSheet />,
  },
];

export default function Routing() {
  const routing = useRoutes(routes);
  console.log(routing);
  return routing;
}
