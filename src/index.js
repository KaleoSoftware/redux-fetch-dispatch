import fetch from 'isomorphic-fetch'

export default function fetchDispatch(url, options = {}, actions = {}) {
	// If there are only two parameters, the second one is actions
	if (actions === {}) {
		actions = options
		options = undefined
	}

	return (dispatch) => {

		if (typeof actions.request === 'function')  {
			actions.request()
		}

		return fetch(url, options)
			.then( (response) => {
				if (response.status.toString().charAt(0) === '2') {
					return response.json()
				} else if (response.status.toString().charAt(0) === '4') {
					throw response.json()
				}
			})
			.then( (json) => {
				if (typeof actions.success === 'function') {
					dispatch(actions.success(json))
				}
				return json
			})
			.catch( (err) => {
				if (typeof actions.fail === 'function') {
					dispatch(actions.fail(err))
				}
				return err
			})
	}
}
