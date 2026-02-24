import { AppBar, Box, Toolbar, Typography, Skeleton } from '@mui/material';
import Cookies from 'js-cookie';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import ApiErrorBoundary from '@/pages/common/components/ApiErrorBoundary';
import CartButton from '@/pages/common/components/CartButton';
import ConfirmModal from '@/pages/common/components/ConfirmModal';
import LoginButton from '@/pages/common/components/LoginButton';
import LogoutButton from '@/pages/common/components/LogoutButton';
import useConfirmModal from '@/pages/common/hooks/useConfirmModal';
import useProfile from '@/pages/common/hooks/useProfile';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

/**
 * 비즈니스 로직
 * 1. Wist Mart 텍스트 로고 클릭시 메인 페이지로 이동
 * 2. 로그인이 안된 경우
 *  - 로그인 버튼 노출, 클릭시 로그인 페이지로 이동
 * 3. 로그인 상태일 경우
 *  - 장바구니 카트 버튼, 장바구니에 담긴 상품수 나타남
 *  - 회원 이름으로 된 로그아웃 버튼 노출
 *  - 로그아웃 버튼 클릭시, "로그아웃 하시겠습니까?" 문구가 담긴 모달 노출
 *    -> 모달의 확인버튼 클릭시 로그아웃, 모달 닫힘. 취소 클릭시 모달 닫힘
 */
const NavigationBar = () => {
  const navigate = useNavigate();
  const { isModalOpened, toggleIsModalOpened } = useConfirmModal();
  const { isLogin, setIsLogin, setUserData } = useUserStore(state =>
    pick(state, 'isLogin', 'setIsLogin', 'setUserData'),
  );
  const { cart, initCart } = useCartStore(state =>
    pick(state, 'cart', 'initCart'),
  );
  const handleClickModalAgree = () => {
    remove();
    setIsLogin(false);
    Cookies.remove('access_token');
    toggleIsModalOpened();
  };
  const { data, remove } = useProfile({
    config: {
      onSuccess: profile => {
        console.log('EEEEE', profile);
        setUserData(profile);
        initCart(profile.id);
      },
      enabled: !!isLogin,
    },
  });
  const handleClickLogo = () => {
    navigate(pageRoutes.main);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              onClick={handleClickLogo}
              style={{ cursor: 'pointer' }}
            >
              Wish Mart
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              {isLogin ? (
                <ApiErrorBoundary>
                  <Suspense
                    fallback={<Skeleton sx={{ width: 100, height: 30 }} />}
                  >
                    <CartButton cart={cart} />
                    <LogoutButton data={data} onClick={toggleIsModalOpened} />
                  </Suspense>
                </ApiErrorBoundary>
              ) : (
                <LoginButton />
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <ConfirmModal
        title="로그아웃 확인"
        description="로그아웃 하시겠습니까?"
        handleClickDisagree={toggleIsModalOpened}
        handleClickAgree={handleClickModalAgree}
        isModalOpened={isModalOpened}
      />
    </>
  );
};

export default NavigationBar;
