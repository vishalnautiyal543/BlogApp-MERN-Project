import Header from "../components/Header"
import Blogs from '../components/Home/Blogs'
import { LayoutGrid } from "lucide-react"

const Home = () => {
  return (
    <div>
      <Header/>
      <div className="my-5 font-Inter font-bold bg-white p-4 dark:bg-darkmode ">
        <h1 className="dark:text-gray-100 flex gap-2 " > <LayoutGrid /> Latest Blogs</h1>
        <div className="w-full h-px bg-gray-200 my-2"></div>
        <Blogs/>
      </div>
    </div>
  )
}

export default Home