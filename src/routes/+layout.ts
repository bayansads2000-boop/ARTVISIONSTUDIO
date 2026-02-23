import settings from '$lib/data/settings.json';
import labels from '$lib/data/labels.json';

export const prerender = true;
export const trailingSlash = 'always';

export const load = async () => {
    return {
        settings: {
            ...settings,
            ...labels
        }
    };
};
