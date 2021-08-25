<template>
<div class="mkw-aichan">
	<ui-container :show-header="!props.compact">
		<template #header><fa :icon="faGlobe"/>AI</template>

		<canvas class="dedjhjmo" ref="canvas" @click="touched"></canvas>
	</ui-container>
</div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from '@vue/composition-api';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import define from '../../define-widget';
import { load as loadLive2d } from '../../scripts/live2d/index';
const widget = define({
	name: 'ai',
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
			live2d: null,
			faGlobe,
		};
	},
	mounted() {
		this.$nextTick(() => {
			loadLive2d(this.$refs.canvas, {
				scale: 1.6,
				y: 1.1
			}).then(live2d => {
				this.live2d = markRaw(live2d);
			});
		});
	},
	methods: {
		touched() {
			this.live2d.changeExpression('gurugurume');
		}
	}
});
</script>

<style lang="scss" scoped>
.dedjhjmo {
	width: 100%;
	height: 350px;
}
</style>
