import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    try {
        const member = await import(`../../../lib/data/team/${params.slug}.json`);
        // Also load settings for footer/nav translations if needed, or get from parent
        return {
            member: {
                ...member.default,
                slug: params.slug
            }
        };
    } catch (e) {
        throw error(404, 'Member not found');
    }
};
