import { useEffect, useState } from 'react'
// import './styles.css'
import { Product } from '../models/product';
import Catalog from '../../features/catalog/Catalog';
import { Container, CssBaseline, Typography } from '@mui/material';
import Header from './Header';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5072/api/Products")
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products}/>
      </Container>
    </>
  )
}

export default App
