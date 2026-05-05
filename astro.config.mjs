// @ts-check
import { defineConfig } from 'astro/config';

const [owner = '', repo = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserOrOrgPagesRepo =
	owner.length > 0 && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const inferredSite = owner ? `https://${owner}.github.io` : undefined;
const inferredBase = repo
	? isUserOrOrgPagesRepo
		? '/'
		: `/${repo}`
	: '/';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: process.env.ASTRO_SITE ?? inferredSite,
	base: process.env.ASTRO_BASE ?? inferredBase,
	integrations: [],
});
