import * as Bull from 'bull';
import { DbJobData } from '../../types';
import { deleteDriveFiles } from './delete-drive-files';
import { exportCustomEmojis } from './export-custom-emojis';
import { exportNotes } from './export-notes';
import { exportFollowing } from './export-following';
import { exportMute } from './export-mute';
import { exportBlocking } from './export-blocking';
import { exportUserLists } from './export-user-lists';
import { importFollowing } from './import-following';
import { importBlocking } from './import-blocking';
import { importUserLists } from './import-user-lists';
import { deleteAccount } from './delete-account';

const jobs = {
	deleteDriveFiles,
	exportCustomEmojis,
	exportNotes,
	exportFollowing,
	exportMute,
	exportBlocking,
	exportUserLists,
	importFollowing,
	importBlocking,
	importUserLists,
	deleteAccount,
} as Record<string, Bull.ProcessCallbackFunction<DbJobData> | Bull.ProcessPromiseFunction<DbJobData>>;

export default function(dbQueue: Bull.Queue<DbJobData>) {
	for (const [k, v] of Object.entries(jobs)) {
		dbQueue.process(k, v);
	}
}
