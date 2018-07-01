$(document).ready(function(){
	var row = $('.row');
	var logged;
	var admin=false;
	var nav = $('.navBar');
	
	var token = localStorage.getItem("token");
	console.log(token);
	
	nav.append("<button id='buttonLogOut'><i class='fa fa-angle-double-down'></i> Log out</button>");
	
	$.ajax({
		url: "http://localhost:8443/api/user/whoami",
		type: 'GET',
		headers: { "Authorization": "Bearer " + token},
		contentType : "application/json",
		success : function(data) {
			console.log(data);
			logged = data;
			console.log(logged);	
		},
		error : function(e) {
			admin=true;
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
				row.append("<div class='column'>" + 
	  					"<a id='emailUser' href='#'>"+user.email+"</a><br>" +
	  					"<button id='downloadSertifikat'>download certificate</button><br>" +
	  					"<p></p>"
	  					);
				if(admin == true && user.active == false){
					row.append("<button id='setActiveUser' name='"+user.id+"'>set to active</button>" +
	  				"</div>");
				}else{
					row.append(
	  				"</div>");
				}			
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
	
	$('body').on('click', '#setActiveUser',function(event){
		var emailID = $(this).attr('name');
		console.log("Prosledjeni id: " + emailID);
		$.ajax({
			url: "http://localhost:8443/api/user/edit/"+emailID,
			type: 'PUT',
			headers: { "Authorization": "Bearer " + token},
			contentType : "application/json",
			dataType: 'json',
			success : function(data) {
				$('#setActiveUser').hide();
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});
		
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