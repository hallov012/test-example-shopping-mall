import { renderHook, act } from '@testing-library/react';

import useConfirmModal from './useConfirmModal';
// 리액트 훅은 반드시 리액트 컴포넌트내에서 호출되어야 정상적으로 실행

it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  // result: 훅을 호출해 얻은 결과 값 반환 -> result.currrent 값의 참조를 통해 최신 상태 추적 가능
  // rerender: 훅을 원하는 인자와 함께 호출해 상태를 갱신
  const { result, rerender } = renderHook(useConfirmModal);

  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  const { result } = renderHook(() => useConfirmModal(true));

  expect(result.current.isModalOpened).toBe(true);
});

it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result } = renderHook(useConfirmModal);

  //act: 리액트 훅을 테스트할 때 상태 변경을 트리거하는 함수
  act(() => {
    result.current.toggleIsModalOpened();
  });

  expect(result.current.isModalOpened).toBe(true);
});
