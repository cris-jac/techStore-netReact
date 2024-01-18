// import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product"

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardHeader 
            avatar={
                <Avatar>
                {product.name.charAt(0).toUpperCase()}
                </Avatar>} 
            title={product.name}
        />
        <CardActionArea>
            <CardMedia 
                height={140}
                component="img" 
                image="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2pvYjcyNC0wNTAtcC5wbmc.png"
                title={product.name}
            />
            <CardContent>
                <Typography variant="body2">
                    {product.brand}
                </Typography>
                <Typography variant="h5" color='secondary'>
                    $ {product.priceInARS}
                </Typography>
            </CardContent>
        </CardActionArea>

        <CardActions>
            <Button size="small" color="primary">
                Buy
            </Button>
        </CardActions>
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