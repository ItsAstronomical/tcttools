// vp switcher
// the code 1 part hides it in the event you just want candidates selected, the code 2 part causes the screen to show up during your code 2
// credit Decstar


// your code 1 should look like this

if (!e.done) {
e.done = true;

// paste the rest of your code 1 here - it has to be wrapped around the "if (!e.done)" line for it to work on the loader

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


z.observe(document, { subtree: true, childList: true });

}

// END OF CODE 1

// now below here is the code 2 stuff - put this below the questions/answers/etc

e=campaignTrail_temp

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

        $("#inner_window_4").remove();
        changeGameDisp(false);
    })
  
  }
  
  e.cyoa = true;

// if you already have a cyoa function, only use 1

  cyoAdventure = (a) => {
          // you can change the condition in which the vpswitcher appears. 
          if (e.question_number == 4) {
        window.setTimeout(e.vpSwitcher, 20)
      }
  }
