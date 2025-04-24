import Highlighter from "./highlighter.js";

const highlighter = new Highlighter();
const $trs = document.querySelectorAll('tr');
const $demoButton = document.getElementById('demo-button');

$demoButton.addEventListener('click', (e) => {
    e.preventDefault();
    const randomIndex = Math.floor(Math.random() * $trs.length);
    highlighter.highlight($trs[randomIndex]);
})