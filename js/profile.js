$(document).ready(function() {
    // Fetch user data on page load
    $.ajax({
      url: "http:://localhost:8000/profile.php",
      method: "GET",
      dataType: "json",
      success: function(response) {
        if (response.success) {
          // Populate user information
          $("#full-name").text(response.data.full_name);
          $("#email").text(response.data.email);
          $("#mobile").text(response.data.mobile);
          $("#age").val(response.data.age);
          $("#dob").val(response.data.date_of_birth);
          $("#college").val(response.data.college_name);
          $("#city").val(response.data.city);
          $("#state").val(response.data.state);
        } else {
          alert("Error retrieving profile information.");
        }
      },
      error: function(error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
      }
    });
  
    // Update profile button click event
    $("#update-profile").click(function() {
      var age = $("#age").val();
      var dob = $("#dob").val();
      var college = $("#college").val();
      var city = $("#city").val();
      var state = $("#state").val();
  
      // AJAX request to update profile endpoint
      $.ajax({
        url: "profile.php",
        method: "PUT",
        dataType: "json",
        data: { age: age, dob: dob, college: college, city: city, state: state },
        success: function(response) {
          if (response.success) {
            alert("Profile updated successfully!");
          } else {
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
  