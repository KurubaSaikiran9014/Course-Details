import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="not-found-cont">
    <Header />
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="no">Page Not Found</h1>
    <p className="desc1">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
