import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import TemplateBase from "../../components/commons/TemplateBase/TemplateBase";
import { RootState } from "../../store";

// const styles = {
//   rootTable: { width: "60%", margin: "0 20%" },
//   table: {
//     minWidth: 700,
//   },
//   titleColumn: {
//     textTransform: "uppercase",
//     fontWeight: "bolder",
//   },
// };

const TAX_RATE = 0.18;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

interface Row {
  name: string;
  description?: string;
  price: string;
}

function subtotal(items: Row[]) {
  return items.map(({ price }) => Number(price)).reduce((sum, i) => sum + i, 0);
}

export const CheckoutPage: React.FC = () => {
  let navigate = useNavigate();
  const dishesList = useSelector((state: RootState) => state.dishes);

  const rows = dishesList.dishes;
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  if (dishesList.dishes.length === 0) {
    navigate("/menu");
  }

  return (
    <TemplateBase>
      <div>
        <h1>Checkout</h1>
        <>
          <TableContainer component={Paper} >
            <Table  aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell  colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell  align="right">
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right" colSpan={3}>
                      {ccyFormat(Number(row.price))}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {ccyFormat(invoiceSubtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <b>Total</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>{ccyFormat(invoiceTotal)}</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </div>
    </TemplateBase>
  );
};
