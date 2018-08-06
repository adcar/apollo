const initialState = {
	filter: '' // Nothing, meaning clean
}

const settings = (state = initialState, action) => {
	switch (action.type) {
		case 'APPLY_FILTER':
			return {
				...state,
				filter: action.payload
			}
		default:
			return state
	}
}

export default settings
