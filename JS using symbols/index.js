const char = {};
const zero = '+![]';
const one = '+!![]';

const number = (num) => new Array(num).fill(one).join(' + ');

const getString = (str) => {
  return str.split('').map(letter => {
    if(letter in char) return char[letter];
    // if(+letter > 1 && +letter <= 9) return number(+letter);
    const charCode = letter.charCodeAt(0);
    return`([]+[])[${getString('constructor')}][${getString('fromCharCode')}](${number(charCode)})`;
  }).join('+');
};

// char['0'] = zero;
// char['1'] = one;

// from 'false'
char.f = `(![]+[])[${zero}]`;
char.a = `(![]+[])[${number(1)}]`;
char.l = `(![]+[])[${number(2)}]`;
char.s = `(![]+[])[${number(3)}]`;
char.e = `(![]+[])[${number(4)}]`;

// from 'true'
char.t = `(!![]+[])[${zero}]`;
char.r = `(!![]+[])[${number(1)}]`;
char.u = `(!![]+[])[${number(2)}]`;

// from '[object Object][object Object]'
char.o = `({}+{})[${one}]`;
char.b = `({}+{})[${number(2)}]`;
char.j = `({}+{})[${number(3)}]`;
char.c = `({}+{})[${number(5)}]`;
char[' '] = `({}+{})[${number(7)}]`;
char['['] = `({}+{})[${zero}]`;
char[']'] = `({}+{})[${number(14)}]`;

// from 'Infinity'
char.n = `(+!![]/+![]+[])[${one}]`;
char.i = `(+!![]/+![]+[])[${number(3)}]`;
char.y = `(+!![]/+![]+[])[${number(7)}]`;

// from 'String() { [native code] }' <= ''['constructor']
char.S = `([]+([]+[])[${getString('constructor')}])[${number(9)}]`;
char.g = `([]+([]+[])[${getString('constructor')}])[${number(14)}]`;
char['('] = `([]+([]+[])[${getString('constructor')}])[${number(15)}]`;
char[')'] = `([]+([]+[])[${getString('constructor')}])[${number(16)}]`;

// from 'function RegExp() { [native code] }'
char.R = `([]+(/-/)[${getString('constructor')}]) [${number(9)}]`;
char.E = `([]+(/-/)[${getString('constructor')}]) [${number(12)}]`;
char.x = `([]+(/-/)[${getString('constructor')}]) [${number(13)}]`;
char.p = `([]+(/-/)[${getString('constructor')}]) [${number(14)}]`;

// from '/\\\\\\\\/'
char['\\'] = `([]+(/\\\\/))[${number(1)}]`;

// from number format system
char.d = `(${number(13)})[${getString('toString')}](${number(14)})[${zero}]`;
char.h = `(${number(17)})[${getString('toString')}](${number(18)})[${zero}]`;
char.k = `(${number(20)})[${getString('toString')}](${number(21)})[${zero}]`;
char.m = `(${number(22)})[${getString('toString')}](${number(23)})[${zero}]`;
char.q = `(${number(26)})[${getString('toString')}](${number(27)})[${zero}]`;
char.v = `(${number(31)})[${getString('toString')}](${number(32)})[${zero}]`;
char.w = `(${number(32)})[${getString('toString')}](${number(33)})[${zero}]`;
char.x = `(${number(33)})[${getString('toString')}](${number(34)})[${zero}]`;

// from escape character
char.C = `((()=>{})[${getString('constructor')}](${getString('return escape')})()(${char['\\']}))[${number(2)}]`;

// compile the code
const compile = (code) => `(() => {})[${getString('constructor')}](${getString(code)})()`;

// log the symbolic code to console
console.log(compile('console.log("hello")'));


/** let's check whether it can read all the 65536 symbols or not */

// const allChars = [];
// const start = 0;
// const count = 100;
// const limit = start + count;

// for (let i = start; i < limit; i++) {
//   allChars.push( String.fromCharCode(i) );
// }

// let fail = [];

// // encode every character
// for (let i = 0; i < allChars.length; i++) {
//   const char = allChars[i];
//   const encoded = getString(char);
//   const result = char === eval(encoded);
//   if(!result) {
//     fail.push([i + start, char]);
//   }
//   console.log(i + start, char, result);
// }

// console.log('all fail: ', fail);
