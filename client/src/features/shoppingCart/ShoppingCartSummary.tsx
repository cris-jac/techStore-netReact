import { TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material"

const ShoppingCartSummary = () => {
  return (
    <TableContainer>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ borderTop: 'solid 1px', borderBottom: 'none' }}>Subtotal</TableCell>
                    <TableCell sx={{ borderTop: 'solid 1px', borderBottom: 'none' }}>$ 20000.99</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ borderTop: 'none'}}>Delivery Fee</TableCell>
                    <TableCell  sx={{ borderTop: 'none' }}>$ 3000</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell sx={{ borderTop: 'solid 1px', borderBottom: 'none' }} >Total</TableCell>
                    <TableCell  sx={{ borderTop: 'solid 1px', borderBottom: 'none' }} >$ 23000.99</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
    
  )
}

export default ShoppingCartSummary