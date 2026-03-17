// CO 3: JavaScript Programming - 30 Question Array
const questionPool = [
    { q: "Which animal is known as the king of the jungle?", a: "Lion", options: ["Lion", "Tiger", "Elephant", "Giraffe"] },
    { q: "What color do you get when you mix blue and yellow?", a: "Green", options: ["Red", "Green", "Purple", "Orange"] },
    { q: "How many days are there in a week?", a: "7", options: ["5", "6", "7", "8"] },
    { q: "Which fruit is yellow and shaped like a crescent?", a: "Banana", options: ["Apple", "Orange", "Banana", "Grapes"] },
    { q: "What do we use to write on a blackboard?", a: "Chalk", options: ["Pen", "Pencil", "Marker", "Chalk"] },
    { q: "Which planet do we live on?", a: "Earth", options: ["Mars", "Jupiter", "Earth", "Venus"] },
    { q: "How many fingers do you have on one hand?", a: "5", options: ["3", "4", "5", "6"] },
    { q: "What do bees make?", a: "Honey", options: ["Milk", "Honey", "Juice", "Water"] },
    { q: "Which animal says 'moo'?", a: "Cow", options: ["Dog", "Cat", "Cow", "Duck"] },
    { q: "What do you use to brush your teeth?", a: "Toothbrush", options: ["Comb", "Toothbrush", "Spoon", "Fork"] },
    { q: "What do fish use to breathe?", a: "Gills", options: ["Lungs", "Gills", "Nose", "Mouth"] },
    { q: "Which of these is a color of the rainbow?", a: "Red", options: ["Brown", "Black", "White", "Red"] },
    { q: "What do you wear on your feet?", a: "Shoes", options: ["Hat", "Gloves", "Shoes", "Scarf"] },
    { q: "Which animal has a very long neck?", a: "Giraffe", options: ["Elephant", "Giraffe", "Zebra", "Lion"] },
    { q: "What do you use to cut paper?", a: "Scissors", options: ["Knife", "Scissors", "Spoon", "Pen"] },
    { q: "Which of these is not a shape?", a: "Rainbow", options: ["Circle", "Square", "Triangle", "Rainbow"] },
    { q: "What do plants need to grow?", a: "Water", options: ["Chocolate", "Toys", "Water", "Books"] },
    { q: "Which of these is a vegetable?", a: "Carrot", options: ["Banana", "Orange", "Carrot", "Mango"] },
    { q: "What do we use to tell time?", a: "Clock", options: ["Telephone", "Television", "Clock", "Radio"] },
    { q: "Which of these animals can fly?", a: "Bird", options: ["Fish", "Dog", "Cat", "Bird"] },
    { q: "What do you use to open a door?", a: "Key", options: ["Key", "Spoon", "Pencil", "Book"] },
    { q: "Which of these is not a weather condition?", a: "Happy", options: ["Rainy", "Sunny", "Windy", "Happy"] },
    { q: "Which of these is not a body part?", a: "Tree", options: ["Arm", "Leg", "Tree", "Nose"] },
    { q: "What do you use to write in a notebook?", a: "Pencil", options: ["Brush", "Pencil", "Fork", "Spoon"] },
    { q: "Which animal says 'meow'?", a: "Cat", options: ["Dog", "Cat", "Cow", "Duck"] },
    { q: "How many sides does a triangle have?", a: "3", options: ["2", "3", "4", "5"] },
    { q: "What do you drink when you're thirsty?", a: "Water", options: ["Sand", "Stone", "Water", "Air"] },
    { q: "Which bird is often associated with wisdom?", a: "Owl", options: ["Crow", "Owl", "Parrot", "Pigeon"] },
    { q: "What is the primary color of a school bus?", a: "Yellow", options: ["Red", "Blue", "Yellow", "Green"] },
    { q: "What do you use to stay dry in the rain?", a: "Umbrella", options: ["Hat", "Umbrella", "Towel", "Gloves"] }
];

// CO 3: State Management Variables
let activeQuestions = [], userAnswers = [];
let currentQ = 0, score = 0, misses = 0, maxMissesAllowed = 0;

// CO 3: Randomization Algorithm
function prepareQuestions() {
    activeQuestions = [...questionPool].sort(() => Math.random() - 0.5).slice(0, 10);
}

// CO 4: DOM Screen Navigation
function startQuiz(limit) {
    maxMissesAllowed = limit;
    score = 0; misses = 0; currentQ = 0; userAnswers = [];
    prepareQuestions();
    
    document.getElementById('score').innerText = score;
    document.getElementById('miss-count').innerText = misses;
    document.getElementById('max-miss').innerText = limit;
    
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('stats-bar').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('review-screen').classList.add('hidden');
    loadQuestion();
}

// CO 4: Dynamic Question Rendering
function loadQuestion() {
    const data = activeQuestions[currentQ];
    document.getElementById('question-text').innerText = `${currentQ + 1}. ${data.q}`;
    const container = document.getElementById('options-container');
    container.innerHTML = ''; 

    data.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, data.a);
        container.appendChild(btn);
    });
}

// CO 5: Algorithmic Check & Data Collection
function checkAnswer(selected, correct) {
    userAnswers.push({ q: activeQuestions[currentQ].q, sel: selected, cor: correct, ok: selected === correct });

    if (selected === correct) { score++; } else { misses++; }
    
    document.getElementById('score').innerText = score;
    document.getElementById('miss-count').innerText = misses;
    currentQ++;

    if (misses >= maxMissesAllowed || currentQ >= 10) { showResults(); } else { loadQuestion(); }
}

// CO 5: Final Evaluation Logic
function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    const passed = (score >= 5 && misses < maxMissesAllowed);
    const title = document.getElementById('result-title');
    title.innerText = passed ? "PASS! 🎉" : "FAIL ❌";
    title.style.color = passed ? "var(--success)" : "var(--danger)";
    document.getElementById('result-summary').innerText = `Score: ${score}/10 | Misses: ${misses}`;
}

// CO 4: DOM Manipulation for Review Screen
function showReview() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('review-screen').classList.remove('hidden');
    const list = document.getElementById('review-list');
    list.innerHTML = userAnswers.map((item, i) => `
        <div class="review-item">
            <p><strong>${i+1}. ${item.q}</strong></p>
            <p class="${item.ok ? 'correct-review' : 'wrong-review'}">Your: ${item.sel} ${item.ok ? '✓' : '✗'}</p>
            ${!item.ok ? `<p style="color:#666">Correct: ${item.cor}</p>` : ''}
        </div>`).join('');
}

function resetToHome() {
    document.getElementById('review-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('stats-bar').classList.add('hidden');
    document.getElementById('setup-screen').classList.remove('hidden');
}