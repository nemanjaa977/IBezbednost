$(document).ready(function(){
	var row = $('.row');
	var logged;
	var admin=false;
	var nav = $('.navBar');
	
	var token = localStorage.getItem("token");
	console.log(token);
	
	nav.append("<button id='buttonLogOut'><i class='fa fa-angle-double-down'></i> Log out</button>");
	
	$.ajax({
		url: "https://localhost:8443/api/user/whoami",
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
		url: "https://localhost:8443/api/user/all",
		type: 'GET',
		headers: { "Authorization": "Bearer " + token},
		contentType : "application/json",
		success : function(data) {
			for(var i=0; i<data.length; i++){
				user = data[i];
				row.append("<div class='column'>" + 
	  					"<a id='emailUser' href='#'>"+user.email+"</a><br>" +
	  					"<button id='downloadSertifikat' name='"+user.id+"'>download jks</button><br>" + 
	  					"<button id='downloadJKS' name='"+user.id+"'>download certificate</button><br>" + 
	  					"<p></p>"
	  					);
				if(admin == true && user.active == false){
					row.append("<button id='setActiveUser' name='"+user.email+"'>set to active</button>" +
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
		var email = $(this).attr('name');
		console.log("Prosledjeni email: " + email);
		$.ajax({
			url: "https://localhost:8443/api/user/edit",
			type: 'PUT',
			data : email,
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
	
	$('body').on('click', '#buttonSearch',function(event){
		var text = $('#search').val();
		console.log(text);
		$.ajax({
			url: "https://localhost:8443/api/user/search",
			type: 'POST',
			data : text,
			contentType : "application/json",
			dataType: 'json',
			success : function(data) {
				row.empty();
				for(var i=0; i<data.length; i++){
					user = data[i];
					row.append("<div class='column'>" + 
		  					"<a id='emailUser' href='#'>"+user.email+"</a><br>" +
		  					"<button id='downloadSertifikat' name='"+user.id+"'>download jks</button><br>" + 
		  					"<button id='downloadJKS' name='"+user.id+"'>download certificate</button><br>" + 
		  					"<p></p>"
		  					);
					if(admin == true && user.active == false){
						row.append("<button id='setActiveUser' name='"+user.email+"'>set to active</button>" +
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
		event.preventDefault();
		return false;
	});
	
	$('body').on('click', '#downloadSertifikat',function(event){
		var userID = $(this).attr("name");
		console.log(userID);
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "/api/demo/downloadjks/"+userID, true);
		xhr.responseType = 'blob';
		xhr.onload = function(e) {
			if (this.status == 200) {
				var blob = this.response;
				console.log(blob);
				var a = document.createElement('a');
				var url = window.URL.createObjectURL(blob);
				a.href = url;
				a.download = xhr.getResponseHeader('filename');
				a.click();
				window.URL.revokeObjectURL(url);
			}
		};

		xhr.send();
	});
	
	$('body').on('click', '#downloadJKS',function(event){
		var userID = $(this).attr("name");
		console.log(userID);
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "/api/demo/download/"+userID, true);
		xhr.responseType = 'blob';
		xhr.onload = function(e) {
			if (this.status == 200) {
				var blob = this.response;
				console.log(blob);
				var a = document.createElement('a');
				var url = window.URL.createObjectURL(blob);
				a.href = url;
				a.download = xhr.getResponseHeader('filename');
				a.click();
				window.URL.revokeObjectURL(url);
			}
		};

		xhr.send();
	});

});