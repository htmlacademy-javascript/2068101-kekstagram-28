//Функция для проверки длины строки.
const getStringValidation = (string, lenght) => string.length <= lenght;

getStringValidation('проверяемая строка', 18);

//Функция для проверки, является ли строка палиндромом.
const checkPalindrom = (string) => {
  const lowString = string.toLowerCase();
  let reverseString = '';
  for (let i = lowString.length - 1; i >= 0; i--) {
    reverseString += lowString.at(i);
  }

  return lowString === reverseString;
};

checkPalindrom('ДовОд');

//Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
const extractNumber = (string) => {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};

extractNumber('1 кефир, 0.5 батона');

//Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.
const myPadStart = (string, minLenght, pad) => {
  const actualPad = minLenght - string.length;
  if (actualPad <= 0) {
    return string;
  }
  const tempPad = pad.slice(0, actualPad % pad.length);
  const tempRepeat = pad.repeat(actualPad / pad.length);
  return tempPad + tempRepeat + string;
};

myPadStart('q', 4, 'werty');
