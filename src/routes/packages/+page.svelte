<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import { t } from "$lib/utils/cms";
    let { data } = $props();
    const settings = $derived(data.settings);
</script>

<section class="packages-page">
    <div class="container">
        <div class="packages-header">
            <h1 class="page-title">
                {t(settings, "pages.packages.title")}
            </h1>
            <p class="page-desc">
                {t(settings, "pages.packages.desc")}
            </p>
        </div>

        <div class="packages-grid">
            {#each data.packages as pkg}
                <div
                    class="glass package-card animate-on-scroll"
                    class:popular={pkg.popular}
                >
                    {#if pkg.popular}
                        <div class="popular-badge">
                            {t(settings, "common.popular")}
                        </div>
                    {/if}

                    <h3 class="pkg-title">
                        {$lang === "ar" ? pkg.title_ar : pkg.title_en}
                    </h3>
                    <div class="pkg-price">
                        {pkg.price}
                    </div>

                    <ul class="pkg-features">
                        {#each $lang === "ar" ? pkg.features_ar : pkg.features_en as feature}
                            <li class="feature-item">
                                <span class="check-icon">✓</span>
                                {feature}
                            </li>
                        {/each}
                    </ul>

                    <a
                        href="https://wa.me/{settings?.contact
                            ?.whatsapp}?text={encodeURIComponent(
                            settings?.whatsapp_messages?.package_msg +
                                ($lang === 'ar' ? pkg.title_ar : pkg.title_en),
                        )}"
                        target="_blank"
                        class="btn-primary pkg-btn"
                        style="background: {pkg.popular
                            ? 'var(--primary)'
                            : 'transparent'};"
                    >
                        {t(settings, "common.order_now")}
                    </a>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .packages-page {
        padding: 150px 0 100px;
    }

    .packages-header {
        text-align: center;
        margin-bottom: 80px;
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

    .packages-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 20px;
        align-items: stretch;
    }

    .package-card {
        padding: 50px 40px;
        display: flex;
        flex-direction: column;
        position: relative;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: var(--transition);
    }

    .package-card.popular {
        border-color: var(--primary);
        transform: scale(1.02);
        z-index: 2;
    }

    .popular-badge {
        position: absolute;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: bold;
    }

    .pkg-title {
        font-size: 1.8rem;
        margin-bottom: 10px;
    }

    .pkg-price {
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 30px;
        color: var(--primary);
    }

    .pkg-features {
        margin-bottom: 40px;
        flex-grow: 1;
        display: grid;
        gap: 15px;
    }

    .feature-item {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--text-muted);
        line-height: 1.4;
    }

    .check-icon {
        color: var(--primary);
        font-weight: bold;
    }

    .pkg-btn {
        text-align: center;
        justify-content: center;
        border: 2px solid var(--primary);
        padding: 15px;
        font-size: 1.1rem;
    }

    @media (max-width: 768px) {
        .packages-page {
            padding: 100px 0 60px;
        }

        .packages-header {
            margin-bottom: 40px;
        }

        .page-title {
            font-size: 2.5rem;
        }

        .page-desc {
            font-size: 1rem;
        }

        .packages-grid {
            grid-template-columns: 1fr;
            gap: 25px;
        }

        .package-card {
            padding: 30px 25px;
        }

        .package-card.popular {
            transform: none;
        }

        .pkg-price {
            font-size: 2.2rem;
            margin-bottom: 20px;
        }

        .pkg-btn {
            width: 100%;
        }
    }
</style>
