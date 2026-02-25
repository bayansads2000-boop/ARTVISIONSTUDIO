export const load = async () => {
    const portfolioFiles = import.meta.glob('$lib/data/portfolio/*.json', { eager: true });
    const servicesFiles = import.meta.glob('$lib/data/services/*.json', { eager: true });
    const teamFiles = import.meta.glob('$lib/data/team/*.json', { eager: true });

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

    const teamItems = Object.entries(teamFiles).map(([path, module]) => {
        const data = (module as any).default || module;
        return {
            ...data,
            slug: path.split('/').pop()?.replace('.json', '') || 'member'
        };
    }).sort((a, b) => (a.order || 0) - (b.order || 0));

    return {
        portfolio: portfolioItems,
        services: servicesItems,
        team: teamItems
    };
};
