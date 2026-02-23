export const load = async () => {
    const portfolioFiles = import.meta.glob('$lib/data/portfolio/*.json', { eager: true });

    const portfolio = Object.entries(portfolioFiles).map(([path, module]: [string, any]) => {
        const slug = path.split('/').pop()?.replace('.json', '') || '';
        return {
            ...module.default,
            slug
        };
    }).sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

    return {
        portfolio
    };
};
