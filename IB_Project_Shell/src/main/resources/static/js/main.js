$(document).ready(function(){
	var email = $('#userEmailInput');
	var password = $('#passwordInput');
	var nav = $('.navBar');
	
	nav.append("<a href='#'><i class='fa fa-user-plus'></i> Register </a>");
	
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
			url :"http://localhost:8443/auth/login",
			data :  JSON.stringify(json),
			dataType : 'json',
			success : function(data) {
				console.log(data);
				localStorage.setItem("token",data.access_token);
				window.location.replace('home.html');
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

function download() {

	var xhr = new XMLHttpRequest();
	xhr.open('GET', "/api/demo/download", true);
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
};