import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import focusDirective from "@/focusDirective";

const app = createApp(App);
app.use(focusDirective);
app.mount("#app");
