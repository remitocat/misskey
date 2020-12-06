/**
 * Authorize Form
 */

import VueRouter from 'vue-router';

// Style
import './style.scss';
import './style.styl';

import init from '../init';
import Index from './views/index.vue';
import NotFound from '../common/views/pages/not-found.vue';

/**
 * init
 */
init(launch => {
	// Init router
	const router = new VueRouter({
		mode: 'history',
		base: '/miauth/',
		routes: [
			{ path: '/:session', component: Index },
			{ path: '*', component: NotFound }
		]
	});

	// Launch the app
	launch(router);
});
