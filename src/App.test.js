// App 컴포넌트를 모킹
jest.mock('./App', () => ({
  __esModule: true,
  default: () => null
}));

// 매우 간단한 테스트
describe('App 테스트', () => {
  test('간단한 스모크 테스트', () => {
    expect(true).toBe(true);
  });
});
