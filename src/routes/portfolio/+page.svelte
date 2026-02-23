<script lang="ts">
    import { lang } from "$lib/stores/lang";

    import PortfolioCard from "$lib/components/PortfolioCard.svelte";

    interface PortfolioItem {
        title_ar: string;
        title_en: string;
        category: string;
        image: string;
        slug: string;
    }

    let { data }: { data: { portfolio: PortfolioItem[] } } = $props();
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
        >{$lang === "ar" ? "معرض الأعمال" : "Portfolio"} | Art Vision Studio</title
    >
</svelte:head>

<section style="padding: 150px 0 100px;">
    <div class="container">
        <div style="text-align: center; margin-bottom: 60px;">
            <h1 style="font-size: 4rem; font-weight: 900; margin-bottom: 20px;">
                {$lang === "ar" ? "معرض الأعمال" : "Our Portfolio"}
            </h1>
            <p
                style="font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto;"
            >
                {$lang === "ar"
                    ? "استعرض مسيرتنا الإبداعية ومجموعة من أفضل المشاريع التي قمنا بتنفيذها."
                    : "Explore our creative journey and a collection of the best projects we have executed."}
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
                    {#if cat === "all"}
                        {$lang === "ar" ? "الكل" : "All"}
                    {:else if cat === "websites"}
                        {$lang === "ar" ? "مواقع ويب" : "Websites"}
                    {:else if cat === "designs"}
                        {$lang === "ar" ? "تصميمات" : "Designs"}
                    {:else if cat === "videos"}
                        {$lang === "ar" ? "فيديوهات" : "Videos"}
                    {/if}
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
                    {$lang === "ar" ? "تحميل المزيد" : "Load More"}
                </button>
            </div>
        {/if}
    </div>
</section>
