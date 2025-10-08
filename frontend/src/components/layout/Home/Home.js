import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/cg" 
import './Home.css'
function Home() {
  return (
    <Fragment>
        <div className = "Banner">
            <p>Welcome to shopsimp</p>
            <h1>Shoping Platform for simp worthy products</h1>
            <a href = "container">
                <button>
                    Scroll <CgMouse></CgMouse>
                </button>
            </a>

        </div>
    </Fragment>

  )
}

export default Home