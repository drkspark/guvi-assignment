$(document).ready(function() {
    // Register button click event
    $("#register-button").click(function(e) {
      var full_name = $("#name").val();
      var email = $("#email").val();
      var password = $("#password").val();
      

      console.log("Data Passed", full_name, email, password)

      $.ajax(
        {
          method: "POST",
          url: "http://localhost:8000/register.php",
          data: {
            email: email,
            full_name: full_name,
            password: password
          },
          datatype : "json",
          success: function(response) {
            response = JSON.parse(response);
            console.log(response);
            alert(response.message);
            window.location = "../login.html"
          },
          error: function (response) {
            try{
              response = JSON.parse(response);
            } catch(e) {
              console.log(e);
            }
            console.log(response);
            alert(response === undefined ? "User not registered please try again" : response.message);
          }

        }
      )
      
    });
  });
  