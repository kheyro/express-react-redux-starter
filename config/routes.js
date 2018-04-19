import Home from "../src/components/Home";
import About from "../src/components/About";

export default [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/about",
    component: About,
    exact: true,
  }
];