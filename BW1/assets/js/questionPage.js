
/* - - - data base domande, non modificare - - - */

const questions = [
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
            "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
];


/* - - - js questionPage - - - */

/* - - - js questionPage timer - - - */

/*definizione angolo cambio colori*/
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
/*definizione codici colori*/
const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

/*definizione variabili per gestione timer countdown*/
const TIME_LIMIT = 15;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = 0;
let remainingPathColor = COLOR_CODES.info.color;
/*inserimento in DOM del timer utilizzando svg w3.org*/
document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
</div>
`;

startTimer();

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft);
        if (timeLeft === 0) {
            unmatch++;
            console.log(match, unmatch);
            nextQuestion();
        }
    }, 1000);
}

/*funzione per gestione secondi*/
function formatTime(time) {
    let seconds = time % 60;
    return `SECONDS<span class="secondsFont">${seconds}</span>REMAINING`;
}
/*funzione per gestione cambio colori in base a timeLeft*/
function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document.getElementById("base-timer-path-remaining").classList.remove(warning.color, info.color);
        document.getElementById("base-timer-path-remaining").classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document.getElementById("base-timer-path-remaining").classList.remove(info.color, alert.color);
        document.getElementById("base-timer-path-remaining").classList.add(warning.color);
    } else {
        document.getElementById("base-timer-path-remaining").classList.remove(alert.color, warning.color);
        document.getElementById("base-timer-path-remaining").classList.add(info.color);
      }
}

/*funzioni per gestione barra countdown*/
function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
function setCircleDasharray() {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
}

/* - - - js questionPage question & answers - - - */

/* creazione array domande random e contatore domande*/

var localStorage = 0;
var match = 0;
var unmatch = 0;
var indexDomandaCorrente = 0;
var sezioneDomande = document.querySelector("#questionPageTitle h1");
var sezioneContatore = document.getElementById("contatoreDomande");
var contatore = 1;
sezioneContatore.innerText = contatore;
var domandeRandom = [];
while (domandeRandom.length < 10) {
    var domandaRandom = questions[Math.floor(Math.random() * questions.length)];
    if (!domandeRandom.includes(domandaRandom)) {
        domandeRandom.push(domandaRandom);
    }
}
console.log(domandeRandom);

/* creazione array risposte random in base a question corrente*/
/* definizione variabile risposta corretta */
/* scrittura nel DOM di domanda ed array risposte random (button) */

window.addEventListener("load", random);

function random() {
    const domandaCorrente = domandeRandom[indexDomandaCorrente];
    const rispostaCorretta = domandaCorrente.correct_answer;
    const allAnswers = domandaCorrente.incorrect_answers.concat(domandaCorrente.correct_answer);
    const risposteRandom = allAnswers.sort(() => 0.5 - Math.random());
    sezioneDomande.innerText = domandaCorrente.question;
    const sezioneButton = document.getElementById("questionPageAnswers");
    sezioneButton.innerHTML = "";

    for (let i = 0; i < risposteRandom.length; i++) {
        const button = document.createElement("button");
        button.setAttribute("class", "answerButton");
        const testoButton = document.createTextNode(risposteRandom[i]);
        button.appendChild(testoButton);
        sezioneButton.appendChild(button);
        button.onclick = function (e) {
            nextQuestion();
            score(e, rispostaCorretta);
        };
    }
}

/* funzione score (invocata nel for della funzione random) per gestione contatore risposte corrette/sbagliate (match/unmatch)) */

function score(event, rispostaCorretta) {
    const rispostaCliccata = event.target.innerText;
    if (rispostaCliccata === rispostaCorretta) {
        match++;
        localStorage.setItem("match", match);
    } else {
        unmatch++;
        localStorage.setItem("unmatch", unmatch);
    }
    console.log(match, unmatch, rispostaCliccata);
}


/* funzione nextQuestion (invocata nel for della funzione random) per gestione passaggi a domanda successiva e resultsPage */

function nextQuestion() {
    if (indexDomandaCorrente < 9) {
        indexDomandaCorrente++;
        contatore++;
        sezioneContatore.innerText = contatore;
        document.getElementById("base-timer-path-remaining").classList.remove(COLOR_CODES.alert.color);
        clearInterval(timerInterval);
        timePassed = 0;
        timeLeft = TIME_LIMIT;
        random();
        startTimer();
    } else {
        localStorage.setItem("match", match);
        localStorage.setItem("unmatch", unmatch);
        window.location.href = 'resultsPage.html';
    }
}