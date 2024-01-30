import { TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material"
import { CartItem } from "../../app/models/shoppingCart"
import { useEffect, useState } from "react";

interface Props {
    items: CartItem[];
}

const ShoppingCartSummary = ({ items }: Props) => {

    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        if (items) {
            const stotal = items.reduce((subtotal, item) => {
                return subtotal += (item.quantity*item.priceInARS);
            }, 0);
            setSubtotal(stotal);
        }    
    }, [items])


  return (
    <TableContainer>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ borderTop: 'solid 1px', borderBottom: 'none' }}>Subtotal</TableCell>
                    <TableCell align="right" sx={{ borderTop: 'solid 1px', borderBottom: 'none' }}>$ {subtotal}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ borderTop: 'none'}}>Delivery Fee</TableCell>
                    <TableCell align="right" sx={{ borderTop: 'none' }}>$ {(subtotal>2000) ? 0 : 2000}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell sx={{ borderTop: 'solid 1px', borderBottom: 'none' }} >Total</TableCell>
                    <TableCell align="right" sx={{ borderTop: 'solid 1px', borderBottom: 'none' }} >$ {(subtotal > 2000) ? subtotal : subtotal+2000}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default ShoppingCartSummary