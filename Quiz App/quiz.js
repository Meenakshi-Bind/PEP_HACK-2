const quizDB=[
    {
        question:"1. Which feature was already introduced before HTML5?",
        a:"Canvas/SVG",
        b:"Video",
        c:"Geolocation",
        d:" Frames",
        ans:"ans4"
    },
    {
        question:"2. Which tag is used with JavaScript?",
        a:" <canvas>",
        b:"<table>",
        c:"<article>",
        d:"<footer>",
        ans:"ans1"
    },
    {
        question:"3. What application can one create even before the introduction of HTML5?",
        a:"Web applications",
        b:"Mobile applications",
        c:"Forms",
        d:"Browser based games",
        ans:"ans3"
    },
    {
        question:"4.What is the correct syntax of doctype in HTML5?",
        a:" <!doctype html>",
        b:"<doctype html!>",
        c:"<doctype html>",
        d:"</doctype html>",
        ans:"ans1"
    },
    {
        question:"5. What if one does not use the doctype in the starting of HTML document?",
        a:"Browser finds the document in quirky mode",
        b:"Browser finds a document in standard mode",
        c:"Browser stops working",
        d:"Browser crashes after showing the page",
        ans:"ans1"
    }
    
]


const question=document.querySelector('.question');
const option1=document.querySelector('#option1');
const option2=document.querySelector('#option2');
const option3=document.querySelector('#option3');
const option4=document.querySelector('#option4');
const submit=document.querySelector('#submit');
const answers=document.querySelectorAll('.answer');
const showScore=document.querySelector('#showScore');



let score=0;
let questionCount = 0;

const loadQuestion= () => {
    for(let i=0;i<quizDB.length;i++)
    {

      const questionList = quizDB[questionCount];
      question.innerText=questionList.question;
      
      option1.innerText=questionList.a;
      option2.innerText=questionList.b;
      option3.innerText=questionList.c;
      option4.innerText=questionList.d;
    }
}
loadQuestion();

function getCheckAnswer(){
    let answer;
    answers.forEach((curAnsElem) => {
       if(curAnsElem.checked)
       {
           answer=curAnsElem.id;
       }//checked is provided by js
       
    });
    return answer;
}

function deselectAll(){
    answers.forEach((curAnsElem) => curAnsElem.checked=false);
}

submit.addEventListener('click',function(){
    const checkedAnswer = getCheckAnswer();
    console.log(checkedAnswer);
    
    if(checkedAnswer ==  quizDB[questionCount].ans)
    {
        score++;
    };
    questionCount++;
    deselectAll();
    if(questionCount < quizDB.length)
    {
        loadQuestion();
    }
    else{
       showScore.innerHTML=`<h3> you Scored ${score}/${quizDB.length} </h3="btn> 
       <button class="btn" onclick="location.reload()">Play Again</button>`
       showScore.classList.remove('scoreArea');
    }
})