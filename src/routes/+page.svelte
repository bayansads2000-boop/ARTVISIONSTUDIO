<script lang="ts">
    import Hero from "$lib/components/home/Hero.svelte";
    import Services from "$lib/components/home/Services.svelte";
    import Portfolio from "$lib/components/home/Portfolio.svelte";
    import Team from "$lib/components/home/Team.svelte";
    import ContactCTA from "$lib/components/home/ContactCTA.svelte";

    interface PortfolioItem {
        title_ar: string;
        title_en: string;
        category: string;
        image: string;
        description_ar: string;
        description_en: string;
        date?: string;
        slug: string;
    }

    interface ServiceItem {
        title_ar: string;
        title_en: string;
        icon: string;
        description_ar: string;
        description_en: string;
        slug: string;
    }

    interface TeamMember {
        name_ar: string;
        name_en: string;
        image: string;
        description_ar: string;
        description_en: string;
        slug: string;
        order?: number;
    }

    let {
        data,
    }: {
        data: {
            portfolio: PortfolioItem[];
            services: ServiceItem[];
            team: TeamMember[];
            settings: any;
        };
    } = $props();

    const settings = $derived(data.settings);
</script>

<Hero {settings} />
<Services services={data.services} {settings} />
<Portfolio portfolio={data.portfolio} {settings} />
<Team team={data.team} {settings} />
<ContactCTA {settings} />
