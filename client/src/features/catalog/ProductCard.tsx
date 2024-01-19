// import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { Product } from "../../app/models/product"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {

    const [onCart, setOnCart] = useState(false)
    const [onFavorites, setOnFavorites] = useState(false)

  return (
    <Card sx={{ 
        // maxWidth: 256, 
        borderRadius: 2,
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        boxShadow: 'none',
        ":hover": {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#D9D9D9',
            border: '1px solid #000',
            // boxSizing: 'border-box'
        }
    }}>
        {/* <CardHeader 
            avatar={
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                {product.name.charAt(0).toUpperCase()}
                </Avatar>} 
            title={product.name}
            titleTypographyProps={{ sx: { fontWeight: 'bold', color: 'primary.main' } }}
        /> */}
            <CardActionArea>

            <Link to={`/catalog/${product.id}`} style={{ 'textDecoration': 'none' }}>
                <CardMedia 
                    sx={{ 
                        height: 256, 
                        borderRadius: 2
                        // backgroundSize: "contain" 
                    }} 
                    image={product.pictureUrl}
                    title={product.name}
                />
                <CardContent>
                    <Typography variant="body1" sx={{ fontWeight: 'bold'}} color="text.primary">
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {product.brand}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold'}}  color='secondary' gutterBottom>
                        $ {product.priceInARS}
                    </Typography>
                    <Typography variant="caption" color='secondary' gutterBottom>
                        {product.priceInARS > 100000 ?  'Free Shipping' : '\u00A0' }
                    </Typography>
                    
                </CardContent>
            </Link>
                <Avatar 
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        marginTop: 1,
                        marginRight: 1,
                        backgroundColor: 'rgba(200, 200, 200, 0.5)'
                    }}
                    onClick={() => setOnCart(!onCart)} 
                >
                    <IconButton>
                        {(onCart) ? (
                            <ShoppingCartIcon style={{ color: 'blue' }}/>
                        ) : (
                            <AddShoppingCartIcon style={{ color: 'slate' }} />
                        )}
                    </IconButton>
                </Avatar>
                <Avatar 
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        marginTop: 1,
                        marginRight: 7,
                        backgroundColor: 'rgba(200, 200, 200, 0.5)'
                    }}
                    onClick={() => setOnFavorites(!onFavorites)} 
                >
                    <IconButton>
                        {(onFavorites) ? (
                            <FavoriteIcon style={{ color: 'red' }} />
                        ) : (
                            <FavoriteBorderIcon style={{ color: 'slate' }} />
                        )}
                    </IconButton>
                </Avatar>
                
            </CardActionArea>
        
        
{/* 
        <CardActions>
            <Button size="small">
                Add to Cart
            </Button>
            <Button size="small">
                View
            </Button>
            <Avatar sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                backgroundColor: 'blue'
            }}>
                <IconButton>
                    {(onCart) ? (
                        <ShoppingCartIcon/>
                    ) : (
                        <AddShoppingCartIcon/>
                    )}
                </IconButton>
            </Avatar>
            <Avatar sx={{
                position: 'absolute',
                top: 4,
                right: 20,
                backgroundColor: 'red'
            }}>
                <IconButton>
                    {(onFavorites) ? (
                        <FavoriteIcon />
                    ) : (
                        <FavoriteBorderIcon/>
                    )}
                </IconButton>
            </Avatar>
        </CardActions> */}
    </Card>
    // <ListItem key={product.id}>
    //     <ListItemAvatar>
    //         <Avatar />
    //     </ListItemAvatar>
    //     <ListItemText>
    //         {product.name} - $ARS {product.priceInARS}
    //     </ListItemText>
    // </ListItem>
  )
}

export default ProductCard