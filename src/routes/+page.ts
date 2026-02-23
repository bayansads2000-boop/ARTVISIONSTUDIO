export const load = async () => {
    const portfolioFiles = import.meta.glob('$lib/data/portfolio/*.json', { eager: true });
    const servicesFiles = import.meta.glob('$lib/data/services/*.json', { eager: true });

    const portfolioItems = Object.entries(portfolioFiles).map(([path, module]) => {
        const data = (module as any).default || module;
        return {
            ...data,
            slug: path.split('/').pop()?.replace('.json', '') || 'item'
        };
    });

    const servicesItems = Object.entries(servicesFiles).map(([path, module]) => {
        const data = (module as any).default || module;
        return {
            ...data,
            slug: path.split('/').pop()?.replace('.json', '') || 'service'
        };
    });

    return {
        portfolio: portfolioItems,
        services: servicesItems
    };
};
