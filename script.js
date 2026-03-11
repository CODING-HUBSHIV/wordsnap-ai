/* =========================
   GROQ CONFIG
========================= */

const GROQ_API_KEY = "YOUR_GROQ_API_KEY";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";


/* =========================
   UI ELEMENTS
========================= */

const input = document.getElementById("wordInput");
const explainBtn = document.getElementById("explainBtn");
const backBtn = document.getElementById("backBtn");

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");

const wordTitle = document.getElementById("wordTitle");
const wordMeaning = document.getElementById("wordMeaning");
const loading = document.getElementById("loading");


/* =========================
   TYPING EFFECT
========================= */

function typeText(text){

wordMeaning.textContent = "";
let index = 0;

function type(){

if(index < text.length){

wordMeaning.textContent += text.charAt(index);
index++;

setTimeout(type,18);

}

}

type();

}


/* =========================
   GROQ REQUEST
========================= */

async function generateExplanation(word){

const response = await fetch(GROQ_ENDPOINT,{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${GROQ_API_KEY}`
},

body:JSON.stringify({

model:"llama-3.1-8b-instant",

messages:[

{
role:"system",
content:"You are a dictionary assistant. Explain the given word in maximum 2 to 4 short lines only. Use clear simple language. Never exceed 4 lines."
},

{
role:"user",
content:`Explain the word: ${word}`
}

],

temperature:0.2,
max_tokens:80

})

});

const data = await response.json();

return data.choices[0].message.content;

}


/* =========================
   EXPLAIN BUTTON
========================= */

explainBtn.onclick = async function(){

let word = input.value.trim();

if(word === "") return;

wordTitle.textContent = word;

screen1.classList.add("hidden");
screen2.classList.remove("hidden");

loading.classList.remove("hidden");

wordMeaning.textContent="";

try{

const explanation = await generateExplanation(word);

loading.classList.add("hidden");

typeText(explanation);

}
catch(error){

loading.classList.add("hidden");

wordMeaning.textContent="Error generating explanation.";

}

};


/* =========================
   BACK BUTTON
========================= */

backBtn.onclick=function(){

screen2.classList.add("hidden");
screen1.classList.remove("hidden");

input.value="";
input.focus();

};
