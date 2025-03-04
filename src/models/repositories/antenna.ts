import { EntityRepository, Repository } from 'typeorm';
import { Antenna } from '../entities/antenna';
import { Packed } from '../../misc/schema';
import { AntennaNotes, UserGroupJoinings } from '..';

@EntityRepository(Antenna)
export class AntennaRepository extends Repository<Antenna> {
	public async pack(
		src: Antenna['id'] | Antenna,
	): Promise<Packed<'Antenna'>> {
		const antenna = typeof src === 'object' ? src : await this.findOneOrFail(src);

		const hasUnreadNote = (await AntennaNotes.findOne({ antennaId: antenna.id, read: false })) != null;
		const userGroupJoining = antenna.userGroupJoiningId ? await UserGroupJoinings.findOne(antenna.userGroupJoiningId) : null;

		return {
			id: antenna.id,
			createdAt: antenna.createdAt.toISOString(),
			name: antenna.name,
			keywords: antenna.keywords,
			excludeKeywords: antenna.excludeKeywords,
			src: antenna.src,
			userListId: antenna.userListId,
			userGroupId: userGroupJoining ? userGroupJoining.userGroupId : null,
			users: antenna.users,
			caseSensitive: antenna.caseSensitive,
			notify: antenna.notify,
			withReplies: antenna.withReplies,
			withFile: antenna.withFile,
			hasUnreadNote
		};
	}
}

export const packedAntennaSchema = {
	type: 'object' as const,
	optional: false as const, nullable: false as const,
	properties: {
		id: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			format: 'id',
			description: 'The unique identifier for this Antenna.',
			example: 'xxxxxxxxxx',
		},
		createdAt: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			format: 'date-time',
			description: 'The date that the Antenna was created.'
		},
		name: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			description: 'The name of the Antenna.'
		},
		keywords: {
			type: 'array' as const,
			optional: false as const, nullable: false as const,
			items: {
				type: 'array' as const,
				optional: false as const, nullable: false as const,
				items: {
					type: 'string' as const,
					optional: false as const, nullable: false as const
				}
			}
		},
		excludeKeywords: {
			type: 'array' as const,
			optional: false as const, nullable: false as const,
			items: {
				type: 'array' as const,
				optional: false as const, nullable: false as const,
				items: {
					type: 'string' as const,
					optional: false as const, nullable: false as const
				}
			}
		},
		src: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			enum: ['home', 'all', 'users', 'list', 'group']
		},
		userListId: {
			type: 'string' as const,
			optional: false as const, nullable: true as const,
			format: 'id'
		},
		userGroupId: {
			type: 'string' as const,
			optional: false as const, nullable: true as const,
			format: 'id'
		},
		users: {
			type: 'array' as const,
			optional: false as const, nullable: false as const,
			items: {
				type: 'string' as const,
				optional: false as const, nullable: false as const
			}
		},
		caseSensitive: {
			type: 'boolean' as const,
			optional: false as const, nullable: false as const,
			default: false
		},
		notify: {
			type: 'boolean' as const,
			optional: false as const, nullable: false as const
		},
		withReplies: {
			type: 'boolean' as const,
			optional: false as const, nullable: false as const,
			default: false
		},
		withFile: {
			type: 'boolean' as const,
			optional: false as const, nullable: false as const
		},
		hasUnreadNote: {
			type: 'boolean' as const,
			optional: false as const, nullable: false as const,
			default: false
		}
	},
};
