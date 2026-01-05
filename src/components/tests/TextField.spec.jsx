import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

describe('group', () => {
  // 테스트 그룹 내에서 추가로 지정 가능
  // beforeEach(() => {
  //   console.log('root - beforeEach');
  // });

  // beforeAll(() => {
  //   console.log('root - beforeAll');
  // });

  // afterEach(() => {
  //   console.log('root - afterEach');
  // });

  // afterAll(() => {
  //   console.log('root - afterAll');
  // });

  function renderTextField(props) {
    return render(<TextField {...props} />);
  }

  // // my-class란 class가 항상 적용된 컴포넌트를 렌더링
  // beforeEach(async () => {
  //   await renderTextField({ className: 'my-class' });
  // });
  it('classNAme prop으로 설정한 css class가 적용', async () => {
    // Arrange - 테스트를 위한 환경 만들기
    // -> className을 지닌 컴포넌트 랜더링
    // Act - 테스트할 동작 발생
    // -> 렌더링에 대한 검증이기에 이 단계 생략
    // -> 클릭/메서드 호출/props 변경 등에 대한 작업이 여기에 해당
    // Assert - 올바른 동작이 실행되었는지 검증
    // -> 렌더링 후 DOM에 해당 class가 존재하는지 검증

    // render API 호출 -> 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
    // jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 JS로 구현
    await renderTextField({ className: 'my-class' });

    // screen.debug();

    // vitest의 expect 함수를 사용해 기대 결과 검증(X)
    // 랜더링되는 DOM 구조가 올바르게 변경되었는지 확인(O) -> 최종적으로 사용자가 보는 결과는 DOM
    expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
      'my-class',
    );
  });

  describe('placeholder prop 설정', () => {
    // beforeEach(() => {
    //   console.log('placeholder - beforeEach');
    // });

    // beforeAll(() => {
    //   console.log('placeholder - beforeAll');
    // });

    // afterEach(() => {
    //   console.log('placeholder - afterEach');
    // });

    // afterAll(() => {
    //   console.log('placeholder - afterAll');
    // });

    it('기본 placeholder "텍스트를 입력해주세요." 노출', async () => {
      await renderTextField();

      const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

      expect(textInput).toBeInTheDocument();
    });

    it('placeholder prop으로 설정한 placeholder 노출', async () => {
      await renderTextField({ placeholder: 'test placeholder' });

      const textInput = screen.getByPlaceholderText('test placeholder');

      expect(textInput).toBeInTheDocument();
    });
  });
});

describe('event prop 설정', () => {
  it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출', async () => {
    const spy = vi.fn(); // 스파이 함수
    // 스파이 함수: 테스트 코드에서 특정 함수가 호출되었는지,
    // 함수의 인자로 어떤 것이 넘어왔는지 어떤 값을 반환하는지 등 다양한 값 저장
    const { user } = await render(<TextField onChange={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.type(textInput, 'test');

    expect(spy).toHaveBeenCalledWith('test');
  });

  it('Enter 키를 입력하면 onEnter prop으로 등록한 함수가 호출', async () => {
    const spy = vi.fn();
    const { user } = await render(<TextField onEnter={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.type(textInput, 'test{enter}');

    expect(spy).toHaveBeenCalledWith('test');
  });

  it('focus 시 onFocus prop으로 등록한 함수가 호출', async () => {
    const spy = vi.fn();
    const { user } = await render(<TextField onFocus={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(textInput);

    expect(spy).toHaveBeenCalled();
  });

  it('focus 활성화시 border 스타일 추가', async () => {
    const { user } = await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(textInput);

    expect(textInput).toHaveStyle({
      borderWidth: 2,
      borderColor: 'rgb(25, 118, 210)',
    });
  });
});
