// First Past the Post Allocation System
// You MUST credit AeronauticBlueberry if you use this in your mod.
// Put this in your Code 2
// At the start of the endingPicker fuction for ending codes, put distributeSeatsUK(); at the top
// The true seat count will not show up when you do "Estimated Seat Count", as it's calculated at the end
// For my 2024UK mod, I set the variable "votes_per_seat" to 1.35 to better reward the winner, but feel free to adjust it.

// The two Helper functions allow you to set the minimum % of the vote needed to clear the threshold to get seats, while the other one puts guranteed seats in (such as the Speaker's seat).

// For UK mod
	distributeSeatsUK = () => {
		//Only let this function run once per game.
		e.distributedseats;
		if (e.distributedseats === 1) {return;}
		e.distributedseats = 1;

		// Helper functions
		function get_state_threshold(state) {
			// input: state id of current state
			// output: float between 0.0 and 1.0, determining the minimum
			// percent to pass the states' threshold
			//if (state == 475) {return 0.1}
			//if (state == 460) {return 0}
			return 0.3;
		}

		function get_guarenteed_seats(state, c) {
			// input: state id and candidate id
			// output: int, number of seats c is guarenteed in state
			//if (state == 466 && c == 80) {return 2}
			//if (state == 460 && c == 80) {return 20}
			return 0;
		}

		// zero out national seat counts
		for(var ci = 0; ci < e.final_overall_results.length; ci++) {
			e.final_overall_results[ci].electoral_votes = 0;
		}

		//loop over each state's results
		for(var i = 0; i < e.final_state_results.length; i++) {
			var state = e.final_state_results[i].state;
			
			// Store the index of the state in the final_state_results array.
			var fsrIndex = e.final_state_results.map(f=>f.state).indexOf(state);
			
			// Store a read only copy of the state's results (for convenience)
			var stateData = e.final_state_results[fsrIndex];

			// Get the state's total popular votes and seats.
			var tot_state_votes = e.states_json[e.states_json.map(f=>f.pk).indexOf(state)].fields.popular_votes;
			var seats_left = e.states_json[e.states_json.map(f=>f.pk).indexOf(state)].fields.electoral_votes;
			
			// Begin tracking how many votes are actually competitive.
			var competitivevotes = 0;

			// First loop over each party in state
			for(var j = 0; j < stateData.result.length; j++) {
				var c = stateData.result[j].candidate;

				// Zero out seats in that state
				e.final_state_results[fsrIndex].result[j].electoral_votes = 0;

				// Count the candidate's votes if and only if they pass the state threshold
				var cur_c_votes = stateData.result[j].votes * 1.0;
				var cur_c_to_totvotes = cur_c_votes / tot_state_votes
				if (cur_c_to_totvotes >= get_state_threshold(state)) {
					competitivevotes += cur_c_votes
				}

				// Add guarenteed seats to minor parties (greens?)
				var guarenteed_seats = get_guarenteed_seats(state, c)
				if (guarenteed_seats > 0) {
					seats_left -= guarenteed_seats

					// Give the party those seats in that state.
					e.final_state_results[fsrIndex].result[j].electoral_votes += guarenteed_seats;

					// Then add the seats to the national total.
					e.final_overall_results[e.final_overall_results.map(f=>f.candidate).indexOf(c)].electoral_votes += guarenteed_seats;
				
				}

			}

			var votes_per_seat = (competitivevotes * 1.0) / seats_left

			// Second loop: Actually add seats
			for(var j = 0; j < stateData.result.length; j++) {
				// Calculate what percent of the seats should be won.
				var c = stateData.result[j].candidate;
				var cur_c_votes = stateData.result[j].votes;
				var seats = Math.floor(cur_c_votes * 1.0 / votes_per_seat)

				// Calculate your percent of votes.
				var cur_c_votes = stateData.result[j].votes * 1.0;
				var cur_c_to_totvotes = cur_c_votes / tot_state_votes

				// Add seats if there are any to add and you meet the threshold
				if (seats > 0 && cur_c_to_totvotes >= get_state_threshold(state)) {
					seats_left -= seats;

					e.final_state_results[fsrIndex].result[j].electoral_votes += seats;
					e.final_overall_results[e.final_overall_results.map(f=>f.candidate).indexOf(c)].electoral_votes += seats;
				}
			}

			// Give any remaining seats to first place. simulate FPTP biasing towards first
			if (seats_left > 0) {
				var c = stateData.result[0].candidate;
				e.final_state_results[fsrIndex].result[0].electoral_votes += seats_left;
				e.final_overall_results[e.final_overall_results.map(f=>f.candidate).indexOf(c)].electoral_votes += seats_left;
			}
		}

	}
