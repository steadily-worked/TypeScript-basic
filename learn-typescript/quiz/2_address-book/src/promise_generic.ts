// function fetchItems(): string[] {
//   const items = ['a', 'b', 'c'];
//   return items;
// }
// const result = fetchItems(); // string 있는 배열 반환
// console.log(result); // result의 결과는 string 배열임

function fetchItems(): Promise<string[]> {
    const items: string[] = ['a', 'b', 'c'];
    return new Promise(function(resolve) {
        resolve(items); // 이게 Promise의 value가 됨
    });
}
// new Promise를 반환하게 되면, 반환하는 프로미스의 타입을 알 수가 없다.

fetchItems();