/* eslint-disable no-unused-vars */
/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */

function forEach(array, fn) {
    let index, len;

    for (index = 0, len = array.length; index < len; ++index) {
        fn(array[index], index, array);
    }
}

// let sum = 0;

// function sumNumberEach( item, i, arr ) {
//     sum += item;
// }
// let arrayEach = [10, 20, 30];
// let selfArrayEach = [10, 20, 30];

// arrayEach.forEach( (currentValue, i, ar) => sum += currentValue );
// forEach(selfArrayEach, sumNumberEach)
// console.log( sum );
// console.log( sum );

/*
Задание 2:

Напишите аналог встроенного метода map для работы с массивами
Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
*/

function map(array, fn) {
    let index, len, arr;

    arr = [];
    for (index = 0, len = array.length; index < len; index++) {
        arr[index] = fn(array[index], index, array);
    }
    
    return arr;
}

// function doubleNumberMap( item, i, arr ) {
//     return item * 2;
// }
// let arrayMap = [10, 20, 30];
// let doubleMap = array.map( currentValue => currentValue * 2 );
// let selfDoubleMap = map(arrayMap, doubleNumberMap)
// console.log( doubleMap );
// console.log( selfDoubleMap );
/*
Задание 3:

Напишите аналог встроенного метода reduce для работы с массивами
Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
*/
function reduce(array, fn, initial) {
    let total, currentValue, currentIndex, callbackResult, isInitial;
    let index, len;

    isInitial = initial !== undefined;
    for (index = 0, len = array.length; index < (isInitial? len : len - 1); index++) {
        if (index == 0) {
            total = isInitial? initial : array[index];
            currentValue = isInitial? array[index] : array[index + 1];
            currentIndex = isInitial? 0 : 1;

            callbackResult = fn(total, currentValue, currentIndex, array);
        } else {
            callbackResult = isInitial? fn(callbackResult, array[index], index, array) 
                : fn( callbackResult, array[index + 1], index + 1, array);
        } 
    }

    return callbackResult;
}

// let callbackReduce = ( total, currentValue, currentIndex, arr ) => { 
//     // console.log( total, currentValue, currentIndex, arr ); // значения параметров функции
//     return total + currentValue; // возвращаем значение, полученное от суммы первого параметра со вторым
// }

// let arrayReduce = [11,12,13,14,15];
// let result = arrayReduce.reduce(callbackReduce); // метод только с callback функцией
// console.log(result);
// let resultWithInitialValue = arrayReduce.reduce( callbackReduce, 35 ); // метод с callback функцией и первоначальным значением
// console.log( resultWithInitialValue );

// let selfResult = reduce(arrayReduce, callbackReduce); // метод только с callback функцией
// console.log(selfResult);
// let SelfResultWithInitialValue = reduce( arrayReduce, callbackReduce, 35 ); // метод с callback функцией и первоначальным значением
// console.log( SelfResultWithInitialValue );

/*
Задание 4:

Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

Пример:
 upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
*/
function upperProps(obj) {
    let arr = [];
    
    for (let prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            arr.push(prop.toString().toUpperCase())
        }
    }
    
    return arr;
}

// var menu = {
//     width: 300,
//     height: 200,
//     title: "Menu"
//   };
// let resultUpperProps  = upperProps(menu);
// console.log(resultUpperProps);
/*
Задание 5 *:

Напишите аналог встроенного метода slice для работы с массивами
Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
*/
function slice(array, from = 0, to = array.length) {
    let _from, _to, arr;
    let index, len;

    arr = [];

    if (array.length < 1) {
        // console.error('Входной массив пуст');
        return [];
    }

    _from = from >= 0? (from) : (_from = (array.length + from) < 0? 0 : array.length + from);
    _to = to >=0? (to = to > array.length? array.length : to) : (array.length + to);

    if (_from > array.length) {
        // console.log('Размер 2-го параметрa  (`from`) превышает длину массива');
        return [];
    }

    if (_from > _to) {
        // console.error('3-ий параметр  (`to`) не должен находиться в массиве раньше второго');
        return [];
    }

    for (index = _from, len = _to; index < len; index++) {
        arr.push(array[index]);
    }

    return arr;
}

// let x = [1, 2, 3, 'a', 'b', 'c'];
// let a, b, c, d, e, m, n, p;

// a = x.slice(); // значение переменной [1,2,3,a,b,c]
// b = x.slice(3, 4); // значение переменной ["a"]
// c = x.slice(2, 5); // значение переменной [3, "a", "b"]
// d = x.slice(-4, 5); // значение переменной [3, "a", "b"]
// e = x.slice(-4, -1); // значение переменной [3, "a", "b"]
// m = x.slice(-1000, 10);
// n = x.slice(-2);
// p = x.slice(15);
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);
// console.log(e);

// let f = "hello"; 
// let g = [f]; 
// let h = g.slice(); 
// console.log(f);
// console.log(g);
// console.log(h);
// console.log(m);
// console.log(n);
// console.log(p);

// let aa, bb, cc, dd, ee, mm, nn, pp;

// aa = slice(x); // значение переменной [1,2,3,a,b,c]
// bb = slice(x, 3, 4); // значение переменной ["a"]
// cc = slice(x, 2, 5); // значение переменной [3, "a", "b"]
// dd = slice(x, -4, 5); // значение переменной [3, "a", "b"]
// ee = slice(x, -4, -1); // значение переменной [3, "a", "b"]
// console.log(aa);
// console.log(bb);
// console.log(cc);
// console.log(dd);
// console.log(ee);
// let ff = "yes"; 
// let gg = [ff]; 
// let hh = slice(gg); 
// console.log(ff);
// console.log(gg);
// console.log(hh);
// mm = slice(x, -1000, 10);
// nn = slice(x, '-2h');
// pp = slice(x, 5, 3);
// console.log(mm);
// console.log(nn);
// console.log(pp);
/*
Задание 6 *:

Функция принимает объект и должна вернуть Proxy для этого объекта
Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
*/
function createProxy(obj) {
    return new Proxy(obj||{}, handler);
}

let handler = {
    set: (target, prop, value) =>{
        target[prop] = value * value;
        
        return true;
    }
};
// let obj = {};
// let proxy  = createProxy(obj);
// proxy.a = 2;
// proxy.b = 5;
// console.log(proxy);

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};

