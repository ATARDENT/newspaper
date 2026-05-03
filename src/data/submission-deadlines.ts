/**
 * Submission targets for the countdown lobby.
 *
 * ⚠ Dates are placeholders inferred from typical conference cycles — always
 * confirm against the official call for papers. Edit `deadlineIso` / `kind`
 * when organizers publish timelines.
 */

export type DeadlineKind = 'countdown' | 'rolling' | 'outside_window';

export type DeadlineDef = {
	id: string;
	/** Venue title on masthead */
	name: string;
	/** Small plaque under headline, e.g. city or “ AoE ” */
	locationLine: string;
	/** Timezone for the hotel-style lobby clock */
	clockTimezone: string;
	kind: DeadlineKind;
	/** Instant for countdown (UTC ISO). Omit if rolling/outside_window. */
	deadlineIso?: string;
	/** Footnote under the countdown */
	subtitle?: string;
};

/** End-of-day “anywhere on Earth” as UTC instant (UTC−12 → add 12h after local end). */
export const aoeEndUtc = (y: number, month: number, day: number) =>
	new Date(Date.UTC(y, month - 1, day + 1, 11, 59, 59, 0)).toISOString();

export const DEADLINES: readonly DeadlineDef[] = [
	{
		id: 'conll-2027',
		name: 'CoNLL 2027',
		locationLine: '— Abstract deadline (AoE)',
		clockTimezone: 'Etc/GMT+12',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2027, 6, 6),
		subtitle: 'Estimate · often tied to ACL/EMNLP cycle',
	},
	{
		id: 'jmlr',
		name: 'JMLR',
		locationLine: 'Journal · MIT Press',
		clockTimezone: 'America/New_York',
		kind: 'rolling',
		subtitle: 'Rolling submissions (no closing bell)',
	},
	{
		id: 'uai-2027',
		name: 'UAI 2027',
		locationLine: 'Toronto · paper deadline (AoE)',
		clockTimezone: 'America/Toronto',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2027, 2, 6),
		subtitle: 'Estimate · verify at uai.org',
	},
	{
		id: 'emnlp-2027',
		name: 'EMNLP 2027',
		locationLine: 'Main conference (AoE)',
		clockTimezone: 'Asia/Singapore',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2027, 5, 16),
		subtitle: 'Estimate · classic spring deadline',
	},
	{
		id: 'tmlr',
		name: 'TMLR',
		locationLine: 'Open review · global',
		clockTimezone: 'UTC',
		kind: 'rolling',
		subtitle: 'Rolling — open-access transactions',
	},
	{
		id: 'aaai-2027',
		name: 'AAAI 2027',
		locationLine: 'Singapore',
		clockTimezone: 'Asia/Singapore',
		kind: 'outside_window',
		subtitle: 'Outside current submission window (per your plan)',
	},
	{
		id: 'colm-2027',
		name: 'COLM 2027',
		locationLine: 'Language modeling (AoE)',
		clockTimezone: 'America/Los_Angeles',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2027, 4, 4),
		subtitle: 'Estimate · check colm.ws',
	},
	{
		id: 'cl-journal',
		name: 'Computational Linguistics',
		locationLine: 'CL journal · MIT Press',
		clockTimezone: 'Europe/Amsterdam',
		kind: 'rolling',
		subtitle: 'Rolling / issue-driven — see journal CFP',
	},
	{
		id: 'coling-2027',
		name: 'COLING 2027',
		locationLine: 'Biennial · submission (AoE)',
		clockTimezone: 'Asia/Seoul',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2026, 7, 10),
		subtitle: 'Estimate · COLING cadence varies',
	},
	{
		id: 'neurips-2027',
		name: 'NeurIPS 2027',
		locationLine: 'Abstract & full (AoE)',
		clockTimezone: 'America/Vancouver',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2027, 5, 21),
		subtitle: 'Estimate · classic May cycle',
	},
	{
		id: 'tacl',
		name: 'TACL',
		locationLine: 'Transactions of the ACL',
		clockTimezone: 'Etc/GMT+12',
		kind: 'rolling',
		subtitle: 'Rolling — monthly decision targets',
	},
	{
		id: 'acl-2027',
		name: 'ACL 2027',
		locationLine: 'Main track (AoE)',
		clockTimezone: 'Etc/GMT+12',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2027, 1, 5),
		subtitle: 'Estimate · often early January',
	},
	{
		id: 'icml-2027',
		name: 'ICML 2027',
		locationLine: 'Proceedings track (AoE)',
		clockTimezone: 'Europe/Vienna',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2027, 1, 28),
		subtitle: 'Estimate · late January pattern',
	},
	{
		id: 'ijcai-2027',
		name: 'IJCAI 2027',
		locationLine: 'Main track (AoE)',
		clockTimezone: 'Pacific/Auckland',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2027, 1, 19),
		subtitle: 'Estimate · January regularity',
	},
	{
		id: 'iclr-2027',
		name: 'ICLR 2027',
		locationLine: 'Conference deadline (AoE)',
		clockTimezone: 'Etc/GMT+12',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2026, 9, 28),
		subtitle: 'Estimate · prior-year September',
	},
	{
		id: 'naacl-2027',
		name: 'NAACL 2027',
		locationLine: 'Main conference (AoE)',
		clockTimezone: 'America/Mexico_City',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2026, 12, 5),
		subtitle: 'Estimate · winter deadline for summer meet',
	},
	{
		id: 'aistats-2027',
		name: 'AISTATS 2027',
		locationLine: 'Proceedings (AoE)',
		clockTimezone: 'Europe/London',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2026, 10, 9),
		subtitle: 'Estimate · mid-autumn rhythm',
	},
	{
		id: 'arr-oct-2026',
		name: 'ARR · Oct 2026 cycle',
		locationLine: 'ACL Rolling Review · AoE',
		clockTimezone: 'Etc/GMT+12',
		kind: 'countdown',
		deadlineIso: aoeEndUtc(2026, 10, 15),
		subtitle: 'Placehold for Oct submission cutoff — verify on aclrollingreview.org',
	},
];
