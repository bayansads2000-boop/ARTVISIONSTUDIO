<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import PortfolioCard from "$lib/components/PortfolioCard.svelte";
    import { t } from "$lib/utils/cms";

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

    let { portfolio, settings }: { portfolio: PortfolioItem[]; settings: any } =
        $props();
    let filter = $state("all");

    const filteredPortfolio = $derived(
        portfolio
            .filter(
                (item: PortfolioItem) =>
                    filter === "all" || item.category === filter,
            )
            .sort((a, b) => {
                const dateA = a.date ? new Date(a.date).getTime() : 0;
                const dateB = b.date ? new Date(b.date).getTime() : 0;
                return dateB - dateA;
            })
            .slice(0, 21),
    );
</script>

<section id="portfolio" style="padding: 100px 0;">
    <div class="container">
        <h2 class="section-title">
            {t(settings, "pages.portfolio.title")}
        </h2>

        <div
            style="display: flex; justify-content: center; gap: 15px; margin-bottom: 50px;"
        >
            {#each ["all", "websites", "designs", "videos"] as cat}
                <button
                    onclick={() => (filter = cat)}
                    class="btn-primary"
                    style="background: {filter === cat
                        ? 'var(--primary)'
                        : 'rgba(255,255,255,0.1)'}"
                    >{t(settings, `common.${cat}`)}</button
                >
            {/each}
        </div>

        <div
            style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px;"
        >
            {#each filteredPortfolio as item (item.slug)}
                <PortfolioCard {item} />
            {/each}
        </div>

        <div style="text-align: center; margin-top: 60px;">
            <a
                href="/portfolio"
                class="btn-primary"
                style="padding: 15px 40px; font-size: 1.1rem; text-decoration: none; display: inline-block;"
            >
                {t(settings, "common.view_all_works")}
            </a>
        </div>
    </div>
</section>

<style>
    .section-title {
        font-size: 3.5rem;
        font-weight: 900;
        margin-bottom: 60px;
        text-align: center;
        letter-spacing: -2px;
    }
</style>
