<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import { t } from "$lib/utils/cms";

    interface ServiceItem {
        title_ar: string;
        title_en: string;
        icon: string;
        description_ar: string;
        description_en: string;
        slug: string;
    }

    let { services, settings }: { services: ServiceItem[]; settings: any } =
        $props();
</script>

<section id="services" class="services-advanced">
    <div class="decor-light"></div>

    <div class="container container-premium">
        <div class="header-minimal">
            <span class="subtitle-badge"
                >{$lang === "ar"
                    ? "خدماتنا الاحترافية"
                    : "Our Professional Expertise"}</span
            >
            <h2 class="title-main">
                {t(settings, "pages.services.title", $lang)}
            </h2>
            <div class="minimal-line"></div>
        </div>

        <div class="services-grid-modern">
            {#each services as service, i}
                <div
                    class="service-card-modern animate-on-scroll"
                    style="--delay: {i * 0.1}s; text-align: {$lang === 'ar'
                        ? 'right'
                        : 'left'};"
                >
                    <div class="card-bg"></div>
                    <div class="content-rel">
                        <div class="icon-floating">
                            <span class="icon-inner">{service.icon}</span>
                            <div class="icon-glow"></div>
                        </div>

                        <h3 class="service-name-premium">
                            {$lang === "ar"
                                ? service.title_ar
                                : service.title_en}
                        </h3>

                        <p class="service-p-minimal">
                            {$lang === "ar"
                                ? service.description_ar
                                : service.description_en}
                        </p>

                        <div class="card-link">
                            <span
                                >{$lang === "ar"
                                    ? "اكتشف المزيد"
                                    : "Learn More"}</span
                            >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
```

<style>
    .services-advanced {
        padding: 160px 0;
        background: #050505;
        position: relative;
        overflow: hidden;
    }

    .decor-light {
        position: absolute;
        top: 0;
        right: 0;
        width: 600px;
        height: 600px;
        background: radial-gradient(
            circle,
            rgba(227, 30, 36, 0.03) 0%,
            transparent 70%
        );
        pointer-events: none;
    }

    .container-premium {
        position: relative;
        z-index: 5;
    }

    .header-minimal {
        text-align: center;
        margin-bottom: 100px;
    }

    .subtitle-badge {
        font-size: 0.8rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.25em;
        color: var(--primary);
        background: rgba(227, 30, 36, 0.08);
        padding: 8px 20px;
        border-radius: 100px;
        margin-bottom: 25px;
        display: inline-block;
        border: 1px solid rgba(227, 30, 36, 0.15);
    }

    .title-main {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 900;
        margin-bottom: 30px;
        background: linear-gradient(to bottom, #fff, #999);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .minimal-line {
        width: 60px;
        height: 3px;
        background: var(--primary);
        margin: 0 auto;
        border-radius: 100px;
    }

    .services-grid-modern {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px;
    }

    .service-card-modern {
        position: relative;
        padding: 50px 40px;
        border-radius: 32px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition:
            transform 0.6s var(--ease-out-expo),
            border-color 0.4s ease;
        flex: 1 1 320px;
        max-width: 400px;
    }

    .card-bg {
        position: absolute;
        inset: 0;
        background: radial-gradient(
            circle at top right,
            rgba(227, 30, 36, 0.1),
            transparent 60%
        );
        opacity: 0;
        transition: opacity 0.6s ease;
    }

    .content-rel {
        position: relative;
        z-index: 2;
    }

    .icon-floating {
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 35px;
        position: relative;
        transition: transform 0.5s var(--ease-out-expo);
    }

    .icon-inner {
        font-size: 2.5rem;
        z-index: 2;
    }

    .icon-glow {
        position: absolute;
        inset: 0;
        background: var(--primary);
        filter: blur(25px);
        opacity: 0;
        transition: opacity 0.5s ease;
        border-radius: inherit;
    }

    .service-name-premium {
        font-size: 1.6rem;
        font-weight: 800;
        margin-bottom: 20px;
        color: white;
    }

    .service-p-minimal {
        color: var(--text-muted);
        line-height: 1.8;
        font-size: 1.05rem;
        margin-bottom: 35px;
        opacity: 0.8;
    }

    .card-link {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.9rem;
        font-weight: 800;
        color: var(--primary);
        opacity: 0;
        transform: translateY(15px);
        transition:
            transform 0.5s var(--ease-out-expo),
            opacity 0.4s ease;
    }

    .card-link svg {
        transition: transform 0.3s ease;
    }

    /* Hover State */
    .service-card-modern:hover {
        transform: translateY(-12px);
        border-color: rgba(227, 30, 36, 0.3);
    }

    .service-card-modern:hover .card-bg {
        opacity: 1;
    }

    .service-card-modern:hover .icon-floating {
        transform: scale(1.1) rotate(-5deg);
        background: rgba(227, 30, 36, 0.1);
        border-color: rgba(227, 30, 36, 0.2);
    }

    .service-card-modern:hover .icon-glow {
        opacity: 0.2;
    }

    .service-card-modern:hover .card-link {
        opacity: 1;
        transform: translateY(0);
    }

    .service-card-modern:hover .card-link svg {
        transform: translateX(5px);
    }

    :global([dir="rtl"]) .service-card-modern:hover .card-link svg {
        transform: scaleX(-1) translateX(5px);
    }

    @media (max-width: 768px) {
        .services-advanced {
            padding: 80px 0;
        }

        .header-minimal {
            margin-bottom: 50px;
        }

        .service-card-modern {
            flex: 0 0 calc(50% - 15px);
            padding: 30px 20px;
            border-radius: 20px;
        }

        .icon-floating {
            width: 50px;
            height: 50px;
            margin-bottom: 20px;
            border-radius: 16px;
        }

        .icon-inner {
            font-size: 1.5rem;
        }

        .service-name-premium {
            font-size: 1.1rem;
            margin-bottom: 10px;
        }

        .service-p-minimal {
            font-size: 0.85rem;
            line-height: 1.5;
            margin-bottom: 20px;
        }

        .title-main {
            font-size: 2.2rem;
        }
    }

    @media (max-width: 480px) {
        .services-grid-modern {
            gap: 15px;
        }
        .service-card-modern {
            flex: 0 0 calc(50% - 8px);
            padding: 20px 15px;
        }
    }
</style>
