import React from 'react'
import Notes from "../components/Notes";

function Home(props) {
  return (
    <div>
      <Notes showalert={props.showalert}/>
    </div>
  )
}

export default Home
