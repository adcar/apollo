import React, { Component } from 'react'
import getToken from '../getToken'

class MyTracks extends Component {
  componentDidMount() {
    console.log(getToken('spotifyAccessToken'))
  }
  render() {
    return (
      <h1>My Tracks</h1>
      )
  }
}

export default MyTracks