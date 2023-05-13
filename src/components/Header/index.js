import './index.css'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className="header">
            <img className='logo' src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png" alt="logo"/>
            <div className='navs'>
        <li style={{marginRight:25}} className="list">
            <Link to='/home'>
        <button className="btn-donate">
         Home
        </button>
        </Link>
        </li>
        <li className="list">
            <Link to= "/search">
               <button className="btn-donate">
                Search
               </button>
            </Link>
        </li>
        </div>
    </div>
    )
}

export default Header