let loginButton = document.getElementById("login");
// let user;
if(localStorage.getItem("LoggedInUser")){
    // user=JSON.parse(localStorage.getItem("LoggedInUser"));
    loginButton.innerText="Logout";
    // loginButton.removeEventListener();
    // loginButton.addEventListener("click",()=>{
    //     localStorage.clear();
    // })
    
}
loginButton.addEventListener("click", () => {
    if(localStorage.getItem("LoggedInUser")){
        localStorage.clear();
        window.location.href="index.html";
        return;
    }
  console.log("hello");
  displayLogin();
  logineventlistener();
});

function displayLogin() {
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");

  let loginBox = document.createElement("div");
  loginBox.setAttribute("id", "loginBox");
  let leftLogindiv = document.createElement("div");
  let rightLogindiv = document.createElement("div");
  leftLogindiv.setAttribute("id", "leftLogindiv");

  leftLogindiv.innerHTML =
    '<img src="https://hotelcard.ch/images/hotelcard-logo-white.png">' +
    "<h1>Get a free login</h1>" +
    "<ul>" +
    "<li>With the free login you will get our newsletter</li>" +
    "<br>" +
    "<li>Upgrade to a HotelCard anytime</li>" +
    "</ul>" +
    "<button>Get the Free Login</button>";

  rightLogindiv.setAttribute("id", "rightLogindiv");

  rightLogindiv.innerHTML =
    "<h1>Login to TravelCard</h1>" +
    "<p>Existing HotelCard members have been provided with the user<br>data by E-Mail. New members will get the user data when<br>purchasing a HotelCard.</p>" +
    '<a href="buycard.html">Try HotelCard 6 months for CHF 79</a>' +
    '<label for="email" class="input-label">Email :</label>' +
    '<input type="email" id="email" name="email" class="input-field" placeholder="Enter your Email">' +
    '<label for="password" class="input-label">Password :</label>' +
    '<input type="password" id="password" name="password" class="input-field" placeholder="Enter your Password">' +
    '<label><input type="checkbox" name="rememberme" value="rememberme" checked> Remember Me</label>' +
    '<p id="forgot">Forgot Your Password ?</p>' +
    '<button id="userlogin">Login</button>' +
    '<img src="https://hotelcard-files.ams3.digitaloceanspaces.com/media/partners/swiss-bankers/SB_Karten-Front-full_2023_Rahmen.png">' +
    '<p>Register your Travel Card from Swiss Bankers<br><a href="buycard.html">here<a>';

  loginBox.append(leftLogindiv);
  loginBox.append(rightLogindiv);

  document.body.append(overlay);
  document.body.append(loginBox);

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closePopup();
    }
  });
}

function closePopup() {
  // Remove the popup and overlay elements from the document
  var popupDiv = document.querySelector("#loginBox");
  var overlay = document.querySelector(".overlay");
  if (popupDiv) {
    popupDiv.remove();
  }
  if (overlay) {
    overlay.remove();
  }
}
const baseUserUrl = `https://64b58eb7f3dbab5a95c7772e.mockapi.io/users`;


function logineventlistener(){
        LoginClick = document.getElementById("userlogin");
        LoginClick.addEventListener("click", () => {
        let useremail = document.getElementById("email");
        let password = document.getElementById("password");
        loginbyemailpass(useremail.value, password.value);
      });
}

async function loginbyemailpass(email, pass) {
  try{
    if(!email || !pass){
        throw new Error("Login Failed");
    }
    let res = await fetch(`${baseUserUrl}?email=${email}&password=${pass}`);
    let data = await res.json();
    console.log(data);
    console.log("login");
    if(!data[0]){
        throw new Error("No User Found");
    }
    localStorage.setItem("LoggedInUser",JSON.stringify(data[0]));
    window.location.href="bookings.html";
}
catch(err){
    console.log(err);
    LoginClick = document.getElementById("userlogin");
    LoginClick.innerHTML=err;
    LoginClick.classList.add("button-shake");

            // Remove the "button-shake" class after the animation finishes
            setTimeout(function () {
                LoginClick.classList.remove("button-shake");
            }, 300);
    setTimeout(()=>{
        LoginClick.innerHTML="Login";
    },1000);
}
}
