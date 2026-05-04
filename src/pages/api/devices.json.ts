import type { APIRoute } from 'astro';

export const prerender = false;

type Os = 'linux' | 'windows' | 'macos' | 'ios' | 'android' | 'other';
type Status = 'online' | 'idle' | 'offline';

type DeviceRow = {
	id: string;
	name: string;
	subline: string;
	os: Os;
	lastSeenISO: string;
	status: Status;
	version: string;
};

type TailscaleDevice = {
	id?: string;
	nodeId?: string;
	name?: string;
	hostname?: string;
	os?: string;
	clientVersion?: string;
	lastSeen?: string;
	addresses?: string[];
	tags?: string[];
};

const FIVE_MIN = 5 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;

function normalizeOs(raw: string | undefined): Os {
	const v = (raw ?? '').toLowerCase();
	if (v.includes('linux')) return 'linux';
	if (v.includes('windows')) return 'windows';
	if (v.includes('mac') || v.includes('darwin')) return 'macos';
	if (v.includes('ios')) return 'ios';
	if (v.includes('android')) return 'android';
	return 'other';
}

function deriveStatus(lastSeenISO: string | undefined): Status {
	if (!lastSeenISO) return 'offline';
	const delta = Date.now() - new Date(lastSeenISO).getTime();
	if (Number.isNaN(delta)) return 'offline';
	if (delta < FIVE_MIN) return 'online';
	if (delta < ONE_HOUR) return 'idle';
	return 'offline';
}

function shortName(d: TailscaleDevice): string {
	const raw = d.hostname || d.name || 'unknown';
	return raw.split('.')[0];
}

function buildSubline(d: TailscaleDevice): string {
	const tag = d.tags?.[0] ?? 'no tags';
	const addr = d.addresses?.[0] ?? '';
	return addr ? `${tag} • ${addr}` : tag;
}

function toRow(d: TailscaleDevice): DeviceRow {
	const lastSeen = d.lastSeen ?? '';
	return {
		id: d.id || d.nodeId || `${d.hostname}-${lastSeen}`,
		name: shortName(d),
		subline: buildSubline(d),
		os: normalizeOs(d.os),
		lastSeenISO: lastSeen,
		status: deriveStatus(lastSeen),
		version: d.clientVersion ?? '',
	};
}

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store',
		},
	});

export const GET: APIRoute = async () => {
	const apiKey = import.meta.env.TAILSCALE_API_KEY;
	const tailnet = import.meta.env.TAILSCALE_TAILNET;

	if (!apiKey || !tailnet) {
		return json({
			devices: [],
			tailnet: tailnet ?? '',
			error: 'Missing TAILSCALE_API_KEY or TAILSCALE_TAILNET',
		});
	}

	const url = `https://api.tailscale.com/api/v2/tailnet/${encodeURIComponent(tailnet)}/devices`;

	try {
		const res = await fetch(url, {
			headers: { Authorization: `Bearer ${apiKey}` },
		});

		if (!res.ok) {
			return json({
				devices: [],
				tailnet,
				error: `Tailscale API ${res.status} ${res.statusText}`,
			});
		}

		const data = (await res.json()) as { devices?: TailscaleDevice[] };
		const devices = (data.devices ?? [])
			.map(toRow)
			.sort((a, b) => {
				const order: Record<Status, number> = { online: 0, idle: 1, offline: 2 };
				if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
				return a.name.localeCompare(b.name);
			});

		return json({ devices, tailnet, fetchedAt: new Date().toISOString() });
	} catch (err) {
		const message = err instanceof Error ? err.message : 'unknown error';
		return json({ devices: [], tailnet, error: message });
	}
};
