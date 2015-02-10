
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var fetch = function() {
	// Get the page and list we need to work with
	var $page = $("#forget-my-password");
	
	// Build the URL we need using the data stored on the main view page
	var strUrl = "/WebMobile/rest/authenticate/fetch?";
	strUrl += "username=" + $("#username").val();
	
	// Get the tweets and append them to the list
	$.ajax({
		url: strUrl,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			
			//$.mobile.pageLoading(true);
			//$.mobile.changePage( "#userdata", { transition: "slideup"} );
		
			$page.find('#securityquestion').attr('value', data.securityquestion);
			
			// Build HTML that contains the desired information
			var strHtml = '<p>Object retrieved ' + JSON.stringify(data, null) + ' </p>';
			$page.append(strHtml);
		},
		error: function() {
			alert("An error occurred. Please try again. ");
		}
	});
};


var passwordRecovery = function() {
	// Get the page and list we need to work with
	var $page = $("#forget-my-password");
	
	// Build the URL we need using the data stored on the main view page
	var strUrl = "/WebMobile/rest/authenticate/recovery";
	
	var dataObject = "";
	dataObject += "username=" + $("#username").val();
	dataObject += "&";
	dataObject += "securityresponse=" + $page.find('$securityresponse').val() ;
	
	// Get the tweets and append them to the list
	$.ajax({
		url: strUrl,
		data: dataObject,
		dataType: 'json',
		type: 'POST',
		success: function(data) {
			
			//$.mobile.pageLoading(true);
			$.mobile.changePage( "#reset-password", { transition: "slideup"} );
		},
		error: function() {
			alert("An error occurred. Please try again. ");
		}
	});
};

var saveData = function() {
	
	// Get the page and list we need to work with
	var $page = $("#userdata");
	
	// Build the URL we need using the data stored on the main view page
	var strUrl = "/WebMobile/rest/authenticate/save";
	//var strUrl = "http://192.168.11.21:8080/WebMobile/Auth/info.json?";
	
	var dataObject = '';
	
	dataObject += "username=" + $("#username").val();
	dataObject += "&";
	dataObject += "surname=" + $("#surname").val();
	dataObject += "&";
	dataObject += "securityquestion=" + $("securityquestion").val();
	dataObject += "&";
	dataObject += "securityresponse=" + $("securityresponse").val();
	
	// Get the tweets and append them to the list
	$.ajax({
		url: strUrl,
		data: dataObject,
		dataType: 'json',
		type: 'POST',
		success: function(data) {
			
			//$.mobile.pageLoading(true);
			alert('Data saved');
			
		},
		error: function() {
			alert("An error occurred. Please try again. ");
		}
	});	
};

var resetPassword = function() {
	var $page = $("reset-password");
	
	var strUrl = "/WebMobile/rest/authenticate/reset";
	
	var dataObject = '';
	
	dataObject += "username=" + $("#username").val();
	dataObject += "&";
	dataObject += "newpassword1=" + $("newpassword1").val();
	dataObject += "&";
	dataObject += "newpassword2=" + $("newpassword2").val();
	
	// Update
	$.ajax({
		url: strUrl,
		data: dataObject,
		dataType: 'json',
		type: 'POST',
		success: function(data) {

			alert('Password changed correctly.');
			
			//$.mobile.pageLoading(true);
			$.mobile.changePage( "#login", { transition: "slideup"} );
			
		},
		error: function() {
			alert("An error occurred. Please try again. ");
		}
	});
}
var changePassword = function() {
	
	var $page = $("#change-password");
	
	var strUrl = "/WebMobile/rest/authenticate/change";
	
	var dataObject = '';
	
	dataObject += "username=" + $("#username").val();
	dataObject += "&";
	dataObject += "password=" + $("#password").val();
	dataObject += "&";
	dataObject += "newpassword1=" + $("newpassword1").val();
	dataObject += "&";
	dataObject += "newpassword2=" + $("newpassword2").val();
	
	// Update
	$.ajax({
		url: strUrl,
		data: dataObject,
		dataType: 'json',
		type: 'PUT',
		success: function(data) {
			

			
			//$.mobile.pageLoading(true);
			$.mobile.changePage( "#login", { transition: "slideup"} );
			
		},
		error: function() {
			alert("An error occurred. Please try again. ");
		}
	});
};

var login = function() {
	// Get the page and list we need to work with
	var $page = $("#login");
	
	// Build the URL we need using the data stored on the main view page
	var strUrl = "/WebMobile/rest/authenticate/check";
	//var strUrl = "http://192.168.11.21:8080/WebMobile/Auth/info.json?";
	
	var data = "username="+$("#username").val()+"&"+"password="+$("#password").val()+"";
	
	// Get the tweets and append them to the list
	$.ajax({
		url: strUrl,
		data: data,
		dataType: 'json',
		type: 'POST',
		success: function(data) {
			
			// Build HTML that contains the desired information
			var strHtml = '<p>Login Successful ' + JSON.stringify(data, null) + ' </p>';
			$page.append(strHtml);
			
			//$.mobile.pageLoading(true);
			
			if (data.username != 'notauthenticated')
			{
				$.mobile.changePage( "#userdata", { transition: "slideup"} );
			}
			
		},
		error: function() {
			alert("An error occurred. Please try again. ");
		}
	});
};



(function($) {
	var methods = {
		initMainPage : function() {
		},
		initDetailPage : function() {

			var $page = $("#login");

			
			$("#submit").click(function() {
				login();
			});
			
			$("#save").click(function() {
				saveData();
			});
			
			$("#change-password-button").click(function() {
				changePassword();
			});
			
			$("#fetch").click(function() {
				fetch();
			});
			
			$("password-recovery").click(function() {
				passwordRecovery();
			});
			
			$("reset-password-button").click(function() {
				resetPassword();
			});
			
			alert('initialized');
		},
		initSettingsPage : function() {
		},
		initAll : function() {
			$().initApp("initMainPage");
			$().initApp("initDetailPage");
			$().initApp("initSettingsPage");
		}
	};
	
	alert( $.fn );
	
	$.fn.initApp = function(method) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this,
					Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.initAll.apply( this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist' );
		}
	};
})(jQuery);


$(document).ready(function() {
	jQuery.fn.initApp();
});
