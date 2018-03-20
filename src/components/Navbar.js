import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Input from 'material-ui/Input'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui-icons/Menu'
import AlbumIcon from 'material-ui-icons/Album'
import PlaylistPlayIcon from 'material-ui-icons/PlaylistPlay'
import MusicNoteIcon from 'material-ui-icons/MusicNote'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { isBrowser } from 'react-device-detect'
import drawerWidth from '../drawerWidth'

const styles = theme => ({
	searchInput: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 2,
		[theme.breakpoints.up('sm')]: {
			width: 245
		}
	},
	root: {
		flexGrow: 1,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%'
	},
	appBar: {
		position: 'absolute',
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},
	navIconHide: {
		marginRight: theme.spacing.unit,
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3
	},
	underline: {
		'&:after': {
			backgroundColor: theme.palette.secondary.main
		}
	},
	input: {
		borderBottomColor: 'white',
		color: 'white',
		'&::placeholder': {
			color: 'white'
		}
	}
})

class Navbar extends React.Component {
	constructor() {
		super()
		this.state = {
			mobileOpen: false,
			searchTerm: ''
		}
	}

	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen })
	}
	updateHistory() {
		this.props.history.push(`/search/${this.state.searchTerm}`)
	}

	redirect(location, e) {
		this.handleDrawerToggle()
		this.props.history.push(location)
	}
	handleChange(e) {
		// Only do live updates on desktop browser, where on mobile (or anything else) you have to hit your (virtual) enter key
		if (isBrowser) {
			this.setState({ searchTerm: e.target.value }, this.updateHistory)
		} else {
			this.setState({ searchTerm: e.target.value })
		}
	}
	handleSubmit(e) {
		e.preventDefault()
		this.searchInput.blur()
		this.updateHistory()
	}
	render() {
		const { classes, theme } = this.props

		const drawer = (
			<div>
				<div className={classes.toolbar} />
				<Divider />
				<List>
					<ListItem button onClick={e => this.redirect('/my-tracks', e)}>
						<ListItemIcon>
							<MusicNoteIcon />
						</ListItemIcon>
						<ListItemText primary="My Tracks" />
					</ListItem>
					<ListItem button onClick={e => this.redirect('/my-albums', e)}>
						<ListItemIcon>
							<AlbumIcon />
						</ListItemIcon>
						<ListItemText primary="My Albums" />
					</ListItem>
					<ListItem button onClick={e => this.redirect('/my-playlists', e)}>
						<ListItemIcon>
							<PlaylistPlayIcon />
						</ListItemIcon>
						<ListItemText primary="My Playlists" />
					</ListItem>
				</List>
				<Divider />
			</div>
		)

		return (
			<div className={classes.root}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>
						<Link
							to="/"
							style={{ textDecoration: 'none', color: 'white', flex: 1 }}
						>
							<Typography variant="title" color="inherit" noWrap>
								Apollo
							</Typography>
						</Link>
						<form onSubmit={this.handleSubmit.bind(this)}>
							<Input
								className={classes.searchInput}
								classes={{
									input: classes.input,
									underline: classes.underline
								}}
								inputRef={input => {
									this.searchInput = input
								}}
								type="search"
								onChange={this.handleChange.bind(this)}
								placeholder="Search Albums, Songs or Artists"
							/>
						</form>
					</Toolbar>
				</AppBar>
				<Hidden mdUp>
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{
							paper: classes.drawerPaper
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.props.children}
				</main>
			</div>
		)
	}
}

Navbar.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles, { withTheme: true })(Navbar))
