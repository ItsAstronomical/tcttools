// Advisor Screen
// This code was made by Nina for 1956Red/1952Blue
// Make sure to credit her!

e=campaignTrail_temp

campaignTrail_temp.advisors = [{
    pk: 5000,
    name: "Advisor 1",
    picture: "https://i.ibb.co/hXhZxnS/Schmidt-cropped.jpg"
},
{
    pk: 5001,
    name: "Advisor 2",
    picture: "https://i.ibb.co/hXhZxnS/Schmidt-cropped.jpg"
},
{
    pk: 5002,
    name: "Boring Advisor",
    picture: "https://i.ibb.co/hXhZxnS/Schmidt-cropped.jpg"
},
{
    pk: 5003,
    name: "Cool Advisor",
    picture: "https://i.ibb.co/hXhZxnS/Schmidt-cropped.jpg"
},
]
campaignTrail_temp.advice = [{
    advisor_pk: 5000,
    question_pk: 327,
    advice: "Do this!"
},
{
    advisor_pk: 5001,
    question_pk: 327,
    advice: "Do that!"
},
{
    advisor_pk: 5002,
    question_pk: 327,
    advice: "Nooo!"
},
{
    advisor_pk: 5003,
    question_pk: 327,
    advice: "Yes!"
},
{
    advisor_pk: 5000,
    question_pk: 328,
    advice: "This is a rather long piece of advice, I really hope it fits into the box and doesn't cause any overflow or lead to scrollbars to appear or anything like that"
},
{
    advisor_pk: 5001,
    question_pk: 328,
    advice: "I concur"
},
{
    advisor_pk: 5002,
    question_pk: 328,
    advice: ""
},
{
    advisor_pk: 5003,
    question_pk: 328,
    advice: "<i>This is italic</i><b>This is bold</b>"
},
]



function addHeadquarterButton() {
    // Check if the button already exists
    if (document.getElementById('headquarter_button')) {
        return;
    }

    // Find the reference button by its ID
    const refButton = document.getElementById('view_electoral_map');
    if (!refButton) {
        return;
    }

    // Create a new button element
    const newButton = document.createElement('button');

    newButton.id = 'headquarter_button';

    newButton.style.marginLeft = '1.5em';

    newButton.innerHTML = 'Advisors';

    // Attach the click event listener
    newButton.addEventListener('click', openHeadquarter);

    // Insert the new button next to the reference button
    refButton.insertAdjacentElement('afterend', newButton);
}

function openHeadquarter() {

    let questions = document.querySelector(".inner_window_question");

    questions.style.display = 'none';

    const hqButton = document.getElementById('headquarter_button');
    if (hqButton) {
        hqButton.remove();
    }

    // Create and set up the headquarters div
    let hqDiv = document.createElement('div');
    hqDiv.id = 'headquarter';
    hqDiv.style.display = 'flex'; // Set layout to flex to allow columns
    hqDiv.style.color = 'white';
    hqDiv.style.backgroundColor = '#383838';
    hqDiv.style.border = '5px solid black';
    hqDiv.style.borderRadius = '10px';
    hqDiv.style.height = '56%';
    hqDiv.style.flexDirection = 'column';
    hqDiv.style.alignItems = 'center';

    // Create header div
    let headerDiv = document.createElement('div');
    headerDiv.style.display = 'flex';
    headerDiv.style.justifyContent = 'space-between';
    headerDiv.style.width = '100%';
    headerDiv.style.alignItems = 'center';

    // Add back button to the header
    let backButton = document.createElement('button');
    backButton.innerText = 'Back';
    backButton.style.margin = '5px'
    backButton.style.backgroundColor = 'grey';
    backButton.onclick = function() {
        // Hide headquarters and show the original content
        hqDiv.remove();
        questions.style.display = '';
    }
    headerDiv.appendChild(backButton);

    // Create h3 element for the header
    let headerText = document.createElement('h2');
    headerText.textContent = 'Advice';
    headerText.style.textAlign = 'center';  // Center the text
    headerText.style.flexGrow = '1';  // Make h3 take up the maximum space available
    headerDiv.appendChild(headerText);


    // Append headerDiv to the main hqDiv
    hqDiv.appendChild(headerDiv);

    // Create a container div for both columns
    let columnsDiv = document.createElement('div');
    columnsDiv.style.display = 'flex';
    columnsDiv.style.width = '100%';

    // Create inner divs for columns
    let leftCol = document.createElement('div');
    leftCol.style.width = '50%';
    columnsDiv.appendChild(leftCol);

    let rightCol = document.createElement('div');
    rightCol.style.width = '50%';
    columnsDiv.appendChild(rightCol);

    // Append columnsDiv to the main hqDiv
    hqDiv.appendChild(columnsDiv);

    var answerPK = document.querySelector('#question_form .game_answers').value;
    var questionPK = campaignTrail_temp.answers_json.find(answer => answer.pk == answerPK).fields.question;
    var advisorPKs = [5000, 5001, 5002, 5003];

    for (let i = 0; i < advisorPKs.length; i++) {
        let advisor = campaignTrail_temp.advisors.find(a => a.pk === advisorPKs[i]);
        let adviceObj = campaignTrail_temp.advice.find(advice => advice.advisor_pk === advisorPKs[i] && advice.question_pk === questionPK);

        let advisorDiv = document.createElement('div');
        advisorDiv.style.height = '8em';
        advisorDiv.style.padding = '1em';
        advisorDiv.style.display = 'flex';
        advisorDiv.style.marginBottom = '1em';

        // Image
        let img = document.createElement('img');
        img.src = advisor.picture;
        img.style.height = '100%';
        img.style.marginRight = '1em';
        img.style.border = '1px solid white';  // Add thin white border to the image
        advisorDiv.appendChild(img);

        // Text
        let textDiv = document.createElement('div');
        textDiv.style.display = 'flex';
        textDiv.style.flexDirection = 'column';
        textDiv.style.justifyContent = 'flex-start';  // Adjust text to start at the top
        textDiv.style.textAlign = 'left';

        let name = document.createElement('span');
        name.innerHTML = `<b>${advisor.name}</b>`;
        textDiv.appendChild(name);

        let advice = document.createElement('span');
        advice.innerHTML = adviceObj.advice;
        textDiv.appendChild(advice);

        advisorDiv.appendChild(textDiv);

        if (i < 2) {
            leftCol.appendChild(advisorDiv);
        } else {
            rightCol.appendChild(advisorDiv);
        }
    }

    questions.parentNode.insertBefore(hqDiv, questions.nextSibling);
}


function handleMutations(mutationsList, observer) {
    if (observerRunning) return;
    observerRunning = true;

    addHeadquarterButton()

    observer.observe(document.documentElement, { childList: true, subtree: true });
    observerRunning = false;
}


let observerRunning = false;

var element = document.getElementById('controlElement');
if (!element) {
	let singleObserver = new MutationObserver(handleMutations);
	singleObserver.observe(document.documentElement, { childList: true, subtree: true });
	var controlElement = document.createElement('div');
	controlElement.style.display = 'none';
	controlElement.id = 'controlElement';
	document.body.appendChild(controlElement);
}
