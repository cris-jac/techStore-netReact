// import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
// import { useEffect, useState } from "react";
// import { Product } from "../../app/models/product"
import { useDispatch } from "react-redux";
import ProductList from "./ProductList";
// import agent from "../../app/api/agent";
import { useGetProductsQuery } from "./productApi";
import { useEffect, 
  // useState 
} from "react";
import { setProducts } from "./productSlice";

// interface Props {
//     products: Product[];
// }

const Catalog = () => {
  // const [productList, setProductList] = useState<Product[]>([]);

  // useEffect(() => {
  //   // fetch("http://localhost:5072/api/Products")
  //   //   .then(response => response.json())
  //   //   // .then(data => console.log(data));
  //   //   .then(data => setProducts(data.result));
  //   agent.Catalog.list()
  //     .then(response => setProducts(response.result));
  // }, [])
  
  // const { products } = useSelector((state: RootState) => state.productStore);
  
  const { data: products, isError, isLoading } = useGetProductsQuery(null);
  
  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isError && products) {
      console.log('dispatching the products');
      dispatch(setProducts(products))
    } else if (isError) {
      console.log(`Error while setting the state: ${isError}`);
    }
  }, [products])


  if (isLoading) {
    // Query is still loading
    return <div>Loading...</div>;
  }
  
  if (isError) {
    // Query encountered an error
    return <div>Error loading products</div>;
  }

  // // const productList: Product[] = products || [];
  // const dispatch = useDispatch();
  // // const { products } = useSelector((state: RootState) => state.productStore)
  // useEffect(() => {
  //   if (products) {
  //     dispatch(setProducts(products));
  //   }
  // }, [dispatch, products])

  return (
    <>
        <ProductList products={products}/>
    </>
  )
}

export default Catalog