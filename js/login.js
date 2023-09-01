const error = $("#error");

// ! check if user has already logged in
$(document).ready(() => {
  const uid = JSON.parse(localStorage.getItem("uid"));
  if (uid !== null) {
    $.ajax({
      method: "post",
      url: "/php-task-main/php/validateUser.php",
      data: { uid: uid },
      dataType: "json",
      async: true,
      success: function (response) {
        if (response.status) window.location.href = "../php-task/profile.html";
      },
    });
  }
});

// ! EventListeners
$("input").keydown(() => {
  error.removeAttr("data-show");
});
$("#signin").click((e) => {
  e.preventDefault();
  const email = $("#email").val();
  const password = $("#password").val();
  if (email === "" || email.length < 3) {
    error.attr("data-show", "true");
    error.html("enter valid email");
    return;
  }
  if (password === "" || password.length < 6 || password.length > 13) {
    error.attr("data-show", "true");
    error.html("enter valid password");
    return;
  }
  const userData = {
    email: email,
    password: password,
  };
  $.ajax({
    method: "post",
    url: "/php-task-main/php/login.php",
    data: userData,
    dataType: "json",
    async: true,
    success: function (response) {
      if (response.status) {
        if (localStorage.getItem("uid")) localStorage.removeItem("uid");
        localStorage.setItem("uid", JSON.stringify(response.uid));
        window.location.href = "../php-task/profile.html";
      } else {
        error.attr("data-show", "true");
        $("#error").html(response.msg);
      }
    },
  });
});
