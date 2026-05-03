/** Raw README from itsual/Notable-LLM-Research-Papers */
export const NOTABLE_LLM_README_URL =
	'https://raw.githubusercontent.com/itsual/Notable-LLM-Research-Papers/main/README.md';

export type PaperEntry = {
	title: string;
	url: string;
};

const TABLE_ROW_RE =
	/^\|\s*\d+\s*\|\s*([^|]+?)\s*\|\s*\[[^\]]*\]\((https?:\/\/[^)]+)\)\s*\|\s*$/;

/**
 * Parses paper rows from the README markdown table:
 * `| N | Title | [Link](https://…) |`
 */
export function parseNotableLlmsPaperTable(markdown: string): PaperEntry[] {
	const papers: PaperEntry[] = [];

	for (const line of markdown.split('\n')) {
		const trimmed = line.trim();
		const m = trimmed.match(TABLE_ROW_RE);
		if (!m) continue;

		const title = m[1].replace(/\s+/g, ' ').trim();
		const url = m[2].trim();
		if (title.length && url.length) papers.push({ title, url });
	}

	return papers;
}

function hashString(seed: string): number {
	let h = 5381;
	for (let i = 0; i < seed.length; i++)
		h = (h << 5) + h + seed.charCodeAt(i);
	return Math.abs(h);
}

/** Deterministic pick for “today” in local time (YYYYMMDD). */
export function pickPaperOfTheDay(papers: PaperEntry[], when: Date = new Date()): PaperEntry {
	if (papers.length === 0)
		return { title: 'No papers parsed', url: 'https://github.com/itsual/Notable-LLM-Research-Papers' };

	const y = when.getFullYear();
	const m = String(when.getMonth() + 1).padStart(2, '0');
	const d = String(when.getDate()).padStart(2, '0');
	const seed = `${y}${m}${d}`;
	const idx = hashString(seed) % papers.length;
	return papers[idx]!;
}
