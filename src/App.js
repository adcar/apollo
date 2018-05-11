import React, { Component } from 'react'
import './index.css'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'
import Navbar from './containers/Navbar'
import PlaylistPlayer from './containers/PlaylistPlayer'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import storage from 'redux-persist/lib/storage'

import Collection from './routes/Collection'
import Artist from './routes/Artist'
import Home from './routes/Home'
import Album from './routes/Album'
import Playlist from './routes/Playlist'
import Category from './routes/Category'
import Callback from './routes/Callback'
import Search from './routes/Search'

import blue from 'material-ui/colors/blue'
import amber from 'material-ui/colors/amber'

// Redux configuration
const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(thunk))
)

const persistor = persistStore(store)

const theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: blue,
		secondary: amber,
		background: {
			default: 'white'
		}
	}
})

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<MuiThemeProvider theme={theme}>
						<CssBaseline />
						<Router>
							<div>
								<Navbar>
									<Route
										exact
										path="/"
										render={() => <Redirect to="/browse" />}
									/>
									<Route path="/browse" component={Home} />
									<Route path="/callback" component={Callback} />
									<Route path="/artist/:id" component={Artist} />
									<Route path="/collection" component={Collection} />
									<Route path="/album/:id" component={Album} />
									<Route path="/playlist/:user/:id" component={Playlist} />
									<Route path="/category/:id" component={Category} />
									<Route path="/search" component={Search} />
								</Navbar>
								<PlaylistPlayer />
							</div>
						</Router>
					</MuiThemeProvider>
				</PersistGate>
			</Provider>
		)
	}
}
export default App
