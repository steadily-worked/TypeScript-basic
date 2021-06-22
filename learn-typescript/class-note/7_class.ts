class Man {
  private name: string;
  public age: number;
  readonly log: string;
  // 변수 별로 접근(유효) 범위를 설정할 수 있다.
  // 이 클래스 안에서만 쓴다: private, 아니다: public, 값 변경 불가: readonly
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
