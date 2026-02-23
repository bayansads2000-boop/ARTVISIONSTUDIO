export const load = async () => {
    const portfolioFiles = import.meta.glob('$lib/data/portfolio/*.json', { eager: true });

    const portfolio = Object.entries(portfolioFiles).map(([path, module]: [string, any]) => {
        const slug = path.split('/').pop()?.replace('.json', '') || '';
        return {
            ...module.default,
            slug
        };
    }).sort((a: any, b: any) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
    });

    return {
        portfolio
    };
};
