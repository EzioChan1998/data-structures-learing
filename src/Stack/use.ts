// 栈的使用
import Stack from "./Stack";

// 十进制转二进制
function decimalToBinary(decimalNumber: number) {
  const remStack = new Stack();
  let number = decimalNumber;
  let rem:number;
  let binaryString = '';

  while (number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}

function baseConverter(decimalNumber: number, base) {
  if(!(base >= 2 && base <= 36)) {
    console.error('base should be between 2 and 36');
    return '';
  }

  let remStack = new Stack();
  let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decimalNumber;
  let rem:number;
  let baseString = '';

  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }

  return baseString;
}

baseConverter(15645, 16);
