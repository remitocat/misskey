<template>
<div class="nqfhvmnl">
	<template v-if="page == null || page == 'profile'">
		<x-profile/>
		<x-integration/>
	</template>

	<template v-if="page == null || page == 'appearance'">
		<x-theme/>

		<ui-card>
			<template #title><fa icon="desktop"/> {{ $t('@._settings.appearance') }}</template>

			<section v-if="!$root.isMobile">
				<ui-switch v-model="showPostFormOnTopOfTl">{{ $t('@._settings.post-form-on-timeline') }}</ui-switch>
				<ui-button @click="customizeHome">{{ $t('@.customize-home') }}</ui-button>
			</section>
			<section v-if="!$root.isMobile">
				<header>{{ $t('@._settings.wallpaper') }}</header>
				<ui-horizon-group class="fit-bottom">
					<ui-button @click="updateWallpaper">{{ $t('@._settings.choose-wallpaper') }}</ui-button>
					<ui-button @click="deleteWallpaper">{{ $t('@._settings.delete-wallpaper') }}</ui-button>
				</ui-horizon-group>
			</section>
			<section v-if="!$root.isMobile">
				<header>{{ $t('@._settings.navbar-position') }}</header>
				<ui-radio v-model="navbar" value="top">{{ $t('@._settings.navbar-position-top') }}</ui-radio>
				<ui-radio v-model="navbar" value="left">{{ $t('@._settings.navbar-position-left') }}</ui-radio>
				<ui-radio v-model="navbar" value="right">{{ $t('@._settings.navbar-position-right') }}</ui-radio>
			</section>
			<section>
				<ui-switch v-model="useShadow">{{ $t('@._settings.use-shadow') }}</ui-switch>
				<ui-switch v-model="roundedCorners">{{ $t('@._settings.rounded-corners') }}</ui-switch>
				<ui-switch v-model="circleIcons">{{ $t('@._settings.circle-icons') }}</ui-switch>
				<ui-switch v-model="reduceMotion">{{ $t('@._settings.reduce-motion') }}</ui-switch>
				<ui-switch v-model="contrastedAcct">{{ $t('@._settings.contrasted-acct') }}</ui-switch>
				<ui-switch v-model="showFullAcct">{{ $t('@._settings.show-full-acct') }}</ui-switch>
				<ui-switch v-model="showVia">{{ $t('@._settings.show-via') }}</ui-switch>
				<ui-switch v-model="useOsDefaultEmojis">{{ $t('@._settings.use-os-default-emojis') }}</ui-switch>
				<ui-switch v-model="iLikeSushi" disabled>{{ $t('@._settings.i-like-sushi') }}</ui-switch>
			</section>
			<section>
				<ui-switch v-model="suggestRecentHashtags">{{ $t('@._settings.suggest-recent-hashtags') }}</ui-switch>
				<ui-switch v-model="showClockOnHeader" v-if="!$root.isMobile">{{ $t('@._settings.show-clock-on-header') }}</ui-switch>
				<ui-switch v-model="alwaysShowNsfw">{{ $t('@._settings.always-show-nsfw') }}</ui-switch>
				<ui-switch v-model="showReplyTarget">{{ $t('@._settings.show-reply-target') }}</ui-switch>
				<ui-switch v-model="disableAnimatedMfm">{{ $t('@._settings.disable-animated-mfm') }}</ui-switch>
				<ui-switch v-model="disableShowingAnimatedImages">{{ $t('@._settings.disable-showing-animated-images') }}</ui-switch>
				<ui-switch v-model="useAbsoluteTime">{{ $t('@._settings.useAbsoluteTime') }}</ui-switch>
				<ui-switch v-model="remainDeletedNote">{{ $t('@._settings.remain-deleted-note') }}</ui-switch>
				<ui-switch v-model="enableMobileQuickNotificationView">{{ $t('@._settings.enable-quick-notification-view') }}</ui-switch>
			</section>
			<section>
				<header>{{ $t('@._settings.instance-ticker') }}</header>
				<ui-radio v-model="instanceTicker" value="none">{{ $t('@._settings.instance-ticker-none') }}</ui-radio>
				<ui-radio v-model="instanceTicker" value="remote">{{ $t('@._settings.instance-ticker-remote') }}</ui-radio>
			</section>
			<section>
				<header>{{ $t('@._settings.line-width') }}</header>
				<ui-radio v-model="lineWidth" :value="0.5">{{ $t('@._settings.line-width-thin') }}</ui-radio>
				<ui-radio v-model="lineWidth" :value="1">{{ $t('@._settings.line-width-normal') }}</ui-radio>
				<ui-radio v-model="lineWidth" :value="2">{{ $t('@._settings.line-width-thick') }}</ui-radio>
			</section>
			<section>
				<header>{{ $t('@._settings.font-size') }}</header>
				<ui-radio v-model="fontSize" :value="-2">{{ $t('@._settings.font-size-x-small') }}</ui-radio>
				<ui-radio v-model="fontSize" :value="-1">{{ $t('@._settings.font-size-small') }}</ui-radio>
				<ui-radio v-model="fontSize" :value="0">{{ $t('@._settings.font-size-medium') }}</ui-radio>
				<ui-radio v-model="fontSize" :value="1">{{ $t('@._settings.font-size-large') }}</ui-radio>
				<ui-radio v-model="fontSize" :value="2">{{ $t('@._settings.font-size-x-large') }}</ui-radio>
			</section>
			<section v-if="$root.isMobile">
				<header>{{ $t('@._settings.post-style') }}</header>
				<ui-radio v-model="postStyle" value="standard">{{ $t('@._settings.post-style-standard') }}</ui-radio>
				<ui-radio v-model="postStyle" value="smart">{{ $t('@._settings.post-style-smart') }}</ui-radio>
			</section>
			<section v-if="$root.isMobile">
				<header>{{ $t('@._settings.notification-position') }}</header>
				<ui-radio v-model="mobileNotificationPosition" value="bottom">{{ $t('@._settings.notification-position-bottom') }}</ui-radio>
				<ui-radio v-model="mobileNotificationPosition" value="top">{{ $t('@._settings.notification-position-top') }}</ui-radio>
			</section>
			<section>
				<header>{{ $t('@._settings.deck-column-align') }}</header>
				<ui-radio v-model="deckColumnAlign" value="center">{{ $t('@._settings.deck-column-align-center') }}</ui-radio>
				<ui-radio v-model="deckColumnAlign" value="left">{{ $t('@._settings.deck-column-align-left') }}</ui-radio>
				<ui-radio v-model="deckColumnAlign" value="flexible">{{ $t('@._settings.deck-column-align-flexible') }}</ui-radio>
			</section>
			<section>
				<header>{{ $t('@._settings.deck-column-width') }}</header>
				<ui-radio v-model="deckColumnWidth" value="narrow">{{ $t('@._settings.deck-column-width-narrow') }}</ui-radio>
				<ui-radio v-model="deckColumnWidth" value="narrower">{{ $t('@._settings.deck-column-width-narrower') }}</ui-radio>
				<ui-radio v-model="deckColumnWidth" value="normal">{{ $t('@._settings.deck-column-width-normal') }}</ui-radio>
				<ui-radio v-model="deckColumnWidth" value="wider">{{ $t('@._settings.deck-column-width-wider') }}</ui-radio>
				<ui-radio v-model="deckColumnWidth" value="wide">{{ $t('@._settings.deck-column-width-wide') }}</ui-radio>
			</section>
			<section>
				<header>{{ $t('@._settings.deckTemporaryColumnPosition') }}</header>
				<ui-radio v-model="deckTemporaryColumnPosition" value="left">{{ $t('@._settings.deckTemporaryColumnPosition-left') }}</ui-radio>
				<ui-radio v-model="deckTemporaryColumnPosition" value="right">{{ $t('@._settings.deckTemporaryColumnPosition-right') }}</ui-radio>
				<ui-radio v-model="deckTemporaryColumnPosition" value="specify">{{ $t('@._settings.deckTemporaryColumnPosition-specify') }}</ui-radio>
				<ui-select v-if="deckTemporaryColumnPosition === 'specify'" v-model="deckTemporaryColumnIndex" style="margin-bottom: 0 !important;">
					<option value="1">{{ $t('@._settings.deckTemporaryColumnIndex-1') }}</option>
					<option value="2">{{ $t('@._settings.deckTemporaryColumnIndex-2') }}</option>
					<option value="3">{{ $t('@._settings.deckTemporaryColumnIndex-3') }}</option>
					<option value="4">{{ $t('@._settings.deckTemporaryColumnIndex-4') }}</option>
					<option value="5">{{ $t('@._settings.deckTemporaryColumnIndex-5') }}</option>
					<option value="6">{{ $t('@._settings.deckTemporaryColumnIndex-6') }}</option>
					<option value="7">{{ $t('@._settings.deckTemporaryColumnIndex-7') }}</option>
					<option value="8">{{ $t('@._settings.deckTemporaryColumnIndex-8') }}</option>
				</ui-select>
			</section>
			<section>
				<ui-switch v-model="games_reversi_showBoardLabels">{{ $t('@._settings.show-reversi-board-labels') }}</ui-switch>
				<ui-switch v-model="games_reversi_useAvatarStones">{{ $t('@._settings.use-avatar-reversi-stones') }}</ui-switch>
			</section>
		</ui-card>
	</template>

	<template v-if="page == null || page == 'behavior'">
		<ui-card>
			<template #title><fa icon="sliders-h"/> {{ $t('@._settings.behavior') }}</template>

			<section>
				<ui-switch v-model="fetchOnScroll">{{ $t('@._settings.fetch-on-scroll') }}
					<template #desc>{{ $t('@._settings.fetch-on-scroll-desc') }}</template>
				</ui-switch>
				<ui-switch v-model="keepCw">{{ $t('@._settings.keep-cw') }}
					<template #desc>{{ $t('@._settings.keep-cw-desc') }}</template>
				</ui-switch>
				<ui-switch v-if="$root.isMobile" v-model="disableViaMobile">{{ $t('@._settings.disable-via-mobile') }}</ui-switch>
			</section>

			<section>
				<header>{{ $t('@._settings.reactions') }}</header>
				<ui-textarea v-model="reactions">
					{{ $t('@._settings.reactions') }}<template #desc>{{ $t('@._settings.reactions-description') }}</template>
				</ui-textarea>
				<ui-horizon-group>
					<ui-button @click="save('reactions', reactions.trim().split('\n'))" primary><fa :icon="faSave"/> {{ $t('@._settings.save') }}</ui-button>
					<ui-button @click="previewReaction()" ref="reactionsPreviewButton"><fa :icon="faEye"/> {{ $t('@._settings.preview') }}</ui-button>
				</ui-horizon-group>
			</section>

			<section>
				<header>{{ $t('@._settings.timeline') }}</header>
				<ui-switch v-model="showMyRenotes">{{ $t('@._settings.show-my-renotes') }}</ui-switch>
				<ui-switch v-model="showRenotedMyNotes">{{ $t('@._settings.show-renoted-my-notes') }}</ui-switch>
				<ui-switch v-model="showLocalRenotes">{{ $t('@._settings.show-local-renotes') }}</ui-switch>
			</section>

			<section>
				<header>{{ $t('@._settings.note-visibility') }}</header>
				<ui-switch v-model="rememberNoteVisibility">{{ $t('@._settings.remember-note-visibility') }}</ui-switch>
				<section>
					<header>{{ $t('@._settings.default-note-visibility') }}</header>
					<ui-select v-model="defaultNoteVisibility">
						<option value="public">{{ $t('@.note-visibility.public') }}</option>
						<option value="home">{{ $t('@.note-visibility.home') }}</option>
						<option value="followers">{{ $t('@.note-visibility.followers') }}</option>
						<option value="specified">{{ $t('@.note-visibility.specified') }}</option>
						<option value="local-public">{{ $t('@.note-visibility.local-public') }}</option>
						<option value="local-home">{{ $t('@.note-visibility.local-home') }}</option>
						<option value="local-followers">{{ $t('@.note-visibility.local-followers') }}</option>
					</ui-select>
				</section>
			</section>

			<section>
				<header>{{ $t('@._settings.sync') }}</header>
				<ui-input v-if="$root.isMobile" v-model="mobileHomeProfile" :datalist="Object.keys($store.state.settings.mobileHomeProfiles)">{{ $t('@._settings.home-profile') }}</ui-input>
				<ui-input v-else v-model="homeProfile" :datalist="Object.keys($store.state.settings.homeProfiles)">{{ $t('@._settings.home-profile') }}</ui-input>
				<ui-input v-model="deckProfile" :datalist="Object.keys($store.state.settings.deckProfiles)">{{ $t('@._settings.deck-profile') }}</ui-input>
			</section>

			<section>
				<header>{{ $t('@._settings.web-search-engine') }}</header>
				<ui-input v-model="webSearchEngine">{{ $t('@._settings.web-search-engine') }}
					<template #desc>{{ $t('@._settings.web-search-engine-desc') }}</template>
				</ui-input>
				<ui-button @click="save('webSearchEngine', webSearchEngine)"><fa :icon="faSave"/> {{ $t('@._settings.save') }}</ui-button>
			</section>

			<section v-if="!$root.isMobile">
				<header>{{ $t('@._settings.paste') }}</header>
				<ui-input v-model="pastedFileName">{{ $t('@._settings.pasted-file-name') }}
					<template v-if="pastedFileName === this.$store.state.settings.pastedFileName" #desc>{{ $t('@._settings.pasted-file-name-desc') }}</template>
					<template v-else #desc>{{ pastedFileNamePreview() }}</template>
				</ui-input>
				<ui-button @click="save('pastedFileName', pastedFileName)"><fa :icon="faSave"/> {{ $t('@._settings.save') }}</ui-button>

				<ui-switch v-model="pasteDialog">{{ $t('@._settings.paste-dialog') }}
					<template #desc>{{ $t('@._settings.paste-dialog-desc') }}</template>
				</ui-switch>
			</section>

			<section>
				<header>{{ $t('@._settings.hasDisconnectedAction') }}</header>
				<ui-select v-model="hasDisconnectedAction">
					<option value="reload">{{ $t('@._settings._hasDisconnectedAction.reload') }}</option>
					<option value="notify">{{ $t('@._settings._hasDisconnectedAction.notify') }}</option>
					<option value="nothing">{{ $t('@._settings._hasDisconnectedAction.nothing') }}</option>
				</ui-select>
			</section>

			<section>
				<header>{{ $t('@._settings.room') }}</header>
				<ui-select v-model="roomGraphicsQuality">
					<template #label>{{ $t('@._settings._room.graphicsQuality') }}</template>
					<option value="ultra">{{ $t('@._settings._room._graphicsQuality.ultra') }}</option>
					<option value="high">{{ $t('@._settings._room._graphicsQuality.high') }}</option>
					<option value="medium">{{ $t('@._settings._room._graphicsQuality.medium') }}</option>
					<option value="low">{{ $t('@._settings._room._graphicsQuality.low') }}</option>
					<option value="cheep">{{ $t('@._settings._room._graphicsQuality.cheep') }}</option>
				</ui-select>
				<ui-switch v-model="roomUseOrthographicCamera">{{ $t('@._settings._room.useOrthographicCamera') }}</ui-switch>
			</section>

			<section>
				<header>{{ $t('@._settings.mascot') }}</header>
				<ui-input v-model="mascotWidgetUrl">{{ $t('@._settings._mascot.widget-url') }}
					<template #desc>{{ $t('@._settings._mascot.widget-url-desc') }}</template>
				</ui-input>
				<!--
					todo: ボタン押したら保存
				<ui-button @click="save('mascotWidgetUrl', mascotWidgetUrl)"><fa :icon="faSave"/> {{ $t('@._settings.save') }}</ui-button>
				-->
			</section>
		</ui-card>

		<ui-card>
			<template #title><fa icon="volume-up"/> {{ $t('@._settings.sound') }}</template>

			<section>
				<ui-switch v-model="enableSounds">{{ $t('@._settings.enable-sounds') }}
					<template #desc>{{ $t('@._settings.enable-sounds-desc') }}</template>
				</ui-switch>
				<ui-switch :disabled="!enableSounds" v-model="enableSoundsInTimeline">{{ $t('@._settings.enable-sounds-timeline') }}
				</ui-switch>
				<ui-switch :disabled="!enableSounds" v-model="enableSoundsInNotifications">{{ $t('@._settings.enable-sounds-notifications') }}
				</ui-switch>
				<label>{{ $t('@._settings.volume') }}</label>
				<input type="range"
					v-model="soundVolume"
					:disabled="!enableSounds"
					max="1"
					step="0.1"
				/>
				<ui-button @click="soundTest"><fa icon="volume-up"/> {{ $t('@._settings.test') }}</ui-button>
			</section>

			<section>
				<ui-switch v-model="enableQueueJammed">{{ $t('@._settings.enable-queue-jammed') }}
					<template #desc>{{ $t('@._settings.enable-queue-jammed-desc') }}</template>
				</ui-switch>
				<ui-switch v-model="enableSpeech">{{ $t('@._settings.enable-speech') }}
					<template #desc>{{ $t('@._settings.enable-speech-desc') }}</template>
				</ui-switch>
			</section>
		</ui-card>

		<x-language/>
		<x-app-type/>
	</template>

	<template v-if="page == null || page == 'notification'">
		<x-notification/>
	</template>

	<template v-if="page == null || page == 'drive'">
		<x-drive/>
	</template>

	<template v-if="page == null || page == 'hashtags'">
		<ui-card>
			<template #title><fa icon="hashtag"/> {{ $t('@._settings.tags') }}</template>
			<section>
				<x-tags/>
			</section>
		</ui-card>
	</template>

	<template v-if="page == null || page == 'muteAndBlock'">
		<x-mute-and-block/>
	</template>

	<template v-if="page == null || page == 'apps'">
		<ui-card>
			<template #title><fa icon="puzzle-piece"/> wip:{{ $t('@._settings.apps') }}</template>
			<section>
				<x-apps/>
			</section>
		</ui-card>
	</template>

	<template v-if="page == null || page == 'security'">
		<ui-card>
			<template #title><fa icon="unlock-alt"/> {{ $t('@._settings.password') }}</template>
			<section>
				<x-password/>
			</section>
		</ui-card>

		<ui-card v-if="!$root.isMobile">
			<template #title><fa icon="mobile-alt"/> {{ $t('@.2fa') }}</template>
			<section>
				<x-2fa/>
			</section>
		</ui-card>

		<ui-card>
			<template #title><fa icon="sign-in-alt"/> {{ $t('@._settings.signin') }}</template>
			<section>
				<x-signins/>
			</section>
		</ui-card>
	</template>

	<template v-if="page == null || page == 'api'">
		<x-api/>
	</template>

	<template v-if="page == null || page == 'other'">
		<ui-card>
			<template #title><fa icon="sync-alt"/> {{ $t('@._settings.update') }}</template>
			<section>
				<p>
					<span>{{ $t('@._settings.version') }} <i>{{ version }}</i></span>
					<template v-if="latestVersion !== undefined">
						<br>
						<span>{{ $t('@._settings.latest-version') }} <i>{{ latestVersion ? latestVersion : version }}</i></span>
					</template>
				</p>
				<ui-button @click="checkForUpdate" :disabled="checkingForUpdate">
					<template v-if="checkingForUpdate">{{ $t('@._settings.update-checking') }}<mk-ellipsis/></template>
					<template v-else>{{ $t('@._settings.do-update') }}</template>
				</ui-button>
			</section>
		</ui-card>

		<x-account-info/>

		<ui-card>
			<template #title><fa icon="cogs"/> {{ $t('@._settings.advanced-settings') }}</template>
			<section>
				<ui-switch v-model="showAdvancedSettings">
					{{ $t('@._settings.ShowAdvancedSettings') }}
				</ui-switch>
				<ui-switch v-model="debug" v-if="isAdvanced">
					{{ $t('@._settings.debug-mode') }}<template #desc>{{ $t('@._settings.debug-mode-desc') }}</template>
				</ui-switch>
				<section v-if="isAdvanced">
					<x-reg-edit/>
				</section>
			</section>
		</ui-card>
	</template>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../../../i18n';
import X2fa from './2fa.vue';
import XApps from './apps.vue';
import XSignins from './signins.vue';
import XTags from './tags.vue';
import XIntegration from './integration.vue';
import XAccountInfo from './account-info.vue';
import XTheme from './theme.vue';
import XDrive from './drive.vue';
import XMuteAndBlock from './mute-and-block.vue';
import XPassword from './password.vue';
import XProfile from './profile.vue';
import XApi from './api.vue';
import XLanguage from './language.vue';
import XAppType from './app-type.vue';
import XNotification from './notification.vue';
import XRegEdit from './regedit.vue';
import MkReactionPicker from '../reaction-picker.vue';

import { url, version } from '../../../../config';
import { ColdDeviceStorage } from '../../../../store';
import * as sound from '../../../../common/scripts/sound';
import checkForUpdate from '../../../scripts/check-for-update';
import { formatTimeString } from '../../../../../../misc/format-time-string';
import { faSave, faEye } from '@fortawesome/free-regular-svg-icons';

export default Vue.extend({
	i18n: i18n(),
	components: {
		X2fa,
		XApps,
		XSignins,
		XTags,
		XIntegration,
		XAccountInfo,
		XTheme,
		XDrive,
		XMuteAndBlock,
		XPassword,
		XProfile,
		XApi,
		XLanguage,
		XAppType,
		XRegEdit,
		XNotification,
	},
	props: {
		page: {
			type: String,
			required: false,
			default: null
		}
	},
	data() {
		return {
			meta: null,
			version,
			reactions: this.$store.state.settings.reactions.join('\n'),
			webSearchEngine: this.$store.state.settings.webSearchEngine,
			pastedFileName : this.$store.state.settings.pastedFileName,
			latestVersion: undefined,
			checkingForUpdate: false,
			faSave, faEye
		};
	},
	computed: {
		isAdvanced(): boolean {
			return this.$store.state.device.showAdvancedSettings;
		},

		useOsDefaultEmojis: {
			get() { return this.$store.state.device.useOsDefaultEmojis; },
			set(value) { this.$store.commit('device/set', { key: 'useOsDefaultEmojis', value }); }
		},

		reduceMotion: {
			get() { return this.$store.state.device.reduceMotion; },
			set(value) { this.$store.commit('device/set', { key: 'reduceMotion', value }); }
		},

		keepCw: {
			get() { return this.$store.state.settings.keepCw; },
			set(value) { this.$store.commit('settings/set', { key: 'keepCw', value }); }
		},

		navbar: {
			get() { return this.$store.state.device.navbar; },
			set(value) { this.$store.commit('device/set', { key: 'navbar', value }); }
		},

		deckColumnAlign: {
			get() { return this.$store.state.device.deckColumnAlign; },
			set(value) { this.$store.commit('device/set', { key: 'deckColumnAlign', value }); }
		},

		deckColumnWidth: {
			get() { return this.$store.state.device.deckColumnWidth; },
			set(value) { this.$store.commit('device/set', { key: 'deckColumnWidth', value }); }
		},

		deckTemporaryColumnPosition: {
			get() { return this.$store.state.device.deckTemporaryColumnPosition || 'right'; },
			set(value) { this.$store.commit('device/set', { key: 'deckTemporaryColumnPosition', value }); }
		},

		deckTemporaryColumnIndex: {
			get() { return this.$store.state.device.deckTemporaryColumnIndex || 1; },
			set(value) { this.$store.commit('device/set', { key: 'deckTemporaryColumnIndex', value }); }
		},

		enableSounds: {
			get() { return this.$store.state.device.enableSounds; },
			set(value) { this.$store.commit('device/set', { key: 'enableSounds', value }); }
		},

		enableSoundsInTimeline: {
			get() { return this.$store.state.device.enableSoundsInTimeline; },
			set(value) { this.$store.commit('device/set', { key: 'enableSoundsInTimeline', value }); }
		},

		enableSoundsInNotifications: {
			get() { return this.$store.state.device.enableSoundsInNotifications; },
			set(value) { this.$store.commit('device/set', { key: 'enableSoundsInNotifications', value }); }
		},

		enableQueueJammed: {
			get() { return this.$store.state.device.enableQueueJammed; },
			set(value) { this.$store.commit('device/set', { key: 'enableQueueJammed', value }); }
		},

		enableSpeech: {
			get() { return this.$store.state.device.enableSpeech; },
			set(value) { this.$store.commit('device/set', { key: 'enableSpeech', value }); }
		},

		soundVolume: {
			get() { return ColdDeviceStorage.get('sound_masterVolume'); },
			set(value) { ColdDeviceStorage.set('sound_masterVolume', value); }
		},

		debug: {
			get() { return this.$store.state.device.debug; },
			set(value) { this.$store.commit('device/set', { key: 'debug', value }); }
		},

		showAdvancedSettings: {
			get() { return this.$store.state.device.showAdvancedSettings; },
			set(value) { this.$store.commit('device/set', { key: 'showAdvancedSettings', value }); }
		},

		alwaysShowNsfw: {
			get() { return this.$store.state.device.alwaysShowNsfw; },
			set(value) { this.$store.commit('device/set', { key: 'alwaysShowNsfw', value }); }
		},

		postStyle: {
			get() { return this.$store.state.device.postStyle; },
			set(value) { this.$store.commit('device/set', { key: 'postStyle', value }); }
		},

		disableViaMobile: {
			get() { return this.$store.state.settings.disableViaMobile; },
			set(value) { this.$store.dispatch('settings/set', { key: 'disableViaMobile', value }); }
		},

		useShadow: {
			get() { return this.$store.state.device.useShadow; },
			set(value) { this.$store.commit('device/set', { key: 'useShadow', value }); }
		},

		roundedCorners: {
			get() { return this.$store.state.device.roundedCorners; },
			set(value) { this.$store.commit('device/set', { key: 'roundedCorners', value }); }
		},

		instanceTicker: {
			get() { return this.$store.state.device.instanceTicker; },
			set(value) { this.$store.commit('device/set', { key: 'instanceTicker', value }); }
		},

		lineWidth: {
			get() { return this.$store.state.device.lineWidth; },
			set(value) { this.$store.commit('device/set', { key: 'lineWidth', value }); }
		},

		fontSize: {
			get() { return this.$store.state.device.fontSize; },
			set(value) { this.$store.commit('device/set', { key: 'fontSize', value }); }
		},

		fetchOnScroll: {
			get() { return this.$store.state.settings.fetchOnScroll; },
			set(value) { this.$store.dispatch('settings/set', { key: 'fetchOnScroll', value }); }
		},

		rememberNoteVisibility: {
			get() { return this.$store.state.settings.rememberNoteVisibility; },
			set(value) { this.$store.dispatch('settings/set', { key: 'rememberNoteVisibility', value }); }
		},

		defaultNoteVisibility: {
			get() { return this.$store.state.settings.defaultNoteVisibility; },
			set(value) { this.$store.dispatch('settings/set', { key: 'defaultNoteVisibility', value }); }
		},

		pasteDialog: {
			get() { return this.$store.state.settings.pasteDialog; },
			set(value) { this.$store.dispatch('settings/set', { key: 'pasteDialog', value }); }
		},

		showReplyTarget: {
			get() { return this.$store.state.settings.showReplyTarget; },
			set(value) { this.$store.dispatch('settings/set', { key: 'showReplyTarget', value }); }
		},

		showMyRenotes: {
			get() { return this.$store.state.settings.showMyRenotes; },
			set(value) { this.$store.dispatch('settings/set', { key: 'showMyRenotes', value }); }
		},

		showRenotedMyNotes: {
			get() { return this.$store.state.settings.showRenotedMyNotes; },
			set(value) { this.$store.dispatch('settings/set', { key: 'showRenotedMyNotes', value }); }
		},

		showLocalRenotes: {
			get() { return this.$store.state.settings.showLocalRenotes; },
			set(value) { this.$store.dispatch('settings/set', { key: 'showLocalRenotes', value }); }
		},

		showPostFormOnTopOfTl: {
			get() { return this.$store.state.settings.showPostFormOnTopOfTl; },
			set(value) { this.$store.dispatch('settings/set', { key: 'showPostFormOnTopOfTl', value }); }
		},

		suggestRecentHashtags: {
			get() { return this.$store.state.settings.suggestRecentHashtags; },
			set(value) { this.$store.dispatch('settings/set', { key: 'suggestRecentHashtags', value }); }
		},

		showClockOnHeader: {
			get() { return this.$store.state.settings.showClockOnHeader; },
			set(value) { this.$store.dispatch('settings/set', { key: 'showClockOnHeader', value }); }
		},

		circleIcons: {
			get() { return this.$store.state.settings.circleIcons; },
			set(value) {
				this.$store.dispatch('settings/set', { key: 'circleIcons', value });
				this.reload();
			}
		},

		contrastedAcct: {
			get() { return this.$store.state.settings.contrastedAcct; },
			set(value) {
				this.$store.dispatch('settings/set', { key: 'contrastedAcct', value });
				this.reload();
			}
		},

		showFullAcct: {
			get() { return this.$store.state.settings.showFullAcct; },
			set(value) {
				this.$store.dispatch('settings/set', { key: 'showFullAcct', value });
				this.reload();
			}
		},

		showVia: {
			get() { return this.$store.state.settings.showVia; },
			set(value) { this.$store.dispatch('settings/set', { key: 'showVia', value }); }
		},

		iLikeSushi: {
			get() { return this.$store.state.settings.iLikeSushi; },
			set(value) { this.$store.dispatch('settings/set', { key: 'iLikeSushi', value }); }
		},

		hasDisconnectedAction: {
			get() { return this.$store.state.device.hasDisconnectedAction; },
			set(value) { this.$store.commit('device/set', { key: 'hasDisconnectedAction', value }); }
		},

		roomUseOrthographicCamera: {
			get() { return this.$store.state.device.roomUseOrthographicCamera; },
			set(value) { this.$store.commit('device/set', { key: 'roomUseOrthographicCamera', value }); }
		},

		roomGraphicsQuality: {
			get() { return this.$store.state.device.roomGraphicsQuality; },
			set(value) { this.$store.commit('device/set', { key: 'roomGraphicsQuality', value }); }
		},

		mascotWidgetUrl: {
			get() { return ColdDeviceStorage.get('mascot_widget_url'); },
			set(value) { ColdDeviceStorage.set('mascot_widget_url', value); }
		},

		games_reversi_showBoardLabels: {
			get() { return this.$store.state.settings.gamesReversiShowBoardLabels; },
			set(value) { this.$store.dispatch('settings/set', { key: 'gamesReversiShowBoardLabels', value }); }
		},

		games_reversi_useAvatarStones: {
			get() { return this.$store.state.settings.gamesReversiUseAvatarStones; },
			set(value) { this.$store.dispatch('settings/set', { key: 'gamesReversiUseAvatarStones', value }); }
		},

		disableAnimatedMfm: {
			get() { return this.$store.state.settings.disableAnimatedMfm; },
			set(value) { this.$store.dispatch('settings/set', { key: 'disableAnimatedMfm', value }); }
		},

		disableShowingAnimatedImages: {
			get() { return this.$store.state.device.disableShowingAnimatedImages; },
			set(value) { this.$store.commit('device/set', { key: 'disableShowingAnimatedImages', value }); }
		},

		remainDeletedNote: {
			get() { return this.$store.state.settings.remainDeletedNote; },
			set(value) { this.$store.dispatch('settings/set', { key: 'remainDeletedNote', value }); }
		},

		useAbsoluteTime: {
			get() { return !!this.$store.state.device.useAbsoluteTime; },
			set(value) { this.$store.commit('device/set', { key: 'useAbsoluteTime', value }); }
		},

		mobileNotificationPosition: {
			get() { return this.$store.state.device.mobileNotificationPosition; },
			set(value) { this.$store.commit('device/set', { key: 'mobileNotificationPosition', value }); }
		},

		enableMobileQuickNotificationView: {
			get() { return this.$store.state.device.enableMobileQuickNotificationView; },
			set(value) { this.$store.commit('device/set', { key: 'enableMobileQuickNotificationView', value }); }
		},

		homeProfile: {
			get() { return this.$store.state.device.homeProfile; },
			set(value) { this.$store.commit('device/set', { key: 'homeProfile', value }); }
		},

		mobileHomeProfile: {
			get() { return this.$store.state.device.mobileHomeProfile; },
			set(value) { this.$store.commit('device/set', { key: 'mobileHomeProfile', value }); }
		},

		deckProfile: {
			get() { return this.$store.state.device.deckProfile; },
			set(value) { this.$store.commit('device/set', { key: 'deckProfile', value }); }
		},
	},
	created() {
		this.$root.getMeta().then(meta => {
			this.meta = meta;
		});
	},
	methods: {
		reload() {
			this.$root.dialog({
				type: 'warning',
				text: this.$t('@.reload-to-apply-the-setting'),
				showCancelButton: true
			}).then(({ canceled }) => {
				if (!canceled) {
					location.reload();
				}
			});
		},
		save(key, value) {
			this.$store.dispatch('settings/set', {
				key,
				value
			}).then(() => {
				this.$root.dialog({
					type: 'success',
					text: this.$t('@._settings.saved')
				})
			});
		},
		customizeHome() {
			location.href = '/?customize';
		},
		updateWallpaper() {
			this.$chooseDriveFile({
				multiple: false
			}).then(file => {
				this.$store.dispatch('settings/set', { key: 'wallpaper', value: file.url });
			});
		},
		deleteWallpaper() {
			this.$store.dispatch('settings/set', { key: 'wallpaper', value: null });
		},
		checkForUpdate() {
			this.checkingForUpdate = true;
			checkForUpdate(this.$root, true, true).then(newer => {
				this.checkingForUpdate = false;
				this.latestVersion = newer;
				if (newer == null) {
					this.$root.dialog({
						title: this.$t('@._settings.no-updates'),
						text: this.$t('@._settings.no-updates-desc')
					});
				} else {
					this.$root.dialog({
						title: this.$t('@._settings.update-available'),
						text: this.$t('@._settings.update-available-desc')
					});
				}
			});
		},
		soundTest() {
			sound.play('chatBg');
		},
		pastedFileNamePreview() {
			return `${formatTimeString(new Date(), this.pastedFileName).replace(/{{number}}/g, `1`)}.png`
		},
		previewReaction() {
			const picker = this.$root.new(MkReactionPicker, {
				source: this.$refs.reactionsPreviewButton.$el,
				reactions: this.reactions.trim().split('\n'),
				showFocus: false,
			});
			picker.$once('chosen', ({ reaction } : { reaction: string }) => {
				picker.close();
			});
		}
	}
});
</script>
