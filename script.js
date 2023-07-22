let loginButton=document.getElementById("login");
loginButton.addEventListener("click",()=>{
    console.log("hello");
    displayLogin();
})

function displayLogin(){
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');

    let loginBox=document.createElement("div");
    loginBox.setAttribute("id","loginBox");
        let leftLogindiv=document.createElement("div");
        let rightLogindiv=document.createElement("div");
        leftLogindiv.setAttribute("id","leftLogindiv");

            leftLogindiv.innerHTML='<img src="https://hotelcard.ch/images/hotelcard-logo-white.png">'+
                                    '<h1>Get a free login</h1>'+
                                    '<ul>'+
                                        '<li>With the free login you will get our newsletter</li>'+
                                        '<br>'+
                                        '<li>Upgrade to a HotelCard anytime</li>'+
                                    '</ul>'+
                                    '<button>Get the Free Login</button>'



        rightLogindiv.setAttribute("id","rightLogindiv");

            rightLogindiv.innerHTML='<h1>Login to TravelCard</h1>'+
                            '<p>Existing HotelCard members have been provided with the user<br>data by E-Mail. New members will get the user data when<br>purchasing a HotelCard.</p>'+
                            '<a href="buycard.html">Try HotelCard 6 months for CHF 79</a>'+
                            '<label for="email" class="input-label">Email :</label>'+
                            '<input type="text" id="email" name="email" class="input-field" placeholder="Enter your Email">'+
                            '<label for="password" class="input-label">Password :</label>'+
                            '<input type="password" id="password" name="password" class="input-field" placeholder="Enter your Password">'+
                            '<label><input type="checkbox" name="rememberme" value="rememberme" checked> Remember Me</label>'+
                            '<p id="forgot">Forgot Your Password ?</p>'+
                            '<button id="userlogin">Login</button>'+
                            '<img src="https://hotelcard-files.ams3.digitaloceanspaces.com/media/partners/swiss-bankers/SB_Karten-Front-full_2023_Rahmen.png">'+
                            '<p>Register your Travel Card from Swiss Bankers<br><a href="buycard.html">here<a>'




    loginBox.append(leftLogindiv);
    loginBox.append(rightLogindiv);

    document.body.append(overlay);
    document.body.append(loginBox);

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            closePopup();
        }
    });
}

function closePopup() {
    // Remove the popup and overlay elements from the document
    var popupDiv = document.querySelector('#loginBox');
    var overlay = document.querySelector('.overlay');
    if (popupDiv) {
        popupDiv.remove();
    }
    if (overlay) {
        overlay.remove();
    }
}