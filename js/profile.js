$(document).ready(function() {
    console.log(localStorage.getItem("email"));

    $.ajax({
      url: "http://localhost:8000/profile.php",
      method: "GET",
      dataType: "json",
      data:{email: localStorage.getItem("email")},
      success: function(response) {
        console.log(response);
        if (response.success) {
          $("#full-name").text(response.data.full_name);
          $("#email").text(response.data.email);
          $("#age").val(response.data.age);
          $("#dob").val(response.data.dob);
          $("#college").val(response.data.college);
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
  
    $("#logout").click(function () {
      localStorage.removeItem("email");
    })

    // Update profile button click event
    $("#update-profile").click(function() {
      var age = $("#age").val();
      var dob = $("#dob").val();
      var college = $("#college").val();
      var city = $("#city").val();
      var state = $("#state").val();
      
      const jsonData = JSON.stringify(
        { 
        "email": localStorage.getItem("email"), 
        "updates": {
          "age": age,
          "dob": dob,
          "college": college,
          "city": city,
          "state": state 
        }
      });

      $.ajax({
        url: "http://localhost:8000/profile.php",
        method: "PUT",
        dataType: "json",
        data: jsonData,
        success: function(response) {
          console.log(response)
          if (response.success) {
            alert("Profile updated successfully!");
          } else {
            alert(response.message);
          }
        },
        error: function(response) {
          console.log(response)
          alert(response.message);
        }
      });
    });
  });
  