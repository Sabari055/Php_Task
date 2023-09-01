let oldUserId = null;
$(document).ready(() => {
  $(".load-wrapper").attr("load", "true");
  fetchAndUpdateDetails();
});

// ! handler logout
$("#logout").click(() => {
  localStorage.removeItem("uid");
  window.location.href = "../php-task/login.html";
});

// ! edit
$("#edit").click(() => {
  $("#edit").attr("data-edit", "hide");
  $("#update").attr("data-update", "true");
  $("#cancel").attr("data-cancel", "true");
  document.querySelectorAll(".value").forEach((doc) => {
    doc.setAttribute("data-edit", "true");
    doc.removeAttribute("disabled");
  });
});

// ! cancel update
$("#cancel").click(() => {
  cancelUpdate();
});
function cancelUpdate() {
  $("#edit").removeAttr("data-edit");
  $("#update").removeAttr("data-update");
  $("#cancel").removeAttr("data-cancel");
  document.querySelectorAll(".value").forEach((doc) => {
    doc.setAttribute("data-edit", "false");
    doc.setAttribute("disabled", "true");
  });
}

// ! handle update
$("#update").click(() => {
  const updatedUser = validateUser();
  if (updatedUser === null) {
    cancelUpdate();
    fetchAndUpdateDetails();
  } else {
    $.ajax({
      method: "post",
      url: "/php-task-main/php/profileUpdate.php",
      data: updatedUser,
      dataType: "json",
      async: true,
      success: function () {
        cancelUpdate();
      },
    });
  }
});

function validateUser() {
  const uname = $("#name").val();
  const email = $("#email").val();
  const mobileNumber = $("#mobile").val();
  const dob = $("#dob").val();
  const gender = $("#gender").val().toLowerCase();
  // ! Validate name
  if (uname === "" || uname.length < 3) {
    return null;
  }
  // ! Validate mailID
  const emailPattern =
    /^([a-zA-Z0-9.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
  if (!emailPattern.test(email) || email === "") {
    return null;
  }
  // ! Validate Mobile Number
  if (mobileNumber.length > 10 || mobileNumber.length < 10) {
    return null;
  }
  // ! Validate dob
  if (dob === "") {
    return null;
  }
  // ! Validate Gender
  if (gender === "" || (gender !== "male" && gender !== "female")) {
    return null;
  }
  $("#gender").val(gender);
  const registeredUser = {
    uid: JSON.parse(localStorage.getItem("uid")),
    uname: uname,
    email: email,
    mobileNumber: mobileNumber,
    dob: dob,
    gender: gender,
  };
  return registeredUser;
}

function fetchAndUpdateDetails() {
  let uid = localStorage.getItem("uid");
  uid = JSON.parse(uid);
  if (uid === null) {
    window.history.go(-1);
  } else {
    // ! ajax call
    $.ajax({
      method: "get",
      url: "/php-task-main/php/profile.php",
      data: { uid: uid },
      dataType: "json",
      async: true,
      success: function (response) {
        if (response.status) {
          oldUserId = response.email;
          setTimeout(() => {
            $(".load-wrapper").removeAttr("load");
          }, 3000);
          $("#name").val(response.name);
          $("#gender").val(response.gender);
          $("#dob").val(response.dob);
          $("#email").val(response.email);
          $("#mobile").val(response.mobile);
        } else {
          window.location.href = "../php-task/login.html";
        }
      },
    });
  }
}
