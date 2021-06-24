interface Email {
  value: string;
  selected: boolean;
}

const emails: Email[] = [
  { value: "naver.com", selected: true },
  { value: "gmail.com", selected: false },
  { value: "hanmail.net", selected: false },
];

interface productNumber {
  value: number;
  selected: boolean;
}

// email과 productNumber를 각각 interface로 변환을 했고 그다음 createDropdownItem에서
// 이 인터페이스를 넣어줌

const numberOfProducts: productNumber[] = [
  { value: 1, selected: true },
  { value: 2, selected: false },
  { value: 3, selected: false },
];

function createDropdownItem(item: Email | productNumber) {
  const option = document.createElement("option");
  option.value = item.value.toString();
  option.innerText = item.value.toString();
  option.selected = item.selected;
  return option;
}

// NOTE: 이메일 드롭 다운 아이템 추가
emails.forEach(function (email) {
  const item = createDropdownItem(email);
  const selectTag = document.querySelector("#email-dropdown");
  selectTag.appendChild(item);
});

numberOfProducts.forEach(function (product) {
  const item = createDropdownItem(product);
});

// 현재 createDropdownItem에는 value가 number로 되어있음.(toString이 들어가므로)
// 근데, forEach 반복문에서는 이 경우 오류가 난다. 왜? 왜냐면 email은 value가 string으로
// 정의되어있기 때문. 왜냐면 emails를 도는 email이니까.. emails의 value가 string으로 돼있으니까.
