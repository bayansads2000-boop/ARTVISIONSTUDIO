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
    const swiperBreakpoints = {
        0: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: "auto",
            spaceBetween: 30,
        },
    };
</script>

<section id="portfolio" class="portfolio-home">
    <div class="container">
        <h2 class="section-title">
            {t(settings, "pages.portfolio.title", $lang)}
        </h2>
    </div>

    <div class="categories-wrapper">
        {#each categories as cat, i}
            {#if getItemsByCategory(cat).length > 0}
                <div class="category-block animate-on-scroll">
                    <div class="container">
                        <div class="category-header-minimal">
                            <h2 class="cat-title-minimal">
                                {t(settings, `common.${cat}`, $lang)}
                            </h2>
                            <div class="header-accent"></div>
                        </div>
                    </div>

                    <div class="premium-swiper-wrapper">
                        <swiper-container
                            init="true"
                            loop={getItemsByCategory(cat).length > 2
                                ? "true"
                                : "false"}
                            slides-per-view="2"
                            space-between="15"
                            dir={$lang === "ar" ? "rtl" : "ltr"}
                            autoplay-delay="5000"
                            speed="1200"
                            grab-cursor="true"
                            pagination-type="progressbar"
                            breakpoints={JSON.stringify(swiperBreakpoints)}
                            class="home-portfolio-swiper"
                        >
                            {#each getItemsByCategory(cat) as item (item.slug)}
                                <swiper-slide class="home-portfolio-slide">
                                    <PortfolioCard {item} />
                                </swiper-slide>
                            {/each}
                        </swiper-container>

                        <!-- Premium Progress Indicator -->
                        <div class="swiper-progress-wrap">
                            <div class="progress-label">
                                {$lang === "ar"
                                    ? "اسحب للاستكشاف"
                                    : "Swipe to Explore"}
                            </div>
                        </div>
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
    .portfolio-home {
        padding: 120px 0;
        overflow-x: hidden;
        background: #050505;
        position: relative;
    }

    .section-title {
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 60px;
        text-align: center;
    }

    .category-block {
        margin-bottom: 120px;
        position: relative;
    }

    .category-header-minimal {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 40px;
    }

    .cat-title-minimal {
        font-size: clamp(1.8rem, 4vw, 2.8rem);
        font-weight: 900;
        color: white;
        margin: 0;
        letter-spacing: -0.01em;
    }

    .header-accent {
        height: 1px;
        flex: 1;
        background: linear-gradient(
            to right,
            transparent,
            var(--primary),
            transparent
        );
        opacity: 0.2;
    }

    :global([dir="rtl"]) .header-accent {
        background: linear-gradient(
            to left,
            transparent,
            var(--primary),
            transparent
        );
    }

    .premium-swiper-wrapper {
        width: 100%;
        margin: 0 auto;
        padding: 0 0 60px;
    }

    .swiper-progress-wrap {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .progress-label {
        font-size: 0.65rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: white;
        opacity: 0.3;
    }

    .home-portfolio-slide {
        height: auto;
    }

    @media (min-width: 769px) {
        .home-portfolio-slide {
            width: 420px;
        }
    }

    swiper-container::part(pagination) {
        height: 2px;
        background: rgba(255, 255, 255, 0.05);
        position: relative;
        bottom: 0;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
    }

    swiper-container::part(pagination-progressbar-fill) {
        background: var(--primary);
    }

    .view-all-container {
        text-align: center;
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        .portfolio-home {
            padding: 80px 0;
        }

        .section-title {
            font-size: 2.2rem;
            margin-bottom: 40px;
        }

        swiper-container::part(container) {
            padding: 20px 2.5vw;
        }

        .premium-swiper-wrapper {
            padding-bottom: 50px;
        }
    }
</style>
