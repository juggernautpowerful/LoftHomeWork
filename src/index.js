/* eslint-disable no-unused-vars */
/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */

function forEach(array, fn) {

    for (let i = 0; i < array.length; ++i) {
        fn(array[i], i, array);
    }
}

/*
Задание 2:

Напишите аналог встроенного метода map для работы с массивами
Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
*/

function map(array, fn) {
    let arr;

    arr = [];
    for (let i = 0; i < array.length; i++) {
        arr[i] = fn(array[i], i, array);
    }
    
    return arr;
}

/*
Задание 3:

Напишите аналог встроенного метода reduce для работы с массивами
Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
*/
function reduce(array, fn, initial) {
    let total, currentValue, currentIndex, callbackResult, isInitial;

    isInitial = initial !== undefined;
    for (let i = 0; i < (isInitial? array.length : array.length - 1); i++) {
        if (i == 0) {
            total = isInitial? initial : array[i];
            currentValue = isInitial? array[i] : array[i + 1];
            currentIndex = isInitial? 0 : 1;

            callbackResult = fn(total, currentValue, currentIndex, array);
        } else {
            callbackResult = isInitial? fn(callbackResult, array[i], i, array) 
                : fn( callbackResult, array[i + 1], i + 1, array);
        } 
    }

    return callbackResult;
}

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

/*
Задание 5 *:

Напишите аналог встроенного метода slice для работы с массивами
Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
*/
function slice(array, from = 0, to = array.length) {
    let arr = [];

    if (array.length < 1 || !isFinite(from) || !isFinite(to)) {
        return [];
    }

    from = (from = from < 0? array.length + from : from) < 0? 0 : from;
    to = (to = to < 0? array.length + to : to) > array.length? array.length : to;

    if (from > array.length || from > to) {
        return [];
    }

    for ( let i = from; i < to; i++) {
        arr.push(array[i]);
    }

    return arr;
}

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

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};

