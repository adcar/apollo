import React, { Component } from 'react'
import Cookie from 'js-cookie'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

class Callback extends Component {
	componentDidMount() {
		if (this.props.location.hash.length > 0) {
			Cookie.set(
				'spotifyAccessToken',
				qs.parse(this.props.location.hash)['#access_token'],
				{ expires: 1 / 24 }
			)
			this.props.history.goBack() // Goes back to the previous page (since we redirecting them to the home page)
		} else {
			console.log('No Access Token in callback ??')
		}
	}
	render() {
		return <h1>Redirecting...</h1>
	}
}

export default withRouter(Callback)
