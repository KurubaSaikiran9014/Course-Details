import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  imProgress: 'INPROGRESS',
}

class CourseItemDetails extends Component {
  state = {apiStatus: apiConstants.initial, list: {}}

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    this.setState({apiStatus: apiConstants.imProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const each = data.course_details
      const formattedData = {
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }
      this.setState({list: formattedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderFailure = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
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

  renderItems = () => {
    const {list} = this.state
    const {name, imageUrl, description} = list
    return (
      <div className="cont">
        <img src={imageUrl} alt={name} />
        <div className="cont1">
          <h1 className="name">{name}</h1>
          <p className="desc2">{description}</p>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderOutPut = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderItems()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.imProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-cont">
        <Header />
        {this.renderOutPut()}
      </div>
    )
  }
}

export default CourseItemDetails
