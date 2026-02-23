<script lang="ts">
    import { lang } from "$lib/stores/lang";

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
                <a
                    href="/portfolio/{item.slug}"
                    class="glass animate-on-scroll"
                    style="overflow: hidden; cursor: pointer; transition: var(--transition); text-decoration: none; color: inherit; display: block;"
                >
                    <div
                        style="height: 250px; background: #222; overflow: hidden; position: relative;"
                    >
                        <img
                            src={item.image}
                            alt={$lang === "ar" ? item.title_ar : item.title_en}
                            style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition);"
                            class="portfolio-img"
                        />
                        <div
                            class="portfolio-overlay"
                            style="position: absolute; inset: 0; background: rgba(0,0,0,0.8); opacity: 0; transition: var(--transition); display: flex; align-items: center; justify-content: center;"
                        >
                            <span
                                style="font-weight: 700; color: white; border: 2px solid var(--primary); padding: 10px 20px;"
                                >{$lang === "ar"
                                    ? "عرض التفاصيل"
                                    : "View Details"}</span
                            >
                        </div>
                    </div>
                    <div
                        style="padding: 25px; text-align: {$lang === 'ar'
                            ? 'right'
                            : 'left'};"
                    >
                        <span
                            style="color: var(--primary); font-size: 0.8rem; text-transform: uppercase; font-weight: 700;"
                            >{item.category}</span
                        >
                        <h3 style="margin-top: 5px;">
                            {$lang === "ar" ? item.title_ar : item.title_en}
                        </h3>
                    </div>
                </a>
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

<style>
    .glass:hover {
        transform: translateY(-10px);
        border-color: var(--primary);
    }
    .glass:hover .portfolio-overlay {
        opacity: 1;
    }
    .portfolio-img {
        transition: transform 0.5s ease;
    }
    .glass:hover .portfolio-img {
        transform: scale(1.1);
    }
</style>
