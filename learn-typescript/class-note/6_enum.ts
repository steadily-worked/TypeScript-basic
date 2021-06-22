enum Shoes {
  Nike = "nike",
  Adidas = "adidas",
  Sth = "sth",
  // 값을 지정하지 않는다면 0부터 시작. Shoes.Nike = 0, Shoes.Adidas = 1, ...
}

const myShoes = Shoes.Nike;
console.log(myShoes); // 'nike'

// 예제
enum Answer {
  Yes = "Y",
  No = "N",
}
function askQuestion(answer: Answer) {
  if (answer == Answer.Yes) {
    console.log("정답입니다.");
  }
  if (answer == Answer.No) {
    console.log("오답입니다.");
  }
}
askQuestion(Answer.Yes);
askQuestion("Yes");
// 이넘을 이용해서 정의를 해줬음. enum에서 제공하는 데이터만 집어넣을 수 있음.
