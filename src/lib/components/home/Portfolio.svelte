<script lang="ts">
    import { onMount } from "svelte";
    import { lang } from "$lib/stores/lang";
    import PortfolioCard from "$lib/components/PortfolioCard.svelte";
    import { t } from "$lib/utils/cms";
    import { register } from "swiper/element/bundle";

    interface PortfolioItem {
        title_ar: string;
        title_en: string;
        category: string;
        image: string;
        thumbnail?: string;
        video_link?: string;
        slug: string;
    }

    let { portfolio, settings }: { portfolio: PortfolioItem[]; settings: any } =
        $props();

    onMount(() => {
        register();
    });

    const categories = ["websites", "designs", "videos"];

    const getItemsByCategory = (cat: string) => {
        return portfolio.filter((item) => item.category === cat).slice(0, 10);
    };
</script>

<section id="portfolio" class="portfolio-section">
    <div class="container">
        <h2 class="section-title">
            {t(settings, "pages.portfolio.title", $lang)}
        </h2>
    </div>

    <div class="categories-containers">
        {#each categories as cat}
            {#if getItemsByCategory(cat).length > 0}
                <div class="category-group">
                    <div class="container">
                        <h3 class="category-label">
                            {t(settings, `common.${cat}`, $lang)}
                        </h3>
                    </div>

                    <div class="swiper-full-wrapper">
                        <swiper-container
                            init="true"
                            loop="true"
                            autoplay-delay="3500"
                            autoplay-disable-on-interaction="false"
                            speed="1500"
                            slides-per-view="auto"
                            space-between="25"
                            class="home-portfolio-swiper"
                        >
                            {#each getItemsByCategory(cat) as item (item.slug)}
                                <swiper-slide class="portfolio-slide">
                                    <PortfolioCard {item} />
                                </swiper-slide>
                            {/each}
                        </swiper-container>
                    </div>
                </div>
            {/if}
        {/each}
    </div>

    <div class="container">
        <div class="view-all-container">
            <a href="/portfolio" class="btn-primary view-all-btn">
                {t(settings, "common.view_all_works", $lang)}
            </a>
        </div>
    </div>
</section>

<style>
    .portfolio-section {
        padding: 100px 0;
        overflow-x: hidden;
    }

    .section-title {
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 60px;
        text-align: center;
    }

    .category-group {
        margin-bottom: 60px;
    }

    .category-label {
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 25px;
        color: var(--primary);
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .category-label::after {
        content: "";
        flex: 1;
        height: 1px;
        background: linear-gradient(to right, var(--primary), transparent);
    }

    :global([dir="rtl"]) .category-label::after {
        background: linear-gradient(to left, var(--primary), transparent);
    }

    .swiper-full-wrapper {
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
    }

    .portfolio-slide {
        width: 380px;
        height: auto;
    }

    swiper-container::part(container) {
        padding: 20px 5vw;
    }

    .view-all-container {
        text-align: center;
        margin-top: 40px;
    }

    @media (max-width: 768px) {
        .portfolio-section {
            padding: 60px 0;
        }

        .section-title {
            font-size: 2.2rem;
            margin-bottom: 40px;
        }

        .portfolio-slide {
            width: 280px;
        }

        .category-label {
            font-size: 1.2rem;
        }
    }
</style>
