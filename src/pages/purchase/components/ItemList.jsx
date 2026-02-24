import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import React from 'react';

import { useCartStore } from '@/store/cart';
import { pick } from '@/utils/common';
import { formatPrice } from '@/utils/formatter';

/**
 * 역할
 * 1. 장바구니에 담긴 상품과 가격 정보 노출
 */
const ItemList = () => {
  const { cart } = useCartStore(state => pick(state, 'cart'));

  return (
    <Box mt={2}>
      <Typography variant="h5" mb={1}>
        구매 물품
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            {Object.values(cart).map(({ id, title, count, price }) => (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>{count}개</TableCell>
                <TableCell>{formatPrice(price * count)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ItemList;
