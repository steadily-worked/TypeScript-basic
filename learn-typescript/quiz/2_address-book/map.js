let heroes = [
    {name: 'Tony', age: 30},
    {name: 'Captain', age: 100},
];
heroes.map(function(hero) {
    return hero.name;
}); // ['Tony', 'Captain']

// 기존에 있는 값 변형 가능