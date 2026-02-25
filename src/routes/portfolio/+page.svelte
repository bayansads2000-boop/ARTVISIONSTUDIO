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

    let { data }: { data: { portfolio: PortfolioItem[]; settings: any } } =
        $props();
    const settings = $derived(data.settings);

    onMount(() => {
        register();
    });

    const categories = ["websites", "designs", "videos"];

    const getItemsByCategory = (cat: string) => {
        return data.portfolio.filter((item) => item.category === cat);
    };
</script>

<svelte:head>
    <title
        >{t(settings, "pages.portfolio.title", $lang) ||
            ($lang === "ar" ? "أعمالنا" : "Portfolio")} | Art Vision Studio</title
    >
</svelte:head>

<section class="portfolio-page">
    <div class="container">
        <div class="portfolio-header">
            <h1 class="page-title">
                {t(settings, "pages.portfolio.title", $lang)}
            </h1>
            <p class="page-desc">
                {t(settings, "pages.portfolio.desc", $lang)}
            </p>
        </div>
    </div>

    <div class="categories-containers">
        {#each categories as cat}
            {#if getItemsByCategory(cat).length > 0}
                <div class="category-section">
                    <div class="container">
                        <h2 class="category-title">
                            {t(settings, `common.${cat}`, $lang)}
                        </h2>
                    </div>

                    <div class="swiper-full-wrapper">
                        <swiper-container
                            init="true"
                            loop="true"
                            autoplay-delay="3000"
                            autoplay-disable-on-interaction="false"
                            speed="1200"
                            slides-per-view="auto"
                            space-between="20"
                            mousewheel="true"
                            pagination="false"
                            navigation="false"
                            class="portfolio-swiper"
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
</section>

<style>
    .portfolio-page {
        padding: 150px 0 100px;
        overflow-x: hidden;
    }

    .portfolio-header {
        text-align: center;
        margin-bottom: 80px;
    }

    .page-title {
        font-size: clamp(3rem, 8vw, 5rem);
        font-weight: 950;
        margin-bottom: 20px;
        background: linear-gradient(
            to bottom,
            #fff 30%,
            rgba(255, 255, 255, 0.5)
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: -0.02em;
    }

    .page-desc {
        font-size: 1.2rem;
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto;
        opacity: 0.8;
    }

    .category-section {
        margin-bottom: 100px;
    }

    .category-title {
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 30px;
        position: relative;
        display: inline-block;
        padding-left: 20px;
    }

    :global([dir="rtl"]) .category-title {
        padding-left: 0;
        padding-right: 20px;
    }

    .category-title::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 80%;
        background: var(--primary);
        border-radius: 2px;
    }

    :global([dir="rtl"]) .category-title::before {
        left: auto;
        right: 0;
    }

    .swiper-full-wrapper {
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        padding: 20px 0;
    }

    .portfolio-slide {
        width: 400px;
        height: auto;
        transition: transform 0.5s ease;
    }

    /* .portfolio-slide:hover {
        transform: scale(1.02);
        z-index: 10;
    } */

    swiper-container::part(container) {
        padding: 20px 5vw;
    }

    @media (max-width: 768px) {
        .portfolio-page {
            padding: 100px 0 60px;
        }

        .category-section {
            margin-bottom: 60px;
        }

        .category-title {
            font-size: 1.5rem;
            margin-bottom: 20px;
        }

        .portfolio-slide {
            width: 85vw;
        }

        .swiper-full-wrapper {
            padding: 10px 0;
        }
    }
</style>
