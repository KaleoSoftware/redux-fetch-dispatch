import fetch from 'isomorphic-fetch'

export default function fetchDispatch(url, action) {
	return (dispatch) => {
		return fetch(url, {
			credentials: 'include'
		})
			.then( (response) => {
				return response.json()
			})
			.then( (json) => {
				dispatch(action(json))
			})
			.catch( (error) => {
				console.log(error)
			})
	}
}
