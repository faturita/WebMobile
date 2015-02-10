var errors = {};
function displayErrors() {
	// initialize variables
	var haveErrors = false;
	// remove the invalid class for all inputs
	$(":input.invalid").removeClass("invalid");
	// iterate through the fields specified in the errors array
	for ( var fieldName in errors) {
		haveErrors = true;
		$("input[name='" + fieldName + "']").addClass("invalid");
	} // for
	// if we have errors, then add a message to the errors div
	$("#errors").html(haveErrors ? "Errors were found." : "").css("display",
			haveErrors ? "block" : "none");
} // displayErrors

$(document).ready(function() {
	$(":input").focus(function(evt) {
		displayFieldErrors(this);
		}).blur(function(evt) {
		$("#errordetail_" + this.id).remove();
		});
	$("#taskentry").bind("submit", function() {
		errors = {
			"task[name]" : [ "Task name is required" ],
			"task[due]" : [ "Due date is invalid" ]
		}; //
			displayErrors();
			return false;
		});
});

function displayFieldErrors(field) {
	var messages = errors[field.name];
	if (messages && (messages.length > 0)) {
		// find an existing error detail section for the field
		var errorDetail = $("#errordetail_" + field.id).get(0);
		// if it doesn't exist, then create it
		if (!errorDetail) {
			$(field).before(
					"<ul class='errors-inline' id='errordetail_" + field.id
							+ "'></ul>");
			errorDetail = $("#errordetail_" + field.id).get(0);
		} // if
		// add the various error messages to the div
		for ( var ii = 0; ii < messages.length; ii++) {
			$(errorDetail).html('').append("<li>" + messages[ii] + "</li>");
		} // for
	} // if
} // displayFieldErrors


