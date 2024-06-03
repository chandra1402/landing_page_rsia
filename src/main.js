import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/app.css";
import BackToTop from "vue-backtotop";
import VueGoogleMaps from "@fawmi/vue-google-maps";
const feather = require("feather-icons");
feather.replace();

// createApp(App).use(router).use(BackToTop).mount("#app");
const app = createApp(App);

app.use(router);
app.use(BackToTop);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAVfOW7sLoCV2lKn8E4ff_8_dksEuCWHS8",
  },
});
app.mount("#app");

const appTheme = localStorage.getItem("theme");

// Check what is the active theme and change theme when user clicks on the theme button in header.
if (
  appTheme === "dark" &&
  document.querySelector("body").classList.contains("app-theme")
) {
  document.querySelector("body").classList.add("bg-primary-dark");
} else {
  document.querySelector("body").classList.add("bg-secondary-light");
}
