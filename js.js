$(document).ready(function() {
	$("#suggestion").html("Getting games list...");
	$.ajax({
		url : "/allgames.xml"
	}).done(function(data) {
		var xmlDoc = data;
		$("#suggestion").html("Games list retrieved. Ready to suggest!");
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
		$("#suggest").removeClass("disabled");
		$("#suggest").click(function() {
			var gamesArray = [];
			var platformSelected = false;
			$("input[type=checkbox]").each(function() {
				if ($(this).is(':checked')) {
					platformSelected = true;
				}
			});
			if (platformSelected) {
				//TODO - can we improve performance by refactoring this?
				$(xmlDoc).find("GAME").each(function(i) {
					var name = $(this).find("NAME").text();
					var platform = $(this).find("PLATFORM").text();
					var notes = $(this).find("NOTES").text();
					var game = {
						name : name,
						platform : platform,
						notes : notes
					};

					var $checkbox = $("#" + platform);

					if ($checkbox.is(':checked')) {
						gamesArray.push(game);
					} else {
						//skip
					}
				});
				var random = gamesArray[Math.floor(Math.random() * gamesArray.length)]
				$("#suggestion").html("You should play <strong>" + random.name + "</strong> (" + random.platform + ")");
				$("#details").html("Suggestion was chosen from a list of " + gamesArray.length + " games.");
								
								
				if(random.notes !=""){
					$("#notes").html("Notes: " + random.notes);
				}else{
					$("#notes").html("");
				}

			} else {
				$("#suggestion").html("You have to select at least one platform first you noob!");
			}
		});
	}).fail(function(jqXHR, textStatus) {
		$("#suggestion").html("Failed to retrieve games list! Error: " + textStatus);
	});
});
