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
	
	$.ajax({
		url: "http://localhost:8443/api/user/all",
		type: 'GET',
		headers: { "Authorization": "Bearer " + token},
		contentType : "application/json",
		success : function(data) {
			for(var i=0; i<data.length; i++){
				user = data[i];
				row.append("<div class='column'> " + 
	  					"<a id='emailUser' href='#'>"+user.email+"</a>" +
	  				"</div>");
			}
		},
		error : function(e) {
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

function f(){
	var input = $('#search').val().toUpperCase();
	$(".column").each(function(){
		  if($(this).html().toUpperCase().includes(input)){
		    $(this).show();
		  }
		  else{
			$(this).hide();
		  }
	});
}