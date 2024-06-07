// Your code 1 should be wrapped in this
// These magical lines are comments - not code)

e=campaignTrail_temp
if (!e.done) {
e.done = true;

// Paste all of your Code 1 over here.


styling = document.createElement("style");
document.head.appendChild(styling);

styling.innerHTML = `
#opponent_selection_id_back {
    display: none;
}
`

let z = new MutationObserver((mutationsList, observer) => {
    let runningMateSummary = document.querySelector("#running_mate_summary");
    if (runningMateSummary) {
        $("#running_mate_id_button").click();
        observer.disconnect()
    }
});

}

// The rest of this stuff belongs at the bottom of your Code 2
// First you have to set variables for each running mate after the code with your questions/answers/feedback.
var heflin = 0;
var richards = 0;
var daschle = 0;
var hamilton = 0;
var baucus = 0;
var pell = 0;
var feingold = 0;
ans = campaignTrail_temp.player_answers[campaignTrail_temp.player_answers.length - 1]

// If you're mixing and matching CYOA functions, remember - you only need ONE cyoa function. Just put everything inside of one of these
cyoAdventure = function (a) {

  // This sets what number the VP switcher shows up after. Remember, arrays start at 0! So 5 here is after question 6!
  if (e.question_number == 5) {
    window.setTimeout(e.vpSwitcher, 20)
   }

  // Winning parts of the south is a heavy lift, but best to start early, right? We'll press my good relations with Governor Clinton, and really start working on campaigning there. 
  if(ans == 5139){
    heflin += 1;
    richards += 1;                 
  }
  // Party leadership is my biggest obstacle to winning the nomination. We should ease up on the rhetoric, and really work with some of the top figures in the Senate during the next Congress. That'll show them that I'm not going to hurt them.
  if(ans == 5140){
    daschle += 1;  
    hamilton += 1;              
  }
  // We'll use this time to build up my national image - let's paint a picture of a populist, and popular Senator. Let's make sure we spread around footage of me grilling some corporate leaders in upcoming Senate hearings on consumer protection.
  if(ans == 5141){
    baucus += 1;
    feingold += 1;              
  }
  // I need to start pressing the case for a good foreign policy agenda. I'll ask Daschle if he can assign me to to the Senate Foreign Relations Committee for the next two years.
  if(ans == 5142){
    pell += 1;
    hamilton +=1;                 
  }

  // Q4
  // I voted against it because it's not fair to fast track the process for immigrants from some countries and not others. I question why Richards would support this, when she knows there's immigrants from Latin America looking to enter the country. Perhaps it's because they're coming through Texas?
  if(ans == 5147){
    richards -= 2; 
    daschle += 1;
    heflin += 1;                
  }
  // I agreed with the general thrust of the bill, but I believed it should be part of a more broad discussion on immigration reform. I also had some questions about putting caps on a nation-by-nation basis.
  if(ans == 5148){
    hamilton += 1;
    feingold +=1               
  }
  // With all due respect, it's not fair to give Europeans a leg-up in the system, no matter the trouble in that region. I stand by that, and it's clear we need immigration reform as a whole.
  if(ans == 5149){
    pell += 1;
    daschle += 1;
    heflin += 1;               
  }
  // Richards is lying, as usual. My vote, as I explained on the Senate floor, was a mere protest vote against the lack of overall immigration reform. I am glad that the bill passed, but I wanted to draw attention to the other countries with people seeking refuge. 
  if(ans == 5150){
    richards -= 2;
    daschle += 1;                
  }
  // Q5
  // Senator Conrad is my colleague. I know that for all the fiscal talk he makes, he will always back a good farm bill - no matter the price tag. I'll try to get on his good side by supporting as many of his provisions as he needs. 
  if(ans == 5143){
    feingold += 2;                
  }
  // We should probably be open and honest about our intentions. His endorsement would be so valuable, and help us in our quest to get the country back on track after Bush's administration.
  if(ans == 5144){
    heflin += 1;
    richards += 1;
    hamilton += 1;               
  }
  // We need to beat Richards one way or another. I'll offer Conrad serious concessions to get him on board - especially regarding our differentiating fiscal policy. 
  if(ans == 5145){
    daschle += 2;
    baucus += 1;
    heflin += 1;              
  }
  // I'll offer him the position of running mate, or give him influence in the decision making process if he endorses me. I want to show him my goal is to make all of America heard, and leave no area forgotten.
  if(ans == 5146){
    daschle += 2;
    heflin += 1;
    hamilton += 1;                 
  }
  // Q6
  // This is a uniquely rare opportunity to meet with officials and give myself a leg-up on the foreign policy sphere. I will go, as visits like these are to be expected in my capacity as a United States Senator. For every day I am out of the country, I want Begala and Carville to spin this for me.
  if(ans == 5155){
    heflin += 2; 
    pell += 1;
    hamilton += 1;
    daschle += 1;
    richards -= 1;
    baucus -= 1;
    feingold -= 1;                
  }
  // I appreciate the offer, and am happy to visit the continent after the primary season - but I can see the primary polling clear as day. This debate is crucial to securing our chances - and we need to go on the defense, specifically in the upcoming primaries.
  if(ans == 5156){
    heflin += 2;
    richards += 1;
    baucus += 1;
    feingold += 1;
    pell -= 1;
    hamilton -= 1;
    daschle -= 1;                 
  }

// The actual setting of the running mates
if((ans == 5155 || ans == 5156 ) && richards >= 2){
    ctsAchievement("'That Woman'");
    console.log("Richards, 211");  
    campaignTrail_temp.running_mate_json.push({
      "model":"campaign_trail.running_mate",
      "pk": 1,
      "fields" : {
          "candidate": 201,
          "running_mate": 211
       }
   }
  )
}

if((ans == 5155 || ans == 5156 ) && baucus >= 2){
  ctsAchievement("Big Sky Country's Candidate");
  console.log("Baucus, 219");  
  campaignTrail_temp.running_mate_json.push({
    "model":"campaign_trail.running_mate",
    "pk": 2,
    "fields" : {
        "candidate": 201,
        "running_mate": 219
     }
 }
)
}

if((ans == 5155 || ans == 5156 ) && heflin < 2){
  ctsAchievement("Judge");
  console.log("Heflin, 209");  
  campaignTrail_temp.running_mate_json.push({
    "model":"campaign_trail.running_mate",
    "pk": 3,
    "fields" : {
        "candidate": 201,
        "running_mate": 209
     }
 }
)
}

if((ans == 5155 || ans == 5156 ) && hamilton >= 2){
  ctsAchievement("How Congress Works");
  console.log("Hamilton, 220");  
  campaignTrail_temp.running_mate_json.push({
    "model":"campaign_trail.running_mate",
    "pk": 4,
    "fields" : {
        "candidate": 201,
        "running_mate": 220
     }
 }
)
}

if((ans == 5155 || ans == 5156 ) && daschle >= 2){
  ctsAchievement("True Leadership");
  console.log("Daschle, 213");  
  campaignTrail_temp.running_mate_json.push({
    "model":"campaign_trail.running_mate",
    "pk": 5,
    "fields" : {
        "candidate": 201,
        "running_mate": 213
     }
 }
)
}

if((ans == 5155 || ans == 5156 ) && pell >= 2){
  ctsAchievement("Extra-Pell-estrial");
  console.log("Pell, 221");  
  campaignTrail_temp.running_mate_json.push({
    "model":"campaign_trail.running_mate",
    "pk": 6,
    "fields" : {
        "candidate": 201,
        "running_mate": 221
     }
 }
)
}

if((ans == 5155 || ans == 5156 ) && feingold >= 2){
  ctsAchievement("New Camelot");
  console.log("Feingold, 222");  
  campaignTrail_temp.running_mate_json.push({
    "model":"campaign_trail.running_mate",
    "pk": 7,
    "fields" : {
        "candidate": 201,
        "running_mate": 222
     }
 }
)
}
  
}

var changeGameDisp = (hide) => {
    disp = "";
    if (hide) {
      disp = "none";
    }
    Array.from(gameWindow.children).forEach(f=>{
        if(!f.classList.contains("game_header") && (f.id != "main_content_area" || !$("#campaign_sign")[0])) 
            f.style.display = disp
    });
};

e.vpSwitcher = () => {
    let potential_running_mate_pks = e.running_mate_json.filter(f=>f.fields.candidate == e.candidate_id).map(f=>f.fields.running_mate);
    let pot_run_mat = potential_running_mate_pks.map(f=>e.candidate_json.find(_f=>_f.pk===f));
    let running_mate_options = ``;
    pot_run_mat.forEach(f=> {
        running_mate_options += `<option value="${f.pk}">${f.fields.first_name} ${f.fields.last_name}</option>\n`
    });
  
    let vp_html = `
        <div id="running_mate_form">
            <form name="running mate">
                <p></p>
                <h3>Please select your running mate:</h3> 
                <select name="running_mate_id" id="running_mate_id">
                    ${running_mate_options}
                </select>
                <p></p>
            </form>
        </div>
        <div class="person_description_window" id="running_mate_description_window">
            <div class="person_image" id="running_mate_image"> <img src="${pot_run_mat[0].fields.image_url}" width="210" height="250"> </div>
            <div class="person_summary" id="running_mate_summary">
                <ul>
                    <li>Name: ${pot_run_mat[0].fields.first_name} ${pot_run_mat[0].fields.last_name}</li>
                    <li>Party: ${pot_run_mat[0].fields.party}</li>
                    <li>Home State: ${pot_run_mat[0].fields.state}</li>
                </ul>
                ${pot_run_mat[0].fields.description_as_running_mate}
            </div>
        </div>
        <p> <button class="person_button" id="running_mate_id_button">Continue</button> </p>
    `
  
    let vp_screen = document.createElement("div");
    vp_screen.classList.add("inner_window_w_desc");
    vp_screen.id = "inner_window_4";
    vp_screen.innerHTML = vp_html;
  
    changeGameDisp(true);
  
    gameWindow.appendChild(vp_screen);
  
    // now we make the stuff do stuff!
  
    $("#running_mate_id").change((_e)=>{
        _e.preventDefault()
  
        let value = Number($("#running_mate_id").val());
        let i = potential_running_mate_pks.findIndex(f=>f === value);
  
        let screen_html = `
            <div class="person_image" id="running_mate_image"> <img src="${pot_run_mat[i].fields.image_url}" width="210" height="250"> </div>
            <div class="person_summary" id="running_mate_summary">
                <ul>
                    <li>Name: ${pot_run_mat[i].fields.first_name} ${pot_run_mat[i].fields.last_name}</li>
                    <li>Party: ${pot_run_mat[i].fields.party}</li>
                    <li>Home State: ${pot_run_mat[i].fields.state}</li>
                </ul>
                ${pot_run_mat[i].fields.description_as_running_mate}
            </div>
        `
  
        $("#running_mate_description_window").html(screen_html);
  
    });
    // VP selected!
  
    $("#running_mate_id_button").click((_e)=>{
        _e.preventDefault();
  
        let value = Number($("#running_mate_id").val());
        let i = potential_running_mate_pks.findIndex(f=>f === value);
  
        e.running_mate_last_name = pot_run_mat[i].fields.last_name;
        e.running_mate_image_url = pot_run_mat[i].fields.image_url;
        e.selected_running_mate = pot_run_mat[i];
  
        if ($("#campaign_sign")[0]) {
            $("#campaign_sign").html(`<p>${e.candidate_last_name}</p><p>${e.running_mate_last_name}</p>`);
            $("#running_mate_pic").attr("src", e.running_mate_image_url)
        }
        if(e.running_mate_last_name==="Richards"){
          console.log(campaignTrail_temp.questions_json[7])
          campaignTrail_temp.questions_json[7] = {
            "model": "campaign_trail.question",
            "pk": 21176,
            "fields": {
              "priority": 1,
              "description": "You've gone ahead and picked Texas Governor Ann Richards, one of your primary opponents, to be your running mate. As she begins to pen her acceptance speech for Vice President, what should she focus on, and how will you justify her nomination? How much time will you invest into winning Texas?",
              "likelihood": 1
            }
          }
          }
        
          if(e.running_mate_last_name==="Baucus"){
            console.log(campaignTrail_temp.questions_json[7])
            campaignTrail_temp.questions_json[7] = {
              "model": "campaign_trail.question",
              "pk": 21222,
              "fields": {
                "priority": 1,
                "description": "As you announce your selection of Senator Max Baucus of Montana to be your running mate, reports have one perhaps huge question - 'How will you two work together despite such differing healthcare views?'<br>As a Senator, Baucus has taken a conservative stance on healthcare - and has ties to the Healthcare industry. Can you justify the selection of Baucus?",
                "likelihood": 1
              }
            }
        }
          
          if(e.running_mate_last_name==="Hamilton"){
            console.log(campaignTrail_temp.questions_json[7])
            campaignTrail_temp.questions_json[7] = {
              "model": "campaign_trail.question",
              "pk": 21207,
              "fields": {
                "priority": 1,
                "description": "You've selected Lee Hamilton - a House Representative from Indiana who has been key on foreign policy - to be your running mate. Controversially, he declined to investigate Reagan or Bush during the Iran-Contra Affair. How will you justify his place on the ticket, especially to disaffected liberals?",
                "likelihood": 1
              }
            }
          }
        
          if(e.running_mate_last_name==="Daschle"){
            console.log(campaignTrail_temp.questions_json[7])
            campaignTrail_temp.questions_json[7] = {
              "model": "campaign_trail.question",
              "pk": 21191,
              "fields": {
                "priority": 1,
                "description": "You've selected Senate Majority Leader and South Dakota Senator Tom Daschle as your running mate - pundits say it was because he bailed you out by endorsing your bid, even after a string of losses. Can you explain the rationale behind your decision to reporters?",
                "likelihood": 1
              }
            }
          }
        
          if(e.running_mate_last_name==="Pell"){
            console.log(campaignTrail_temp.questions_json[7])
            campaignTrail_temp.questions_json[7] = {
              "model": "campaign_trail.question",
              "pk": 21299,
              "fields": {
                "priority": 1,
                "description": "You've selected the Chair of the Senate Foreign Relations Committee, Claiborne Pell, as your running mate. Both you and Pell are rather old, and it's becoming clear that he'll only be serving one term if elected. How will you justify his selection, and will you make a similar pledge?",
                "likelihood": 1
              }
            }
          }
        
          if(e.running_mate_last_name==="Feingold"){
            console.log(campaignTrail_temp.questions_json[7])
            campaignTrail_temp.questions_json[7] = {
              "model": "campaign_trail.question",
              "pk": 21312,
              "fields": {
                "priority": 1,
                "description": "Unexpectedly, you've selected Wisconsin Senator Russ Feingold to be your running mate. Some party leaders balk at the idea, but you have to sell it to the American people. Why did you pick Feingold as your running mate? What influence will he have in your campaign and your administration?",
                "likelihood": 1
              }
            }
          }
  
        $("#inner_window_4").remove();
        changeGameDisp(false);
    })
}
