const exitNav = document.querySelector(".exit-ham");
const nav = document.querySelector("nav");
const ham = document.querySelector(".ham");
ham.addEventListener("click", () => {
  ham.classList.toggle("none");
  nav.classList.toggle("hide");
  exitNav.classList.toggle("none");
});

exitNav.addEventListener("click", () => {
  exitNav.classList.toggle("none");
  nav.classList.toggle("hide");
  ham.classList.toggle("none");
});

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  allowTouchMove: false,
  // Navigation arrows
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
});

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV2dGFyaWsiLCJhIjoiY2t2aHZlbHE0NjF1OTJ1cXd5dWl1aTFmYSJ9.wd-NUZ2h6JkNQkFSIgCShA";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [18.24771441335426, 43.850213537498036], // starting position [lng, lat]
  zoom: 12, // starting zoom
});
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [18.24771441335426, 43.850213537498036],
      },
      properties: {
        title: "Mapbox",
        description: "Trgovina Bumm",
      },
    },
  ],
};
// add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement("div");
  el.className = "marker";

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
    )
    .addTo(map);
}
