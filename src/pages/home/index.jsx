import { Grid } from '@mui/material';
import React, { Suspense } from 'react';

import ApiErrorBoundary from '@/pages/common/components/ApiErrorBoundary';
import Layout from '@/pages/common/components/Layout';
import ProductFilter from '@/pages/home/components/ProductFilter';
import ProductList from '@/pages/home/components/ProductList';
import SkeletonProductCard from '@/pages/home/components/SkeletonProductCard';

/**
 * 비즈니스 로직
 * 1. 상품 검색 영역: 필터 요소에 따른 검색 조건 설정
 *    검색 필터 필드 추가 및 변경
 * 2. 상품 리스트 영역: 검색 결과에 따른 상품 리스트 렌더링 및 버튼 클릭에 따른 상호작용
 *    상품 리스트 렌더링 형태 변경
 */
const Home = () => {
  return (
    <Layout containerStyle={{ padding: '10px' }}>
      <ProductFilter />
      <ApiErrorBoundary>
        <Suspense
          fallback={
            <Grid container spacing={1} rowSpacing={1} justifyContent="center">
              {[...Array(12).keys()].map(index => (
                <SkeletonProductCard key={index} />
              ))}
            </Grid>
          }
        >
          <ProductList />
        </Suspense>
      </ApiErrorBoundary>
    </Layout>
  );
};

export default Home;
