import { Breadcrumb } from "react-bootstrap";
import { useState } from "react";
import "./Breadcrumb.scss";

export default function CatalogBreadcrumb() {
  const [url, setUrl] = useState(window.location.pathname);
  const [arrayPath, setArrayPath] = useState(url.split("/").slice(1));
  let path = "";
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {arrayPath.map((item, index) => {
        path += `/${item}`;
        if (item == "all") {
          return;
        }
        if (item === "products") {
          return (
            <Breadcrumb.Item key={index} href="/products/all">
              {item}
            </Breadcrumb.Item>
          );
        }
        return (
          <Breadcrumb.Item key={index} href={path}>
            {item}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
