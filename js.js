$(document).ready(function() {
	$("#output").html("<div class='message'><em>Getting games list...</em></div>");
	$.ajax({
		url : "/allgames.xml"
	}).done(function(data) {
		var xmlDoc = data;
		$("#output").html("<div class='message'><em>Games list retrieved successfully.</em></div>");
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
		$("#listAll").removeClass("disabled");
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
		});

		$("#listAll").click(function() {
			//TODO: Some of this doesn't need to be repeated.
			var gamesArray = [];
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

				$(xmlDoc).find("GAME").each(function(i) {
					var name = $(this).find("NAME").text();
					var platform = $(this).find("PLATFORM").text();
					var notes = $(this).find("NOTES").text();
					var $checkbox = $("#" + platform);
					if ($checkbox.is(':checked')) {
						$("#output tbody").append("<tr><td class='name'>" + name + "</td><td class='platform'>" + platform + "</td><td class='notes'>" + notes + "</td></tr>")
					} else {
						//skip
					}
				});
				$("#details").html("Total: " + gamesArray.length + " games.");
			} else {
				$("#output").html("<div class='error'>You have to select at least one platform first you noob!</div>");
			}
		});

	}).fail(function(jqXHR, textStatus) {
		$("#output").html("<div class='error'>Failed to retrieve games list! Error: " + textStatus+"</div>");
	});
});
