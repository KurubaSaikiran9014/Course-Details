import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {item} = props
  const {id, name, logoUrl} = item
  return (
    <Link to={`/courses/${id}`}>
      <li className="item">
        <img src={logoUrl} alt={name} className="img" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
