$(document).ready(function() {
    // Login button click event
    $("#login-button").click(function() {
      var email = $("#email").val();
      var password = $("#password").val();
      
      console.log("Here: ", email, password);


      // AJAX request to login endpoint
      $.ajax({
        url: "http://localhost:8000/login.php",
        method: "POST",
        dataType: "json",
        data: { email: email, password: password },
        success: function(response) {
          console.log(response);
          if (response.success) {
            // Login successful, redirect to profile page
            window.location = "../profile.html";
          } else {
            // Login failed, display error message
            alert(response.message);
          }
        },
        error: function(response) {
          console.log(response);
          alert("Something went wrong. Please try again later.");
        }
      });
    });
  });
  