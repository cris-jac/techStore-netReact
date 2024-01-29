import { TableContainer, Table, TableBody, TableRow, TableCell, Avatar, TableHead, Typography } from "@mui/material"

interface Props {
    items: any[]
}

const ShoppingCartTable = ({ items }: Props) => {
  return (
    <TableContainer sx={{ width: '100%', bgcolor: '#6C6874',  }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => (
                            <TableRow key={item.id}>
                                <TableCell sx={{ display: 'flex', flexDirection: 'row', gap: 2}} >
                                    <Avatar
                                        alt="productImage"
                                        // src="/static/images/avatar/1.jpg"
                                        sx={{ width: 56, height: 56 }}
                                    >{item.name[0]}</Avatar>
                                    <Typography>
                                        {item.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>$ {item.priceInRobux}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>$ {item.priceInRobux * item.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
  )
}

export default ShoppingCartTable