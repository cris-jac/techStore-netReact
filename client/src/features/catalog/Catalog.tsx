// import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";

interface Props {
    products: Product[];
}

const Catalog = ({ products }: Props) => {
  return (
    <>
        <ProductList products={products}/>
    </>
  )
}

export default Catalog