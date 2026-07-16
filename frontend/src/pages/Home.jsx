import Header from "../components/Header"
import Blogs from '../components/Home/Blogs'

const Home = () => {
  return (
    <div>
      <Header/>
      <div className="my-5 font-Inter font-bold">
        <h1>Latest Blogs</h1>
        <div className="w-full h-px bg-gray-200 my-2"></div>
        <Blogs/>
      </div>
    </div>
  )
}

export default Home