import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    try {
        const portfolioFiles = import.meta.glob('$lib/data/portfolio/*.json', { eager: true });

        // Find the key that ends with the expected filename
        const targetFilename = `${params.slug}.json`;
        const fileKey = Object.keys(portfolioFiles).find(key => key.endsWith(targetFilename));

        if (!fileKey) {
            console.error(`[Project Load] File not found for slug: ${params.slug}`);
            throw error(404, 'Project not found');
        }

        const module: any = portfolioFiles[fileKey];
        const projectData = module.default || module;

        if (!projectData) {
            throw error(404, 'Project data is empty');
        }

        return {
            project: {
                ...projectData,
                slug: params.slug
            }
        };
    } catch (e: any) {
        if (e.status) throw e;
        console.error(`[Project Load Error] ${e.message}`);
        throw error(500, 'Internal Server Error');
    }
};
