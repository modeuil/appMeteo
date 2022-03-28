(() => {
  const apiKey = "e06d5d448e64930589af98ac8f9abdd6";
  const testing = document.querySelector(".testing");
  const description = document.querySelector(".desc");
  const img_meteo = document.querySelector(".img_meteo");

  const daily = document.querySelectorAll(".days");
  let data_days;
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      lat = position["coords"]["latitude"];
      long = position["coords"]["longitude"];
      apiCall(lat, long);
    });
  }

  function apiCall(lat, long) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let current = data["current"]["temp"];
        let desc = data["current"]["weather"][0]["description"];
        let localisation = data['timezone']
        console.log(localisation)
        testing.innerText = `${current}c°`;
        description.innerText = `${desc}`;

        switch (desc) {
          case "ciel dégagé":
            img_meteo.src = "./ressources/jour/01d.svg";
            break;
          default:
            alert("error");
        }

        for (let i = 0; i < 8; i++) {
          data_days = data["daily"][i]["temp"]["day"];
          daily[i].innerText = `${data_days}c°`;
        }
      });
  }
})();
