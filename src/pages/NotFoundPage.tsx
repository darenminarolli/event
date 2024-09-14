import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className="w-full ">
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")}>Go to Homepage</button>
  
    </div>
  )
}

export default NotFound