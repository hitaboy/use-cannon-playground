import { useState } from 'react'
import { Link } from 'react-router-dom'

function Menu() {
  
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <div className="menu_open" onClick={handleClick}>
        <img src="/icon_menu_open.svg" alt="open menu" />
      </div>
      <div className={`menu ${open ? "open" : ""}`}>
        <img className="menu_close" src="/icon_menu_close.svg" alt="close menu" onClick={handleClick} />
        <div className="page_title">Menu</div>
        <ul>
          <li>
            <Link to="/" onClick={handleClick}>Home</Link>
          </li>
          <li>
            <Link to="/p_1" onClick={handleClick}>Page 1</Link>
          </li>
          <li>
            <Link to="/p_2" onClick={handleClick}>Page 2</Link>
          </li>
          <li>
            <Link to="/p_3" onClick={handleClick}>CompoundBody</Link>
          </li>
          <li>
            <Link to="/p_4" onClick={handleClick}>Convex Polyhedron</Link>
          </li>
          <li>
            <Link to="/p_5" onClick={handleClick}>Demo move</Link>
          </li>
        </ul> 
      </div>
    </>
  )
}

export default Menu
