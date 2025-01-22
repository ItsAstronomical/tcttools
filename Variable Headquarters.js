/*
Welcome to Astro's Variable Headquarters
This is a fairly simple function you can add to your mods. It will create a little menu in which the player can view the numbers laid out within the functions.
This is a great way to give the player a little more information about your mod.

Across this code, you will find a lot of aspects you can edit. I have left plenty of comments to help you understand what each part does.
Don't be afraid to ask in #mod-help on the Discord for clarification or help with editing this code.

To use this, place this code below your Code 2, and edit it as needed. You can duplicate the 'let a = document.createElement('p');' section to add more lines of text.

Functions are referenced in text like so: ' + function + '. This will display the number from the function in the text.
Credit to Nina, who made the original code that summoned the new screen (originally for the 1960Red/1952Blue advisor screen)
Go ahead and use this code in your mods - just give me credit. I hope it helps you out!
*/

e=campaignTrail_temp

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

    newButton.innerHTML = 'Campaign Data';

    // Attach the click event listener
    newButton.addEventListener('click', openHeadquarter);

    // Insert the new button next to the reference button
    refButton.insertAdjacentElement('afterend', newButton);
}

function openHeadquarter() {

    /*
    Leaving this in here: instead of having the functions in the text, if you want, you can have the text change based on the number from the function, like so. You'll need to create a secondary function to hold the text, and then call that function in the text. - Astro

    if (policyForeign < -3) {
        fpScore = 'isolationist.'
    }
    if (policyForeign > -3 && policyForeign < 3) {
    fpScore = 'balanced.'
    }
    if (policyForeign > 3) {
         fpScore = 'hawkish.'
    }

    */
      
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
    hqDiv.style.backgroundImage = 'url(https://itsastronomical.com/assets/1912/wilsonbg.png)'; // Set background image. I would recommend using the same file size as the original image, ~959 x 327. Otherwise it will stretch the image. Comment or remove this line of text if you don't want a background image and instead want hqDiv.style.backgroundColor to set your background color
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

    /* This is a header text that you can add if you want to. It is not necessary. - Astro
    let headerText = document.createElement('h3');
    headerText.textContent = 'Chief of Staff - Campaign Info';
    headerText.style.textAlign = 'center';  // Center the text
    headerText.style.flexGrow = '1';  // Make h3 take up the maximum space available
    headerDiv.appendChild(headerText);
    */

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


    questions.parentNode.insertBefore(hqDiv, questions.nextSibling);

    // This is the bulk of the content you can edit. You can add more text or images here.

    // Create Bulk of the Text
    // Duplicate this section to add more lines of text. Make sure to change the variable name "a" to something else. In this case, I changed it to "b".
    let a = document.createElement('p');
    a.textContent = 'Your success rate in the lead up to the 1912 Democratic Convention is ' + primary + '.'; // This is the text that will be displayed. You can change this to whatever you want. ' + function + ' will display the number from the function.
    // a.style.flexGrow = '0.1';  // Make h3 take up the maximum space available
    a.style.color = 'black'; // Can be used to change the color of the text
    a.style.margin = '8px'; // Can be used to change the space in between the text. Useful if you have a lot of functions.
    hqDiv.appendChild(a);

    let b = document.createElement('p');
    b.textContent = '' + bliss + ' opponents have been attacked during the course of the Democratic Primary.';
    // b.style.flexGrow = '0.1';  // Make h3 take up the maximum space available
    b.style.color = 'black';
    b.style.margin = '8px';
    hqDiv.appendChild(b);

    // Image
    let img = document.createElement('img');
    img.src = 'https://itsastronomical.com/assets/1912/wilsonbanner.png';
    img.style.height = '30%';
    img.style.marginLeft = '1em';
    img.style.flexGrow = '0.1';
    img.style.border = '3px solid black';  // Add thin white border to the image
    hqDiv.appendChild(img);
    
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
