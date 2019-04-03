const repeat = str => `${str}, ${str}`;
const capitalize = str => str[0].toUpperCase() + str.substring(1);
const exclaim = str => `${str}!`;

const newString = exclaim(capitalize(repeat("yo")));
document.getElementById('string-1').innerText = newString;

let pipedString = "yo"
	|> repeat
	|> capitalize
	|> exclaim;

document.getElementById('string-2').innerText = pipedString;