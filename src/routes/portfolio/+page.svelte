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

<section style="padding: 150px 0 100px;">
    <div class="container">
        <div style="text-align: center; margin-bottom: 60px;">
            <h1 style="font-size: 4rem; font-weight: 900; margin-bottom: 20px;">
                {t(settings, "pages.portfolio.title")}
            </h1>
            <p
                style="font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto;"
            >
                {t(settings, "pages.portfolio.desc")}
            </p>
        </div>

        <!-- Filters -->
        <div
            style="display: flex; justify-content: center; gap: 15px; margin-bottom: 50px;"
        >
            {#each ["all", "websites", "designs", "videos"] as cat}
                <button
                    onclick={() => {
                        filter = cat;
                        limit = 12;
                    }}
                    class="btn-primary"
                    style="background: {filter === cat
                        ? 'var(--primary)'
                        : 'rgba(255,255,255,0.1)'}"
                >
                    {t(settings, `common.${cat}`)}
                </button>
            {/each}
        </div>

        <!-- Grid -->
        <div
            style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px;"
        >
            {#each visibleItems as item (item.slug)}
                <PortfolioCard {item} />
            {/each}
        </div>

        {#if limit < filteredPortfolio.length}
            <div style="text-align: center; margin-top: 60px;">
                <button
                    onclick={loadMore}
                    class="btn-primary"
                    style="padding: 15px 40px;"
                >
                    {t(settings, "common.load_more")}
                </button>
            </div>
        {/if}
    </div>
</section>
