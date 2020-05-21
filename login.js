var firebaseConfig = {
  apiKey: "AIzaSyCetqW5zF0bL9rGC3UugeoWvm17voo0aw4",
  authDomain: "bandtracker-5ad79.firebaseapp.com",
  databaseURL: "https://bandtracker-5ad79.firebaseio.com",
  projectId: "bandtracker-5ad79",
  storageBucket: "bandtracker-5ad79.appspot.com",
  messagingSenderId: "779141130317",
  appID: "1:779141130317:web:ffb52b89fa66013e37d404",
};
firebase.initializeApp(firebaseConfig);
console.log(firebaseConfig);
var emailInput = "";  
var passwordInput = ""; 
$(".helper-text").css("display", "none");
$("#createAccount").on("click", function(){
  emailInput = $("#email").val();
  console.log(emailInput);
  passwordInput = $("#password").val();
  console.log(passwordInput);
  if (emailInput || passwordInput) {
    firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput).then((response)=>{
      console.log(response);
    }).catch(function(){
      $(".helper-text").text("Wrong Password");
    })
    function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      }).catch(function(){
        $(".helper-text").text("Wrong Password");
      });
      // [END sendemailverification]
    }
    sendEmailVerification();
  } else{
    $(".helper-text").text("Enter a valid email and password");
  }
})
$("#enterButton").on("click", function(){
  console.log("si funciona")
  emailInput = $("#email").val();
  console.log(emailInput);
  passwordInput = $("#password").val();
  console.log(passwordInput);
  if (emailInput || passwordInput) {
    firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput).then((response)=>{
    console.log(response);
    }).catch(function(){
      $("#password").addClass("invalid");
      $("#password").prop("aria-invalid", "true");
      $(".helper-text").css("display", "block");
      $("#enterButton").attr("href", "./events.html");
    });
  } else if (emailInput === "" || passwordInput === ""){
    alert("Enter a valid email and password");
  } else {
    console.log("hi");
   
  }
})
