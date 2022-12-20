"use strict";

const app = new function() {
	
	/* 
	  Обробляє вхідні/вихідні дані HTML для шифрування/дешифрування шифру Віженера
	 */
	this.doCrypt = function(isDecrypt) {
		const keyStr = document.getElementById("key").value;
		if (keyStr.length == 0) {
			alert("Введіть ключ");
			return;
		}
		
		let keyArray = filterKey(keyStr);
		if (keyArray.length == 0) {
			alert("Ключ повинен містити принаймні одну літеру");
			return;
		}
		
		// Якщо true, то запускається процес декодування 
		if (isDecrypt) {
			for (let i = 0; i < keyArray.length; i++)
				keyArray[i] = (26 - keyArray[i]) % 26;
		}
		
		let textElem = document.getElementById("text");
		textElem.value = crypt(textElem.value, keyArray);
	};
	
	
	/* 
	   Повертає результат шифрування Віженера для заданого тексту з заданим ключем.
	 */
	function crypt(input, key) {
		let output = "";
		let j = 0;
		for (const ch of input) {
			const cc = ch.codePointAt(0);
			if (isUppercase(cc)) {
				output += String.fromCodePoint((cc - 65 + key[j % key.length]) % 26 + 65);
				j++;
			} else if (isLowercase(cc)) {
				output += String.fromCodePoint((cc - 97 + key[j % key.length]) % 26 + 97);
				j++;
			} else {
				output += ch;
			}
		}
		return output;
	}
	
	
	/* 
	   Повертає масив чисел, кожне з яких знаходиться в діапазоні [0, 26)], що відповідає заданому ключу.
	   Ключ не чутливий до регістру, нелітерні символи ігноруються.
	   Приклади:
	   - filterKey("AAA") = [0, 0, 0].
	   - filterKey("abc") = [0, 1, 2].
	   - filterKey("the $123# EHT") = [19, 7, 4, 4, 7, 19].
	 */
	function filterKey(key) {
		let result = [];
		for (const ch of key) {
			const cc = ch.codePointAt(0);
			if (isLetter(cc)) {
				result.push((cc - 65) % 32);
			}
		}
		return result;
	}
	
	
	// Перевіряє, чи є заданий код символу це латинська літера
	function isLetter(c) {
		return isUppercase(c) || isLowercase(c);
	}
	
	// Перевіряє, чи є заданий код символу цее латинська літера верхнього рагістру
	function isUppercase(c) {
		return 65 <= c && c <= 90;  // 65 - код символу 'A'. 90 - "Z".
	}
	
	// Перевіряє, чи є заданий код символу це латинська літера нижнього регістру
	function isLowercase(c) {
		return 97 <= c && c <= 122;  // 97 - код символу 'a'. 122 - "z".
	}

	// Кнопки
	const encryptButton = document.querySelector('#encrypt');
	const decryptButton = document.querySelector('#decrypt');

	encryptButton.addEventListener('click', e => this.doCrypt(false));
	decryptButton.addEventListener('click', e => this.doCrypt(true));
	
};

let expand = document.querySelectorAll('.expand');
let expandArrow = document.querySelectorAll('.expand i');
let content = document.querySelectorAll('.content');

expand.forEach((btn, index) => {
	btn.addEventListener('click', e => {
		if(!content[index].classList.contains('_expanded')) {
			content[index].classList.add('_expanded');
			expandArrow[index].style.transform = "rotate(180deg)";
		} else {
			content[index].classList.remove('_expanded');
			expandArrow[index].style.transform = "rotate(0deg)";
		}
	});
});
