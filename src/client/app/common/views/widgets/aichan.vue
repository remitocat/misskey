<template>
<div class="mkw-aichan">
	<ui-container :show-header="!props.compact">
		<template #header><fa :icon="faGlobeyarn "/>AI</template>

		<iframe class="dedjhjmo" ref="live2d" @click="touched" src="https://misskey-dev.github.io/mascot-web/"></iframe>
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
		const iframeRect = this.$refs.live2d.getBoundingClientRect();
		window.addEventListener('mousemove', ev => {
			this.$refs.live2d.contentWindow.postMessage({
				type: 'moveCursor',
				body: {
					clientX: ev.clientX - iframeRect.left,
					clientY: ev.clientY - iframeRect.top,
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
}
</style>
