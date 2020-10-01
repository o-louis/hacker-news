import Home from "../page/Home"
import CommentDetail from "../page/CommentDetail"


const routes = [
    { path: '/', name: "Home", component: Home},
    { path: '/item/:id', name: "CommentDetail", component: CommentDetail, props: true }
  ]
  
  export default routes