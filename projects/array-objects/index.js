/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    const el = array[i];

    fn(el, i, array);
  }
}

// forEach([1, 2, 3], (el) => console.log(el))

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
function map(array, fn) {
  const doubleArr = [];

  for (let i = 0; i < array.length; i++) {
    const el = array[i];

    doubleArr.push(fn(el, i, array));
  }

  return doubleArr;
}

// map([1, 2, 3], (el) => console.log(el ** 2));

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
function reduce(array, fn, initial) {
  let sumNum = initial || array[0];
  let i = initial ? 0 : 1;

  for (; i < array.length; i++) {
    sumNum = fn(sumNum, array[i], i, array);
  }

  return sumNum;
}

console.log(reduce([1, 2, 3], (all, current) => all + current));

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  const upperKey = [];

  for (const key in obj) {
    upperKey.push(key.toUpperCase());
  }
  return upperKey;
}

// console.log(upperProps({ name: 'Сергей', lastName: 'Петров' }))
/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
function createProxy(obj) {}

export { forEach, map, reduce, upperProps, createProxy };
