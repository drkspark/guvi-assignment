$(document).ready(function() {
    // Login button click event
    $("#login-button").click(function() {
      var email = $("#email").val();
      var password = $("#password").val();
  
      // AJAX request to login endpoint
      $.ajax({
        url: "login.php",
        method: "POST",
        dataType: "json",
        data: { email: email, password: password },
        success: function(response) {
          if (response.success) {
            // Login successful, redirect to profile page
            window.location.href = "profile.html";
          } else {
            // Login failed, display error message
            alert(response.message);
          }
        },
        error: function(error) {
          console.error("Error:", error);
          alert("Something went wrong. Please try again later.");
        }
      });
    });
  });
  