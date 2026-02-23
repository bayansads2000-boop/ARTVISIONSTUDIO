import settings from '$lib/data/settings.json';

export const prerender = true;
export const trailingSlash = 'always';

export const load = async () => {
    return {
        settings
    };
};
