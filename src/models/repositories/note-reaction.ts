import { EntityRepository, Repository } from 'typeorm';
import { NoteReaction } from '../entities/note-reaction';
import { Users } from '..';
import { ensure } from '../../prelude/ensure';
import { Packed } from '../../misc/schema';
import { convertLegacyReaction } from '../../misc/reaction-lib';

@EntityRepository(NoteReaction)
export class NoteReactionRepository extends Repository<NoteReaction> {
	public async pack(
		src: NoteReaction['id'] | NoteReaction,
		me?: any
	): Promise<Packed<'NoteReaction'>> {
		const reaction = typeof src === 'object' ? src : await this.findOne(src).then(ensure);

		return {
			id: reaction.id,
			createdAt: reaction.createdAt.toISOString(),
			user: await Users.pack(reaction.userId, me),
			type: convertLegacyReaction(reaction.reaction),
		};
	}
}

export const packedNoteReactionSchema = {
	type: 'object' as const,
	optional: false as const, nullable: false as const,
	properties: {
		id: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			format: 'id',
			description: 'The unique identifier for this reaction.',
			example: 'xxxxxxxxxx',
		},
		createdAt: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			format: 'date-time',
			description: 'The date that the reaction was created.'
		},
		user: {
			type: 'object' as const,
			optional: false as const, nullable: false as const,
			ref: 'User' as const,
			description: 'User who performed this reaction.'
		},
		type: {
			type: 'string' as const,
			optional: false as const, nullable: false as const,
			description: 'The reaction type.'
		},
	},
};
