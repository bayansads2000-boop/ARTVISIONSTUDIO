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
<<<<<<< HEAD

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
=======
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
</script>

<svelte:head>
    <title
        >{t(settings, "pages.portfolio.title", $lang) ||
            ($lang === "ar" ? "أعمالنا" : "Portfolio")} | Art Vision Studio</title
    >
</svelte:head>

<section class="portfolio-page">
    <div class="decor-light-left"></div>
    <div class="decor-light-right"></div>

    <div class="container container-header">
        <div class="portfolio-header">
            <div class="header-pre-title">
                {$lang === "ar" ? "معرض أعمالنا" : "Our Showroom"}
            </div>
            <h1 class="page-title">
                {t(settings, "pages.portfolio.title", $lang)}
            </h1>
<<<<<<< HEAD
            <div class="header-line"></div>
=======
            <p class="page-desc">
                {t(settings, "pages.portfolio.desc", $lang)}
            </p>
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
        </div>
    </div>

    <div class="categories-containers">
<<<<<<< HEAD
        {#each categories as cat, i}
            {#if getItemsByCategory(cat).length > 0}
                <div class="category-section animate-on-scroll">
                    <div class="container">
                        <div class="category-header-minimal">
                            <h2 class="cat-title-minimal">
                                {t(settings, `common.${cat}`, $lang)}
                            </h2>
                            <div class="header-accent"></div>
                        </div>
                    </div>

                    <div class="premium-swiper-wrapper">
                        {#key $lang}
                            <swiper-container
                                init="true"
                                loop={getItemsByCategory(cat).length > 2
                                    ? "true"
                                    : "false"}
                                slides-per-view="2"
                                space-between="15"
                                dir={$lang === "ar" ? "rtl" : "ltr"}
                                autoplay-delay="4000"
                                speed="1200"
                                grab-cursor="true"
                                pagination-type="progressbar"
                                breakpoints={JSON.stringify(swiperBreakpoints)}
                                class="modern-portfolio-swiper"
                            >
                                {#each getItemsByCategory(cat) as item (item.slug)}
                                    <swiper-slide
                                        class="modern-portfolio-slide"
                                    >
                                        <PortfolioCard {item} />
                                    </swiper-slide>
                                {/each}
                            </swiper-container>
                        {/key}

                        <div class="swiper-progress-wrap">
                            <div class="progress-label">
                                {$lang === "ar"
                                    ? "اسحب للاستكشاف"
                                    : "Swipe to Explore"}
                            </div>
                        </div>
=======
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
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</section>

<style>
    .portfolio-page {
<<<<<<< HEAD
        padding: 180px 0 120px;
        overflow-x: hidden;
        background: #080808;
        min-height: 100vh;
        position: relative;
=======
        padding: 150px 0 100px;
        overflow-x: hidden;
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
    }

    .portfolio-header {
        text-align: center;
<<<<<<< HEAD
        margin-bottom: 120px;
    }

    .category-section {
        margin-bottom: 120px;
    }

    .category-header-minimal {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 40px;
    }

    .cat-title-minimal {
        font-size: clamp(2rem, 5vw, 3.5rem);
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

    .modern-portfolio-slide {
        height: auto;
    }

    @media (min-width: 769px) {
        .modern-portfolio-slide {
            width: 450px;
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
=======
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
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
    }

    @media (max-width: 768px) {
        .portfolio-page {
            padding: 140px 0 80px;
        }

        .category-section {
<<<<<<< HEAD
            margin-bottom: 80px;
        }

        swiper-container::part(container) {
            padding: 20px 2.5vw;
        }

        .premium-swiper-wrapper {
            padding-bottom: 50px;
=======
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
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
        }
    }
</style>
