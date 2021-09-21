let map;
let marker;

let center = { lat: -6.763457123548206, lng: -38.23877402576849};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 14,
  });
  

  marker = new google.maps.Marker({
    map: map,
    draggable: true,
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener("position_changed", () => {
    map.setCenter(marker.position);
  });
}

function addMarker(evt) {
  marker.setPosition(evt.latLng);
}

function save() {
  const obj = {
    name: document.getElementById("name").value,
    lat: marker.getPosition().lat(),
    lng: marker.getPosition().lng(),
  };

  fetch("http://localhost:6006/funcionario/pontos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      alert("Inserido!");
    })
    .catch((error) => alert("Falha ao salvar!"));
}

const destiny = () => {
console.log("Entrouuu")
  fetch("http://localhost:6006/paciente/destiny")
    .then((res) => res.json())
    .then((data) => {
      const size = data.length;

      const point = {
        lat: data[size - 1].st_x,
        lng: data[size - 1].st_y,
      };
      console.log(point)

      map = new google.maps.Map(document.getElementById("map"), {
        center: point,
        zoom: 14,
      });

      const marker = new google.maps.Marker({
        map: map,
        position: point,
      });

      map.addListener("center_changed", () => {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(() => {
          map.panTo(marker.getPosition());
        }, 3000);
      });
      marker.addListener("click", () => {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
      });
    });
};

