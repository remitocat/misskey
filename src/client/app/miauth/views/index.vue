<template>
<div v-if="$store.getters.isSignedIn">
	<!--
	<div class="waiting _card" v-if="state == 'waiting'">
		<div class="_content">
			<mk-loading/>
		</div>
	</div>
	-->
	<div class="denied _card" v-if="state == 'denied'">
		<div class="_content">
			<p>{{ $t('denied') }}</p>
		</div>
	</div>
	<div class="accepted _card" v-else-if="state == 'accepted'">
		<div class="_content">
			<p v-if="callback">{{ $t('auth.callback') }}<mk-ellipsis/></p>
			<p v-else>{{ $t('please-go-back') }}</p>
		</div>
	</div>
	<div class="_card" v-else>
		<div class="_title" v-if="name">{{ $t('share-access', { name: name }) }}</div>
		<div class="_title" v-else>{{ $t('share-access-ask') }}</div>
		<div class="_content">
			<p>{{ $t('permission-ask') }}</p>
			<ul>
				<template v-for="p in permission">
					<li :key="p">{{ p }}</li>
				</template>
			</ul>
		</div>
		<div class="_footer">
			<ui-button @click="deny" inline>{{ $t('cancel') }}</ui-button>
			<ui-button @click="accept" inline primary>{{ $t('accept') }}</ui-button>
		</div>
	</div>
</div>
<div class="signin" v-else>
	<mk-signin/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../i18n';
//import MkSignin from '../components/signin.vue';
//import MkButton from '../components/ui/button.vue';

export default Vue.extend({
	i18n: i18n('miauth/views/index.vue'),
	components: {
//		MkSignin,
//		MkButton,
	},
	data() {
		return {
			state: null
		};
	},
	computed: {
		session(): string {
			return this.$route.params.session;
		},
		callback(): string {
			return this.$route.query.callback;
		},
		name(): string {
			return this.$route.query.name;
		},
		permission(): string {
			return this.$route.query.permission;
		},
	},
	methods: {
		async accept() {
			this.state = 'waiting';
			await this.$root.api('miauth/gen-token', {
				session: this.session,
				name: this.name,
				permission: this.permission || [],
			});
			this.state = 'accepted';
			if (this.callback) {
				location.href = `${this.callback}?session=${this.session}`;
			}
		},
		deny() {
			this.state = 'denied';
		},
		onLogin(res) {
			localStorage.setItem('i', res.i);
			location.reload();
		}
	}
});
</script>

<style lang="scss" scoped>
</style>
