export const load = async () => {
    const portfolioFiles = import.meta.glob('$lib/data/portfolio/*.json', { eager: true });

    const items = Object.entries(portfolioFiles).map(([path, module]) => {
        const item = module as any;
        return {
            ...item.default,
            slug: path.split('/').pop()?.replace('.json', '') || 'item'
        };
    });

    return {
        portfolio: items
    };
};
