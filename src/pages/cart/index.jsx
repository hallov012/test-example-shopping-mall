import React from 'react';

import CartTable from '@/pages/cart/components/CartTable';
import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import Layout, { authStatusType } from '@/pages/common/components/Layout';
import { useCartStore } from '@/store/cart';
import { pick } from '@/utils/common';

/**
 * 비즈니스 로직
 * 1. 상품 리스트 영역: 상품 리스트 렌더링 및 수량 수정, 삭제 버튼 클릭에 따른 상호 작용
 * 2. 가격 계산 영역: 모든 상품의 수량과 가격을 계산
 */
const Cart = () => {
  const { cart } = useCartStore(state => pick(state, 'cart'));
  const isExist = Object.keys(cart).length;

  return (
    <Layout
      containerStyle={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
      authStatus={authStatusType.NEED_LOGIN}
    >
      {isExist ? <CartTable /> : <EmptyNotice />}
    </Layout>
  );
};

export default Cart;
