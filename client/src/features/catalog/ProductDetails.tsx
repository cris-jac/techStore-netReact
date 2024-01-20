import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";

const ProductDetails = () => {

  const { id } = useParams<{id: string}>();
  const [product, setProduct] = useState<Product | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios.get(`http://localhost:5072/api/products/${id}`)
    //   .then(response => setProduct(response.data.result))
    //   .catch(error => console.log(error))
    //   .finally(() => setLoading(false));

    // id && agent.Catalog.details(parseInt(id))
    //   .then(response => setProduct(response.result))
    //   .catch(error => console.log(error.errorMessages))
    //   .finally(() => setLoading(false));

    id && agent.Catalog.details(parseInt(id))
      .then(response => {
        if (response.isSuccess) {
          setProduct(response.result);
          setErrorMessages(null);
        } else {
          setProduct(null);
          setErrorMessages(response.errorMessages);
          if (errorMessages) {
            errorMessages?.forEach(message => {
              console.log('Error: ', message);
            });
          }
        }
      })
      .catch(error => {
        setProduct(null);
        setErrorMessages(error.errorMessages);
        if (errorMessages) {
          errorMessages?.forEach(message => {
            console.log(message);
          });
        }
      })
      .finally(() => setLoading(false));

  }, [id])    // It will look for any change in Id

  if (loading) return <h3>Loading...</h3>

  if (!product) return (
  <>
    <h3>Product not found</h3>
    <ul>
      {errorMessages?.map(error => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  </>)
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={`http://localhost:5173/${product.pictureUrl}`} loading="lazy" alt={product.name} style={{ width: '100%' }} />
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color='secondary'>${product.priceInARS}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>{product.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default ProductDetails