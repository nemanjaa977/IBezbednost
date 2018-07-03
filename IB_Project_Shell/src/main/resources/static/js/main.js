$(document).ready(function(){
	var email = $('#userEmailInput');
	var password = $('#passwordInput');
	var nav = $('.navBar');
	
	nav.append("<a href='register.html'><i class='fa fa-user-plus'></i> Register </a>");
	
	$('body').on('click', '#loginSubmit',function(event){
	
		var emailIn = email.val();
		var passIn = password.val();
		var json = {
				'email': emailIn,
				'password': passIn
		}
			
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url :"https://localhost:8443/auth/login",
			data :  JSON.stringify(json),
			dataType : 'json',
			success : function(data) {
				console.log(data);
				var token = data.access_token;
				$.ajax({
					url: "http://localhost:8443/api/user/whoami",
					type: 'GET',
					headers: { "Authorization": "Bearer " + token},
					contentType : "application/json",
					success : function(data) {
						console.log(data);
						if(data.active == true){
							localStorage.setItem("token", token);
							window.location.replace('home.html');
						}else{
							alert("You aren't activated!");
						}
					},
					error : function(e) {
						localStorage.setItem("token", token);
						window.location.replace('home.html');
					}
				});
				
			},
			error : function(e) {
				console.log("ERROR: ", e);
				alert("You aren't activated!");
			}
		});
		
		event.preventDefault();
		return false;
	
	});
});