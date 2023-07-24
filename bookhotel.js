
const hotelURL = `https://64b58eb7f3dbab5a95c7772e.mockapi.io/hotels`;


let mainSection = document.getElementById("bookhotel-div");

let bookhotel_sort= document.getElementById("bookhotel-sort");

let search_input= document.getElementById("bookhotel-search-input");

let bookhotel_search_button= document.getElementById("bookhotel-search-button");





let user;
if(localStorage.getItem("LoggedInUser")){
    user=JSON.parse(localStorage.getItem("LoggedInUser"));
}
else{
    document.getElementById("login").click();
}


bookhotel_sort.addEventListener("change", function(){
  if(bookhotel_sort.value==""){
    fetchHotelData(hotelURL)
  }else if(bookhotel_sort.value=="low-high"){
    fetchHotelData(`${hotelURL}?sortBy=price`)
  }else if(bookhotel_sort.value=="high-low"){
    fetchHotelData(`${hotelURL}?sortBy=price&order=desc`)
  }else if(bookhotel_sort.value=="rating"){
    fetchHotelData(`${hotelURL}?sortBy=rating&order=desc`)
  }
})


let newData=[];

fetchHotelData(hotelURL)


async function fetchHotelData(url){

  try {
    const res = await fetch(url);
    
    const data = await res.json();
    
    // console.log(data);
    
      newData=data;

      displayHotels(data);
      
    } catch (err) {
      console.log(err);
    }
  }

  
  // searching........
  
  bookhotel_search_button.addEventListener("click", function(){
    
    if(search_input.value=""){
      fetchHotelData(hotelURL)
    }else{


      let filtered= newData.filter((a)=>{
        if(a.name.toLowerCase().includes("resort")){
            return a;
          }
        });

        displayHotels(filtered);
      }
   })
 
   
// appending the hotels.....


  function displayHotels(data){
    
    mainSection.innerHTML="";
    
  let hotel_list= document.createElement("div");
  
  data.forEach((e)=>{
     let hotelcard= createHotelCard(e);
     let hr= document.createElement("hr");
     hr.className="horionzontal-line"
     hotel_list.append(hotelcard,hr)
    })
    
    mainSection.append(hotel_list);
}


function createHotelCard(data){

   let card= document.createElement("div");
   card.className="bookhotel-card";
   card.setAttribute("data-id",data.id);

   let card_img= document.createElement("div");
   card_img.className="bookhotel-img";

   let img= document.createElement("img");
   img.src=data.image;
   img.alt= "No image Found";

   card_img.append(img);



   let card_body= document.createElement("div");
   card_body.className="bookhotel-card-body";
   
   
   
   let hotelcard_div1= document.createElement("div");
   hotelcard_div1.className= "hotelcard_div1"

   let stars= document.createElement("div");
   stars.className= "hotel-stars";
   
   let star_img= document.createElement("img");
   star_img.src="https://png.pngtree.com/png-vector/20220629/ourmid/pngtree-four-4-star-rank-sign-vector-illustration-eps10-png-image_5621249.png";
   stars.append(star_img);

   let bookhotel_rooms=document.createElement("div");
   bookhotel_rooms.className= "bookhotel-rooms";
   
   let bed_img=document.createElement("img");
   bed_img.src= "https://www.svgrepo.com/show/488800/bed.svg";

   
   let rooms_left= document.createElement("p");
   rooms_left.innerText= "10 rooms left";
   
   bookhotel_rooms.append(bed_img,rooms_left);
   
   hotelcard_div1.append(stars,bookhotel_rooms);
   
   
   let hotel_name= document.createElement("p");
   hotel_name.className="bookhotel-name";
   hotel_name.innerText=data.name;

   let location= document.createElement("p");
   location.className= "bookhotel-location";
   location.innerText= data.location;
   
   let hotelcard_div2= document.createElement("div");
   hotelcard_div2.className= "hotelcard_div2"
   
   let show_map=document.createElement("div");
   show_map.className= "bookhotel-map";
   
   let location_img=document.createElement("img");
   location_img.src="https://www.svgrepo.com/show/312483/location-indicator-red.svg"

  let map_text= document.createElement("p");
  map_text.innerText= "Show on map";

  show_map.append(location_img,map_text)

  let discount_btn= document.createElement("button");
  discount_btn.className= "discount-btn"
  discount_btn.innerText="50%";
  
  hotelcard_div2.append(show_map,discount_btn);


  let hotelcard_div3= document.createElement("div");
  hotelcard_div3.className= "hotelcard_div3"

  let bookhotel_btn= document.createElement("button");
  bookhotel_btn.className= "bookhotel-btn"
  bookhotel_btn.innerText= "Book now";

  bookhotel_btn.addEventListener("click",()=>{
    let res=fetch(`https://64b65d04df0839c97e156cc4.mockapi.io/registrations`,{
      method: 'POST',
      headers: {'content-type':'application/json'},
      body:JSON.stringify({
        "userid": user.id,
        "hotelid": data.id,
        "active": true
      })
  }).then((res)=>{
   return res.json();
  }).then((result)=>{
    console.log(result);
    window.location.href="bookings.html";
  })
  })





  let price_div= document.createElement("div");
  price_div.className= "price-div";

  let price_text= document.createElement("p");
  price_text.innerText="Price/night staarting from:";

  
  let price_strike= document.createElement("h2");
  price_strike.className= "striked-price"
  price_strike.innerText= data.price+data.price+" CHF";

  let bookhotel_price= document.createElement("h1");
  bookhotel_price.innerText= data.price+" CHF";
  bookhotel_price.className= "bookhotel-price"

  price_div.append(price_text,price_strike,bookhotel_price)
  hotelcard_div3.append(bookhotel_btn,price_div);


  let hotelcard_div4= document.createElement("div");
   hotelcard_div4.className= "hotelcard_div4"

   let trust_you= document.createElement("div");
   trust_you.className= "trust-you";

   let trust_img= document.createElement("img");
   trust_img.src="https://i.ibb.co/vYKjgjb/Whats-App-Image-2023-07-24-at-00-00-13.jpg"
    
   let rating= document.createElement("p");
   rating.innerText= `Rating: ${data.rating}`;

   trust_you.append(rating,trust_img)

   let cancellation_div= document.createElement("div");
   cancellation_div.className="cancellation-div";

   let cancel_img= document.createElement("img");
   cancel_img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAqFBMVEUAAAAAv0AG2D0I1zwI1zwK1j0I1zwI1zwI1z0I1zwH2DwG2TkI2D0A/wAK2DsI1zwI1zwA3UQH2DwI1zwG1T0J2D0H1TkA0UYI1z0H2DwI1zwA1SsJ2D0I1jwA/1UH1zsI1z0J1j0I1zsI1zwJ1zwAzDMI1zsI1zwI1zwH2zoJ1zoI1zwI1zwI1jwI2D0I1zwI1j0J2DwI1zwH2DwI1jwA/wAI1zwAAABA9Q7zAAAANnRSTlMABE/uuFD85T/3byi1ARre1w/P8So7JAvGSPgGdYMDrKR2gX/QCt/97SM5+vtEXP5kVevvXQK9FhQjAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+UBFAsPDZ06RnoAAACFSURBVBjTVc/pFoIgEIZhCrO9tH21smwvW9/7v7RGPR2AH5zvGWAApZxRcqnK2nNc8anartWhYbmpodU27nQhCI3DHvQHEoaj3OMJ+NMs6VnWZ+4Bi3xJdi5VtBKvi7MbifFWpl1SFJK94ADH07/9+SIVrjdz4T2F9GE/+fl6f9xPfiOTf7ilDd/qgnAbAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAxLTIwVDExOjE1OjEzKzAwOjAwghYk2QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMS0yMFQxMToxNToxMyswMDowMPNLnGUAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"

   let cancellation= document.createElement("p");
   cancellation.innerText= "Free cancellation";

   cancellation_div.append(cancel_img,cancellation)

   hotelcard_div4.append(trust_you,cancellation_div);

   card_body.append(hotelcard_div1,hotel_name,location,hotelcard_div2,hotelcard_div3,hotelcard_div4)


  card.append(card_img,card_body);
  
  
  return card;

}
