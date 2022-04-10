//geting values from select list
function updateList(){
    let select = document.getElementById('location');
    let option = select.options[select.selectedIndex]

    document.getElementById('value').value = option.value
    document.getElementById('text').value = option.text
    return option.text
}


async function getCoffeeLocations(lat, long){
        let latitude = lat
        let longitude = long
        const options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'fsq33EPu5JfjJP/m4/J3IBAkLnKiD91P4/aNz+oYjpDlpQ4='
            }
          }

          //const response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=35.72%2C-78.84&limit=5', options)
          const response = await fetch(`https://api.foursquare.com/v3/places/search?query=hotel&ll=${latitude}%2C${longitude}&limit=5`, options)
          const data = await response.text()
          let parseData = JSON.parse(data)
          let businesses = parseData.results

          for (let i = 0; i < businesses.length; i++){
          let coffeeMarker = L.marker([businesses[i].geocodes.main.latitude, businesses[i].geocodes.main.longitude]).addTo(map)
          coffeeMarker.bindPopup("<b>Coffee!</b>").openPopup()
          }
}


async function getHotelLocations(lat, long){
    let latitude = lat
    let longitude = long
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq33EPu5JfjJP/m4/J3IBAkLnKiD91P4/aNz+oYjpDlpQ4='
        }
      }

      //const response = await fetch('https://api.foursquare.com/v3/places/search?query=hotel&ll=35.72%2C-78.84&limit=5', options)
      const response = await fetch(`https://api.foursquare.com/v3/places/search?query=hotel&ll=${latitude}%2C${longitude}&limit=5`, options)
      const data = await response.text()
      let parseData = JSON.parse(data)
      let businesses = parseData.results

      for (let i = 0; i < businesses.length; i++){
      let hotelMarker = L.marker([businesses[i].geocodes.main.latitude, businesses[i].geocodes.main.longitude]).addTo(map)
      hotelMarker.bindPopup("<b>Hotel!</b>").openPopup()
    }
      

}

async function getRestaurantLocations(lat, long){
    let latitude = lat
    let longitude = long
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq33EPu5JfjJP/m4/J3IBAkLnKiD91P4/aNz+oYjpDlpQ4='
        }
      }

      //const response = await fetch('https://api.foursquare.com/v3/places/search?query=restaurant&ll=35.72%2C-78.84&limit=5', options)
      const response = await fetch(`https://api.foursquare.com/v3/places/search?query=hotel&ll=${latitude}%2C${longitude}&limit=5`, options)
      const data = await response.text()
      let parseData = JSON.parse(data)
      let businesses = parseData.results

      for (let i = 0; i < businesses.length; i++){
        let restaurantMarker = L.marker([businesses[i].geocodes.main.latitude, businesses[i].geocodes.main.longitude]).addTo(map)
        restaurantMarker.bindPopup("<b>Restaurant!</b>").openPopup()
      }
      
}



//displaying map
let longitude = 0
let latitude = 0
let zoom = 1
let map = L.map('map').setView([latitude, longitude], zoom);

//loading tile map
const OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//geting user's location
let x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

//displaying  position 
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
  //adding  long and lat to map
  latitude = position.coords.latitude
  longitude = position.coords.longitude
  zoom = 10
  const homeMarker = L.marker([latitude, longitude]).addTo(map)
  homeMarker.bindPopup("You are here").openPopup()
  map.flyTo([latitude, longitude], zoom)
  

  //check drop down select list to see which function to run
  let selectedOption = updateList()
 
  if(selectedOption == "restaurant"){
    getRestaurantLocations(latitude, longitude)
  } else if(selectedOption === "coffee") {
    getCoffeeLocations(latitude, longitude)
  } else {
    getHotelLocations(latitude, longitude)
  }
 
  
}


