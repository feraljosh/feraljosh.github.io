$(document).ready(function() {
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
	$("#suggest").click(function() {
		var gamesArray = [];
		$.ajax({
			url : "/allgames.xml"
		}).done(function(data) {
			
			$(data).find("GAME").each(function(i) {
				var name = $(this).find("NAME").text();
				var platform = $(this).find("PLATFORM").text();
				var game = {
					name : name,
					platform : platform
				};

				var $checkbox = $("#" + platform);
				
				if ($checkbox.is(':checked')) {
					console.log(game);
					gamesArray.push(game);
				} else {
					//skip
				}
			});

			var count = gamesArray.length;
			console.log(count + " games total");
			if (count > 0) {

				var random = gamesArray[Math.floor(Math.random() * gamesArray.length)]

				$("#suggestion").html("You should play <strong>" + random.name + "</strong> (" + random.platform + ")");
			} else {
				$("#suggestion").html("You have to select at least one platform first!");

			}
		}).fail(function(jqXHR, textStatus) {
			alert("Request failed: " + textStatus);
		});

	});
});
