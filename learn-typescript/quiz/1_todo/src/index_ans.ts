let todoItems: { id: number; title: string; done: boolean; }[]; // 할 일의 목록을 받는 배열

// api
function fetchTodoItems(): { id: number, title: string; done: boolean; }[] {
  const todos = [
    { id: 1, title: '안녕', done: false },
    { id: 2, title: '타입', done: false },
    { id: 3, title: '스크립트', done: false },
  ];
  return todos;
}

// crud methods
function fetchTodos(): object[] {
  const todos = fetchTodoItems();
  return todos;
}

function addTodo(todo: {id: number; title: string; done: boolean}): void {
  todoItems.push(todo);
}

function deleteTodo(index: number): void {
  todoItems.splice(index, 1);
}

function completeTodo(
    index: number,
    todo: {id: number; title: string; done: boolean; }
    ): void {
  todo.done = true;
  // todo가 object type으로 명시되어있기 때문에, 그 안에 done이 있다는 보장이 없다. 그래서 done에 에러가 생기는 것.
  // 이 경우에는, todo를 명확한 type이 정의된 object[]로 타입 지정을 해주면 된다.
  todoItems.splice(index, 1, todo);
}

// business logic
function logFirstTodo():object {
  return todoItems[0];
  // 리턴하는 첫 번째 값은, 리턴이므로 object가 들어가야 함(any도 가능)
}

function showCompleted(): object[] {
  return todoItems.filter((item:object) => item.done); // return todoItems.filter(function(item) { if (item.done) { return item; }});
}

// TODO: 아래 함수의 내용을 채워보세요. 아래 함수는 `addTodo()` 함수를 이용하여 2개의 새 할 일을 추가하는 함수입니다.
function addTwoTodoItems(): void {
  // addTodo() 함수를 두 번 호출하여 todoItems에 새 할 일이 2개 추가되어야 합니다.
  const item1 = {
      id: 4, title: 'item4', done: false,
  }

  addTodo(item1);
  addTodo({
      id: 5, title: 'item5', done: false,
  })
}

// NOTE: 유틸 함수
function log():void {
  console.log(todoItems);
}

todoItems = fetchTodoItems();
addTwoTodoItems();
log();
