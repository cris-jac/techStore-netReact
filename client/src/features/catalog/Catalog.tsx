// import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";

// interface Props {
//     products: Product[];
// }

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5072/api/Products")
      .then(response => response.json())
      // .then(data => console.log(data));
      .then(data => setProducts(data.result));
  }, [])

  return (
    <>
        <ProductList products={products}/>
    </>
  )
}

export default Catalog