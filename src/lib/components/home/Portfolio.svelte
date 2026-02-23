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

<section id="portfolio" class="portfolio-section">
    <div class="container">
        <h2 class="section-title">
            {t(settings, "pages.portfolio.title")}
        </h2>

        <div class="filter-container">
            <div class="filter-scroll">
                {#each ["all", "websites", "designs", "videos"] as cat}
                    <button
                        onclick={() => (filter = cat)}
                        class="btn-primary filter-btn"
                        style="background: {filter === cat
                            ? 'var(--primary)'
                            : 'rgba(255,255,255,0.1)'}"
                        >{t(settings, `common.${cat}`)}</button
                    >
                {/each}
            </div>
        </div>

        <div class="portfolio-grid">
            {#each filteredPortfolio as item (item.slug)}
                <PortfolioCard {item} />
            {/each}
        </div>

        <div class="view-all-container">
            <a href="/portfolio" class="btn-primary view-all-btn">
                {t(settings, "common.view_all_works")}
            </a>
        </div>
    </div>
</section>

<style>
    .portfolio-section {
        padding: 100px 0;
    }

    .filter-container {
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
    }

    .filter-scroll {
        display: flex;
        gap: 15px;
        max-width: 100%;
    }

    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .view-all-container {
        text-align: center;
        margin-top: 60px;
    }

    @media (max-width: 768px) {
        .portfolio-section {
            padding: 60px 0;
        }

        .filter-container {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 15px;
            margin-bottom: 30px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
        }

        .filter-container::-webkit-scrollbar {
            display: none;
        }

        .filter-scroll {
            padding: 0 15px;
        }

        .portfolio-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }

        .filter-btn {
            white-space: nowrap;
            padding: 12px 25px;
            font-size: 0.9rem;
        }

        .view-all-btn {
            width: 100%;
            display: block;
        }
    }
</style>
