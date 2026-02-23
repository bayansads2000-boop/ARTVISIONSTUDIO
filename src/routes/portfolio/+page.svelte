<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import PortfolioCard from "$lib/components/PortfolioCard.svelte";
    import { t } from "$lib/utils/cms";

    interface PortfolioItem {
        title_ar: string;
        title_en: string;
        category: string;
        image: string;
        slug: string;
    }

    let { data }: { data: { portfolio: PortfolioItem[]; settings: any } } =
        $props();
    const settings = $derived(data.settings);
    let filter = $state("all");
    let limit = $state(12);

    const filteredPortfolio = $derived(
        filter === "all"
            ? data.portfolio
            : data.portfolio.filter(
                  (item: PortfolioItem) => item.category === filter,
              ),
    );

    const visibleItems = $derived(filteredPortfolio.slice(0, limit));

    function loadMore() {
        limit += 12;
    }
</script>

<svelte:head>
    <title
        >{t(settings, "pages.portfolio.title") ||
            ($lang === "ar" ? "أعمالنا" : "Portfolio")} | Art Vision Studio</title
    >
</svelte:head>

<section class="portfolio-page">
    <div class="container">
        <div class="portfolio-header">
            <h1 class="page-title">
                {t(settings, "pages.portfolio.title")}
            </h1>
            <p class="page-desc">
                {t(settings, "pages.portfolio.desc")}
            </p>
        </div>

        <!-- Filters -->
        <div class="filter-container">
            <div class="filter-scroll">
                {#each ["all", "websites", "designs", "videos"] as cat}
                    <button
                        onclick={() => {
                            filter = cat;
                            limit = 12;
                        }}
                        class="btn-primary filter-btn"
                        style="background: {filter === cat
                            ? 'var(--primary)'
                            : 'rgba(255,255,255,0.1)'}"
                    >
                        {t(settings, `common.${cat}`)}
                    </button>
                {/each}
            </div>
        </div>

        <!-- Grid -->
        <div class="portfolio-grid">
            {#each visibleItems as item (item.slug)}
                <div class="grid-item">
                    <PortfolioCard {item} />
                </div>
            {/each}
        </div>

        {#if limit < filteredPortfolio.length}
            <div class="load-more-container">
                <button onclick={loadMore} class="btn-primary load-more-btn">
                    {t(settings, "common.load_more")}
                </button>
            </div>
        {/if}
    </div>
</section>

<style>
    .portfolio-page {
        padding: 150px 0 100px;
    }

    .portfolio-header {
        text-align: center;
        margin-bottom: 60px;
    }

    .page-title {
        font-size: 4rem;
        font-weight: 900;
        margin-bottom: 20px;
    }

    .page-desc {
        font-size: 1.2rem;
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto;
    }

    .filter-container {
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
    }

    .filter-scroll {
        display: flex;
        gap: 15px;
    }

    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .load-more-container {
        text-align: center;
        margin-top: 60px;
    }

    .load-more-btn {
        padding: 15px 40px;
    }

    @media (max-width: 768px) {
        .portfolio-page {
            padding: 100px 0 60px;
        }

        .page-title {
            font-size: 2.5rem;
        }

        .page-desc {
            font-size: 1rem;
        }

        .filter-container {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 15px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
        }

        .filter-container::-webkit-scrollbar {
            display: none;
        }

        .filter-scroll {
            padding: 0 15px;
        }

        .filter-btn {
            white-space: nowrap;
            padding: 12px 25px;
            font-size: 0.9rem;
        }

        .portfolio-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }

        .load-more-btn {
            width: 100%;
        }
    }
</style>
