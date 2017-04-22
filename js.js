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
			console.log(data);
			$(data).children().each(function(i) {
				var name = $(this).find("name").text();
				var platform = $(this).find("platform").text();
				var game = {
					name : name,
					platform : platform
				};

				var $checkbox = $("#" + platform);
				if ($checkbox.is(':checked')) {
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
