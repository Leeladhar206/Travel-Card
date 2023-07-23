const baseBookingUrl=`https://64b65d04df0839c97e156cc4.mockapi.io/registrations?userid=`;
const baseBookingUrlwithid=`https://64b65d04df0839c97e156cc4.mockapi.io/registrations/`;
const hotelUrl=`https://64b58eb7f3dbab5a95c7772e.mockapi.io/hotels`;

let user;
if(localStorage.getItem("LoggedInUser")){
    user=JSON.parse(localStorage.getItem("LoggedInUser"));
    if(user.admin){
        user.id='';
        console.log("admin");
    }
    fetchactivebookings();
}
else{
    document.getElementById("login").click();
}
document.getElementById("activebutton").addEventListener("click",()=>{
    document.getElementById("bookingsdiv").innerHTML='';
    fetchactivebookings();
})

document.getElementById("cancelbutton").addEventListener("click",()=>{
    document.getElementById("bookingsdiv").innerHTML='';
    fetchcancelbookings();
})

async function fetchactivebookings(){
    let res = await fetch(`${baseBookingUrl}${user.id}`);
    let data=await res.json();
    getactivehotel(data);
}

async function fetchcancelbookings(){
    let res = await fetch(`${baseBookingUrl}${user.id}`);
    let data=await res.json();
    getcancelhotel(data);
}

function getactivehotel(data){
    data.forEach((item)=>{
        if(item.active){
            hotelbyid(item.hotelid,item.active,item.id);
            // console.log(item.id);
        }
    })
}
function getcancelhotel(data){
    data.forEach((item)=>{
        if(!item.active){
            hotelbyid(item.hotelid,false);
        }
    })
}



async function hotelbyid(id,isactive=true,bookingid){
    let res=await fetch(`${hotelUrl}/${id}`);
    let hotel=await res.json();
    console.log(bookingid);
    appendtoDOM(hotel,isactive,bookingid);
}

function appendtoDOM(hotel,isactive,bookingid){
    let bookingdiv=document.getElementById("bookingsdiv");
    let card=document.createElement("div");
    card.classList.add("dynamichotelcard")
    let cancellingbutton=document.createElement("button");
    cancellingbutton.innerText="Cancel";
    if(isactive){
        card.innerHTML=`<img src=${hotel.image} alt="">`+
            `<h2>${hotel.name}</h2>`+
            `<p>${hotel.location}</p>`+
            `<p>Rating: ${hotel.rating}</p>`+
            `<p>Price: ${hotel.price} CHF</p>`+
            `<p>Free cancellation</p>`;
        card.append(cancellingbutton);
    }
    else{
        card.innerHTML=`<img src=${hotel.image} alt="">`+
            `<h2>${hotel.name}</h2>`+
            `<p>${hotel.location}</p>`+
            `<p>Rating: ${hotel.rating}</p>`+
            `<p>Price: ${hotel.price} CHF</p>`+
            `<p>Free cancellation</p>`;
    }
    
    bookingdiv.append(card);
    cancellingbutton.addEventListener("click",()=>{
        console.log(bookingid);
        cancelbooking(bookingid);      
    })
}
async function cancelbooking(id){
    let res=await fetch(`${baseBookingUrlwithid}${id}`,{
        method: 'PUT',
        headers: {'content-type':'application/json'},
        body:JSON.stringify({
            active:false
        })
    });
    let result=await res.json();
    console.log(result);
    document.getElementById("activebutton").click();
}