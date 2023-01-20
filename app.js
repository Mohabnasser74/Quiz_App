// ELement select: 
let body = document.querySelector("body");
let quizBox = document.querySelector(".quiz-box");
let count = document.querySelectorAll(".count");
let questions = document.querySelector(".questions");
let answer = document.querySelector(".answer");
let seconds = document.querySelector(".seconds");
let h1 = document.createElement("h1");
let button = document.querySelector("button");
let containQuestions = document.querySelector(".contain-questions");
let countdown = document.querySelector(".countdown");
let numberOfQuestion = document.querySelector(".number-of-question");


// create rustle Quiz:
let rustle = document.createElement("div");
rustle.className = "rustle";
//
let review = document.createElement("span");
review.classList.add("review");
rustle.appendChild(review);
//
let comma = document.createElement("span");
let commaText = document.createTextNode(", ");
comma.appendChild(commaText);
rustle.appendChild(comma);
//
let True = document.createElement("span");
True.className = "true";
let trueText = document.createTextNode("0");
True.appendChild(trueText);
rustle.appendChild(True);
//
let form = document.createElement("span");
let formText = document.createTextNode(" Form");
form.appendChild(formText);
rustle.appendChild(form);
//

// everything: 
let index = 0;
// 

// Start my Request: 
const myRequest = new XMLHttpRequest();

myRequest.open("GET", "questions.json");
myRequest.send();

myRequest.onload = function () {
// get the response text: 
    if (this.readyState === 4 && this.status === 200) {
        let jsonObject = JSON.parse(this.responseText);
// Questions Count: 
        count.forEach((e) => {
            let countText = document.createTextNode(`${jsonObject.length}`)
            e.appendChild(countText);
        });
//default question Title: 
    let questionsTitle = document.createTextNode(`${jsonObject[index]["title"]} ?`);
    h1.appendChild(questionsTitle);
    questions.appendChild(h1);
// function change Questions in loop: 
    function changeQuestions() {
        let questionsTitle = document.createTextNode(`${jsonObject[index]["title"]} ?`);
        h1.appendChild(questionsTitle);
        questions.appendChild(h1);
    };

// #################################################################### //
// answer content:
answerContent();
function  answerContent() {
    for (let i = 1; i <= 4; i++) {

        let div = document.createElement("div");
    
        let input = document.createElement("input");
        input.setAttribute("type" , "radio");
        input.setAttribute("name" , "radio");
        input.setAttribute("id" , `check-${i}`);
        input.setAttribute("data-answer" , `${jsonObject[index][`answer_${i}`]}`);
        input.classList.add(`input_${i}`)
        div.appendChild(input);
    
    if (input.classList.contains("input_1")) {
        input.setAttribute("checked","")
        }
    
        let label = document.createElement("label");
        label.setAttribute("for" , `check-${i}`);
        let labelText = document.createTextNode(`${jsonObject[index][`answer_${i}`]}`);
        label.appendChild(labelText)
        label.classList.add(`label_${i}`)
        div.appendChild(label);
    
        if (label.classList.contains("label_1")) {
            label.classList.add("active");
            }
    
        answer.appendChild(div);
    
    // #################################################################### //
    
                // checked answer: 
        // input
        input.addEventListener("click", inputEvent)
        function inputEvent() {
            let allInputs = document.querySelectorAll(".contain-questions input");
            allInputs.forEach((e) => {
                e.removeAttribute("checked");
            })
            input.setAttribute("checked","");
            // label
            let allLabels = document.querySelectorAll(".contain-questions label");
            allLabels.forEach((e) => {
                e.classList.remove("active");
            })
            label.classList.add("active")
        }; // function for (input || label) event.
    }
};

// #################################################################### //
    let timeQuestions = setInterval(time, 1000);

function time() {
    seconds.innerHTML--;
    if (seconds.innerHTML === '-1') {
        seconds.innerHTML = "5";
    }

    //checked answer: 
    if (seconds.innerHTML === "0") {
        
        let answerInput= document.querySelectorAll(".answer div input");
        answerInput.forEach((e) => {
            if (e.checked) {
                if (e.dataset["answer"] === jsonObject[index]["right_answer"]) { 
                    True.innerHTML++;
                }
            }
        })

        h1.innerHTML = "";
        if (index !== (jsonObject.length - 1)) {
            index++;
        } else {
            rustleReviewCode();
        }
        numberOfQuestion.innerHTML = `${index + 1}`
        changeQuestions();
        //
        let answerDiv = document.querySelectorAll(".answer div");
        answerDiv.forEach((e) => {
            e.remove();
        })
        answerContent();
    }
    
    if (seconds.innerHTML === "0") {
        button.removeEventListener("click", buttonClick);
    } else {
        button.addEventListener("click", buttonClick);
    }
};

// #################################################################### //
    // checked answer: 
    function buttonClick() {

        let answerInput = document.querySelectorAll(".answer div input");
        answerInput.forEach((e) => {
            if (e.checked) {
                if (e.dataset["answer"] === jsonObject[index]["right_answer"]) { 
                    True.innerHTML++;
                }
            }
        })

    h1.innerHTML = "";

    if (index !== (jsonObject.length - 1)) {
        index++;
    } else {
        rustleReviewCode();
    }
    

    numberOfQuestion.innerHTML = `${index + 1}`

    changeQuestions();

    let answerDiv = document.querySelectorAll(".answer div");
        answerDiv.forEach((e) => {
            e.remove();
            })

    answerContent();

    seconds.innerHTML = "5";
};

// #################################################################### //
// rustle_Review_Code: 
    function rustleReviewCode() {
        // count in Rustle: 
        let countRustle = document.createElement("span");
        countRustle.className = "count";
        let countRustleText = document.createTextNode(` ${jsonObject.length}`);
        countRustle.appendChild(countRustleText);
        rustle.appendChild(countRustle);
        quizBox.appendChild(rustle);
        // clearInterval_(timeQuestions): 
        clearInterval(timeQuestions);
        // Appreciation: 
            if (True.innerHTML === "5" || True.innerHTML === "6" || True.innerHTML === "7") {
                Good();
            } else if (True.innerHTML === "8" || True.innerHTML === "9") {
                Perfect();
            } else if (True.innerHTML !== "5" || True.innerHTML > "5") {
                Bad();
            } ;
            //show rustles:
            showRustles();
    }

// #################################################################### //
// keyboard event (Enter): 

function enterEvent(event) {
    const keyName = event.key;
    if (keyName === 'Enter') {
        let answerInput = document.querySelectorAll(".answer div input");
        answerInput.forEach((e) => {
            if (e.checked) {
                if (e.dataset["answer"] === jsonObject[index]["right_answer"]) { 
                    True.innerHTML++;
                }
            }
        })
    
    h1.innerHTML = "";

    if (index !== (jsonObject.length - 1)) {
        index++;
    } else {
        rustleReviewCode();
        document.removeEventListener("keydown", enterEvent);
    }

    numberOfQuestion.innerHTML = `${index + 1}`

    changeQuestions();

    let answerDiv = document.querySelectorAll(".answer div");
        answerDiv.forEach((e) => {
            e.remove();
            })

    answerContent();

    seconds.innerHTML = "5";
    }
}

if (index !== 8) {
    document.addEventListener('keydown', enterEvent);
}

// #################################################################### //
// An error occurred in the server
} else {
    body.style.backgroundColor = "#2d2d2d";
    quizBox.remove();
    let errorDiv = document.createElement("div");
    errorDiv.classList.add("error")
    body.appendChild(errorDiv);
    let img = document.createElement("img");
    img.setAttribute("src", "./Img/download.png");
    img.setAttribute("alt", "Server problem");
    errorDiv.appendChild(img);
    let infoErr = document.createElement("h1");
    let infoErrText =  document.createTextNode("Hmmm… can't reach this page");
    errorDiv.appendChild(infoErr);
    infoErr.appendChild(infoErrText);
    let infoErr1 = document.createElement("p");
    let infoErrText1 =  document.createTextNode(`"(${this.status}) ${this.statusText}"`);
    errorDiv.appendChild(infoErr1);
    infoErr1.appendChild(infoErrText1);
}

// #################################################################### //
// functions of show Rustles
function showRustles() {
    containQuestions.remove();
    button.remove();
    countdown.remove();
};

function Good() {
    review.style.color = "#009688";
    let reviewText = document.createTextNode("Good");
    review.appendChild(reviewText);
    rustle.prepend(review);
};

function Perfect() {
    review.style.color = "#0075ff";
    let reviewText = document.createTextNode("Perfect");
    review.appendChild(reviewText);
    rustle.prepend(review);
};

function Bad() {
    review.style.color = "red";
    let reviewText = document.createTextNode("Bad");
    review.appendChild(reviewText);
    rustle.prepend(review);
};



} // end my Request.

