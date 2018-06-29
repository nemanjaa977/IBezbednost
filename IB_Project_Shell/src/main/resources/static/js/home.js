$(document).ready(function(){
	var row = $('.row');
	var logged = null;
	var nav = $('.navBar');
	
	var token = localStorage.getItem("token");
	console.log(token);
	
	nav.append("<button id='buttonLogOut'><i class='fa fa-angle-double-down'></i> Log out</button>");
	
	$.ajax({
		url: "http://localhost:8443/api/whoami",
		type: 'GET',
		headers: { "Authorization": "Bearer " + token},
		contentType : "application/json",
		success : function(data) {
			console.log(data);
			logged = data;
		},
		error : function(e) {
			logged = null;
			console.log(logged);
			console.log("ERROR: ", e);
		}
	});
	
	$('body').on('click', '#buttonLogOut',function(event){
		localStorage.removeItem("token");
		window.location.replace('index.html');
		
		event.preventDefault();
		return false;
	});
});