import {increment, decrement, reset} from './actions/counter.js';

import store from './store.js';

console.log(store.getState());

//subscribe() 会返回一个函数来注销监听器
let unsubscribe = store.subscribe( () => {
	console.log(store.getState())
});

store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

//停止监听state
unsubscribe();