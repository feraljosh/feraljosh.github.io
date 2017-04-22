$(document).ready(function() {
	var gamesArray = [];

	$("#output").html("<div class='message'><em>Getting games list...</em></div>");

	$("#selectAll").click(function() {
		$("input[type=checkbox]").each(function() {
			$(this).prop('checked', true)
		});
	});
	$("#selectNone").click(function() {
		$("input[type=checkbox]").each(function() {
			$(this).prop('checked', false)
		});
	});

	//function showWorkingMsg() {
	//console.log('show');
	//$("#workingMsg").show();
	//}

	//function hideWorkingMsg() {
	//console.log('hide');
	//$("#workingMsg").hide();
	//}

	function getList(xmlDoc) {
		var total = 0;
		var platformSelected = false;
		$("input[type=checkbox]").each(function() {
			if ($(this).is(':checked')) {
				platformSelected = true;
			}
		});
		if (platformSelected) {
			$("#details").html("");
			$("#notes").html("");
			$("#output").html("<table><thead><tr><td>Title</td><td>Platform</td><td>Notes</td></tr></thead><tbody></tbody></table>");

			$.each.(gamesArray,
			function() {
				var name = this.name;
				var platform = this.platform;
				var notes = this.notes;
				$("#output tbody").append("<tr><td class='name'>" + name + "</td><td class='platform'>" + platform + "</td><td class='notes'>" + notes + "</td></tr>")
				total++;

			});
			$("#details").html("Total: " + total + " games.");
		} else {
			$("#output").html("<div class='error'>You have to select at least one platform first you noob!</div>");
		}
		//hideWorkingMsg();
	}

	function getSuggestion(xmlDoc) {
		var platformSelected = false;
		$("input[type=checkbox]").each(function() {
			if ($(this).is(':checked')) {
				platformSelected = true;
			}
		});
		if (platformSelected) {
			var random = gamesArray[Math.floor(Math.random() * gamesArray.length)]
			$("#output").html("<div class='suggestion'>You should play <strong>" + random.name + "</strong> (" + random.platform + ")</div>");
			$("#details").html("Suggestion was chosen from a list of " + gamesArray.length + " games.");

			if (random.notes != "") {
				$("#notes").html("Notes: " + random.notes);
			} else {
				$("#notes").html("");
			}
		} else {
			$("#output").html("<div class='error'>You have to select at least one platform first you noob!</div>");
		}
		//hideWorkingMsg();
	}

	function init() {
		$("#output").html("<div class='message'><em>Games list retrieved successfully. Standing by...</em></div>");
		$("#suggest").removeClass("disabled");
		$("#listAll").removeClass("disabled");
		$("#suggest").click(function() {
			//console.log('click');
			//showWorkingMsg();
			getSuggestion();
		});
		$("#listAll").click(function() {
			//console.log('click');
			//showWorkingMsg();
			getList();
		});
	}


	$.ajax({
		url : "/allgames.xml"
	}).done(function(data) {
		$(data).find("GAME").each(function() {
			var name = $(this).find("NAME").text();
			var platform = $(this).find("PLATFORM").text();
			var notes = $(this).find("NOTES").text();
			var game = {
				name : name,
				platform : platform,
				notes : notes
			};
			gamesArray.push(game);
		});
		init();
	}).fail(function(jqXHR, textStatus) {
		$("#output").html("<div class='error'>Failed to retrieve games list! Error: " + textStatus + "</div>");
	});
});
