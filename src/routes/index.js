import Home from "../views/Home"
import Detail from "../views/Detail"


const routes = [
    { path: '/', name: "Home", component: Home},
    { path: '/item/:id', name: "Detail", component: Detail, props: true }
  ]
  
  export default routes