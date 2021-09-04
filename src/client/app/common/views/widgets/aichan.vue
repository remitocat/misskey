<template>
<div class="mkw-aichan">
	<ui-container :show-header="!props.compact">
		<template #header><fa :icon="faGlobeyarn "/>AI</template>

		<iframe v-if="$store.state.aiChanMode" class="ivnzpscs" ref="live2d" src="https://misskey-dev.github.io/mascot-web/?scale=1.5&y=1.1&eyeY=100"></iframe>
	</ui-container>
</div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from '@vue/composition-api';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import define from '../../define-widget';

const widget = define({
	name: 'aichan',
	props: () => ({
		compact: {
			type: 'boolean',
			default: false
		},
	})
});
export default defineComponent({
	extends: widget,
	data() {
		return {
			faGlobe,
		};
	},
	mounted() {
		window.addEventListener('mousemove', ev => {
			const iframeRect = this.$refs.live2d.getBoundingClientRect();
			this.$refs.live2d.contentWindow.postMessage({
				type: 'moveCursor',
				body: {
					x: ev.clientX - iframeRect.left,
					y: ev.clientY - iframeRect.top,
				}
			}, '*');
		}, { passive: true });
	},
	methods: {
		touched() {
			if (this.live2d) this.live2d.changeExpression('gurugurume');
		}
	}
});
</script>

<style lang="scss" scoped>
.dedjhjmo {
	width: 100%;
	height: 350px;
	border: none;
	pointer-events: none;
}
</style>
