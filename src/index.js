import fetch from 'isomorphic-fetch'

export default function fetchDispatch(url, options = {}, actions = {}) {
	return (dispatch) => {

		if (typeof actions.request === 'function')  {
			actions.request()
		}

		return fetch(url, options)
			.then( (response) => {
				return response.json()
			})
			.then( (json) => {
				if (typeof actions.success === 'function') {
					dispatch(action(json))
				}

				return json
			})
			.catch( (err) => {
				if (typeof actions.fail === 'function') {
					dispatch(actions.fail(err))
				}
			})
	}
}
