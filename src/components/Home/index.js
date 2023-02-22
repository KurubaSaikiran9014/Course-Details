import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourseItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  imProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiConstants.initial, list: []}

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    this.setState({apiStatus: apiConstants.imProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const fetchedData = data.courses
      const formattedData = fetchedData.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({list: formattedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderFailure = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="err">Oops! Something Went Wrong</h1>
      <p className="pa">We cannot seem to find the page you are looking for</p>
      <button className="button" type="button" onClick={this.fetchDetails}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderItems = () => {
    const {list} = this.state
    return (
      <>
        <h1 className="title">Courses</h1>
        <ul className="list-cont">
          {list.map(each => (
            <CourseItem item={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderOutPut = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderItems()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.imProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-cont">
        <Header />
        <div className="cont">{this.renderOutPut()}</div>
      </div>
    )
  }
}

export default Home
