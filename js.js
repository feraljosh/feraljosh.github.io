$(document).ready(function() {

	//https://docs.google.com/spreadsheets/d/1uELdREN_R8thoKZOqJMhgC4hiFOUkcEkb8GJTwhNVaU/edit?usp=sharing

	function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {

			// Check if the XMLHttpRequest object has a "withCredentials" property.
			// "withCredentials" only exists on XMLHTTPRequest2 objects.
			xhr.open(method, url, true);

		} else if ( typeof XDomainRequest != "undefined") {

			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
			xhr = new XDomainRequest();
			xhr.open(method, url);

		} else {

			// Otherwise, CORS is not supported by the browser.
			xhr = null;

		}
		return xhr;
	}

	var xhr = createCORSRequest('GET', url);
	if (!xhr) {
		throw new Error('CORS not supported');
	}

	// ID of the Google Spreadsheet
	var spreadsheetID = "1uELdREN_R8thoKZOqJMhgC4hiFOUkcEkb8GJTwhNVaU";

	// Make sure it is public or set to Anyone with link can view
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

	$.getJSON(url, function(data) {

		var entry = data.feed.entry;

		$(entry).each(function() {
			// Column names are name, age, etc.
			$('.results').prepend('<h2>' + this.gsx$name.$t + '</h2><p>' + this.gsx$age.$t + '</p>');
		});

	});

	/*
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

	 $.each(gamesArray, function() {
	 var name = this.name;
	 var platform = this.platform;
	 var notes = this.notes;
	 if ($("#" + platform).is(':checked')) {
	 $("#output tbody").append("<tr><td class='name'>" + name + "</td><td class='platform'>" + platform + "</td><td class='notes'>" + notes + "</td></tr>")
	 total++;
	 }
	 });
	 $("#details").html("Total: " + total + " games.");
	 } else {
	 $("#output").html("<div class='error'>You have to select at least one platform first you noob!</div>");
	 }
	 }

	 function getSuggestion(xmlDoc) {
	 //TODO; move out into single function. Possibly update whenever a checkbox changes, for performance.
	 var platformSelected = false;
	 $("input[type=checkbox]").each(function() {
	 if ($(this).is(':checked')) {
	 platformSelected = true;
	 }
	 });
	 if (platformSelected) {
	 //same thing - perhaps this subarray can be updated whenever a checkbox changes.
	 var subArray = [];
	 $.each(gamesArray, function() {
	 if ($("#" + this.platform).is(':checked')) {
	 subArray.push(this);
	 }
	 });

	 var random = subArray[Math.floor(Math.random() * subArray.length)];

	 $("#output").html("<div class='suggestion'>You should play <strong>" + random.name + "</strong> (" + random.platform + ")</div>");
	 $("#details").html("Suggestion was chosen from a list of " + subArray.length + " games.");

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
	 */
});
