redux-fetch-dispatch
==========

Connect your redux app to your api without using [redux-thunk](https://github.com/gaearon/redux-thunk)

```js
npm install --save redux-fetch-dispatch
```

```js
fetchDispatch('api.example.com', receiveAction)(store.dispatch)
```

## Motivation

The [Redux docs](http://rackt.org/redux/docs/advanced/AsyncActions.html) recommend using [redux-thunk](https://github.com/gaearon/redux-thunk) for getting data from an API and then dispatching an action when it comes back.

This ends up creating a lot of unnecessary action creators with hard-coded URLs, spread out over many files. It's also difficult to test these action creators without mocking a server connection.

AND, if your API returns urls for use, you're kinda SOL.

Thus, redux-fetch-dispatch ;)

## Composition

/src/constants/URLs.js
```js
const BASE_URL = "https://api.my-company.com"

export const POST = (id) => BASE_URL+'/posts/'+id
```

to make a call to the api (say on route change):
```js
store = createStore(...)

let matches = window.location.pathname.match(/^\/posts\/([0-9]+)$/)

fetchDispatch(URLs.POST(matches[1]), receivePost)(store.dispatch)
```

/src/actions/posts.js
```
export function receivePost(post) {
	return {
		type: 'RECEIVE_POST,
		payload: post
	}
}
```

## Thanks!! :)

## License
MIT
