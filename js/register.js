// ? Selectors
const error = $("#error");
// Functions
$("input").keydown(() => {
  error.removeAttr("data-show");
});

function showError(msg) {
  error.attr("data-show", "true");
  error.html(msg);
  return null;
}

function validateUser() {
  const uname = $("#name").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirm-password").val();
  const email = $("#email").val();
  const mobileNumber = $("#mobilenumber").val();
  const dob = $("#dob").val();
  const gender = $(".gender:checked").val();
  // ! Validate name
  if (uname === "" || uname.length < 3) {
    return showError("enter valid name");
  }
  // ! Validate Password
  if (password === "" || password.length < 6 || password.length > 13) {
    return showError("enter valid password");
  }
  // ! Check password match
  if (password !== confirmPassword) {
    return showError("password doesn't match");
  }
  // ! Validate mailID
  const emailPattern =
    /^([a-zA-Z0-9.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
  if (!emailPattern.test(email) || email === "") {
    return showError("enter valid email");
  }
  // ! Validate Mobile Number
  if (mobileNumber.length > 10 || mobileNumber.length < 10) {
    return showError("enter valid mobile number");
  }
  // ! Validate dob
  if (dob === "") {
    return showError("enter validate dob");
  }
  // ! Validate Gender
  if (gender === undefined) {
    return showError("select gender");
  }
  const registeredUser = {
    uname: uname,
    password: password,
    email: email,
    mobileNumber: mobileNumber,
    dob: dob,
    gender: gender,
  };
  return registeredUser;
}

function clearValue() {
  $("#name").val("");
  $("#password").val("");
  $("#confirm-password").val("");
  $("#email").val("");
  $("#mobilenumber").val("");
  $("#dob").val("");
  $("input[name='gender']").prop("checked", false);
}

// ? EventListeners

$("#signup").click((e) => {
  e.preventDefault();
  const registeredUser = validateUser();
  if (registeredUser === null) {
  } else {
    $("#signup").attr("disabled", "disabled");
    $.ajax({
      method: "post",
      url: "/php-task-main/php/register.php",
      data: registeredUser,
      dataType: "json",
      async: true,
      success: function (response) {
        $("#signup").removeAttr("disabled");
        clearValue();
        if (response.status === true) {
          window.location.href = "../php-task/login.html";
        }
      },
    });
  }
});
