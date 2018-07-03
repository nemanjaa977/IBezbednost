$(document).ready(function(){
	var inputEmail = $('#emailInput');
	var inputPassword = $('#passwordInput');
	
	$('#registerSubmit').on('click', function(event){
		
		var email = inputEmail.val();
		var password = inputPassword.val();
		
		var param = {
				'password': password,
				'email': email
		}
		
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url :"https://localhost:8443/api/user/create",
			data :  JSON.stringify(param),
			dataType : 'json',
			success : function(result) {
				window.location.replace('index.html');
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});
		event.preventDefault();
		return false;
	});
	
	
});