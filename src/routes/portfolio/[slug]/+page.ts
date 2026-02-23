import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    try {
        const portfolioFiles = import.meta.glob('$lib/data/portfolio/*.json', { eager: true });
        const filePath = `/src/lib/data/portfolio/${params.slug}.json`;

        const module = portfolioFiles[filePath] as any;

        if (!module) {
            throw error(404, 'Project not found');
        }

        return {
            project: {
                ...module.default,
                slug: params.slug
            }
        };
    } catch (e) {
        throw error(404, 'Project not found');
    }
};
