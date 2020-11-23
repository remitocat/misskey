<template>
<x-code :code="code" :lang="lang" :inline="inline"/>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
	components: {
		XCode: () => import('./code-core.vue').then(m => m.default)
	},

	props: {
		code: {
			type: String,
			required: true
		},
		lang: {
			type: String,
			required: false
		},
		inline: {
			type: Boolean,
			required: false
		}
	}
});
</script>
