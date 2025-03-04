import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Meta {
	@PrimaryColumn({
		type: 'varchar',
		length: 32
	})
	public id: string;

	@Column('varchar', {
		length: 128, nullable: true
	})
	public name: string | null;

	@Column('varchar', {
		length: 1024, nullable: true
	})
	public description: string | null;

	/**
	 * メンテナの名前
	 */
	@Column('varchar', {
		length: 128, nullable: true
	})
	public maintainerName: string | null;

	/**
	 * メンテナの連絡先
	 */
	@Column('varchar', {
		length: 128, nullable: true
	})
	public maintainerEmail: string | null;

	@Column('jsonb', {
		default: [],
	})
	public announcements: Record<string, any>[];

	@Column('boolean', {
		default: false,
	})
	public disableRegistration: boolean;

	@Column('boolean', {
		default: false,
	})
	public disableLocalTimeline: boolean;

	@Column('boolean', {
		default: false,
	})
	public disableGlobalTimeline: boolean;

	@Column('boolean', {
		default: true,
	})
	public enableEmojiReaction: boolean;

	@Column('boolean', {
		default: true,
	})
	public useStarForReactionFallback: boolean;

	@Column('varchar', {
		length: 64, array: true, default: '{}'
	})
	public langs: string[];

	@Column('varchar', {
		length: 256, array: true, default: '{}'
	})
	public pinnedUsers: string[];

	@Column('varchar', {
		length: 256, array: true, default: '{}'
	})
	public hiddenTags: string[];

	@Column('varchar', {
		length: 256, array: true, default: '{}'
	})
	public blockedHosts: string[];

	@Column('varchar', {
		length: 512,
		nullable: true,
		default: '/assets/ai.png'
	})
	public mascotImageUrl: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public bannerUrl: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public backgroundImageUrl: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public logoImageUrl: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true,
		default: 'https://xn--931a.moe/aiart/yubitun.png'
	})
	public errorImageUrl: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public iconUrl: string | null;

	@Column('boolean', {
		default: true,
	})
	public cacheRemoteFiles: boolean;

	@Column('boolean', {
		default: false,
	})
	public proxyRemoteFiles: boolean;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public proxyAccount: string | null;

	@Column('boolean', {
		default: false,
	})
	public enableRecaptcha: boolean;

	@Column('varchar', {
		length: 64,
		nullable: true
	})
	public recaptchaSiteKey: string | null;

	@Column('varchar', {
		length: 64,
		nullable: true
	})
	public recaptchaSecretKey: string | null;

	@Column('integer', {
		default: 1024,
		comment: 'Drive capacity of a local user (MB)'
	})
	public localDriveCapacityMb: number;

	@Column('integer', {
		default: 32,
		comment: 'Drive capacity of a remote user (MB)'
	})
	public remoteDriveCapacityMb: number;

	@Column('integer', {
		default: 500,
		comment: 'Max allowed note text length in characters'
	})
	public maxNoteTextLength: number;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public summalyProxy: string | null;

	@Column('boolean', {
		default: false,
	})
	public enableEmail: boolean;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public email: string | null;

	@Column('boolean', {
		default: false,
	})
	public smtpSecure: boolean;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public smtpHost: string | null;

	@Column('integer', {
		nullable: true
	})
	public smtpPort: number | null;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public smtpUser: string | null;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public smtpPass: string | null;

	@Column('boolean', {
		default: false,
	})
	public enableServiceWorker: boolean;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public swPublicKey: string | null;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public swPrivateKey: string | null;

	@Column('boolean', {
		default: false,
	})
	public enableTwitterIntegration: boolean;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public twitterConsumerKey: string | null;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public twitterConsumerSecret: string | null;

	@Column('boolean', {
		default: false,
	})
	public enableGithubIntegration: boolean;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public githubClientId: string | null;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public githubClientSecret: string | null;

	@Column('boolean', {
		default: false,
	})
	public enableDiscordIntegration: boolean;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public discordClientId: string | null;

	@Column('varchar', {
		length: 128,
		nullable: true
	})
	public discordClientSecret: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public ToSUrl: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public ToSTextUrl: string | null;

	@Column('varchar', {
		length: 512,
		default: 'https://github.com/TeamOrangeServer/misskey',
		nullable: false
	})
	public repositoryUrl: string;

	@Column('varchar', {
		length: 512,
		default: 'https://github.com/TeamOrangeServer/misskey/issues/new',
		nullable: true
	})
	public feedbackUrl: string | null;

	@Column('boolean', {
		default: false,
	})
	public useObjectStorage: boolean;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public objectStorageBucket: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public objectStoragePrefix: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public objectStorageBaseUrl: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public objectStorageEndpoint: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public objectStorageRegion: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public objectStorageAccessKey: string | null;

	@Column('varchar', {
		length: 512,
		nullable: true
	})
	public objectStorageSecretKey: string | null;

	@Column('integer', {
		nullable: true
	})
	public objectStoragePort: number | null;

	@Column('boolean', {
		default: true,
	})
	public objectStorageUseSSL: boolean;

	@Column('boolean', {
		default: true,
	})
	public objectStorageUseProxy: boolean;

	@Column('boolean', {
		default: false,
	})
	public objectStorageSetPublicRead: boolean;

	@Column('boolean', {
		default: true,
	})
	public objectStorageS3ForcePathStyle: boolean;
}
