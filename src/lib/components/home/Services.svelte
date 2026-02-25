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

<section id="services" class="services-section">
    <div class="container">
        <h2 class="section-title">
            {t(settings, "pages.services.title", $lang)}
        </h2>
        <div class="services-grid">
            {#each services as service}
                <div
                    class="glass service-card animate-on-scroll"
                    style="text-align: {$lang === 'ar' ? 'right' : 'left'};"
                >
                    <div class="service-icon">
                        {service.icon}
                    </div>
                    <h3 class="service-title">
                        {$lang === "ar" ? service.title_ar : service.title_en}
                    </h3>
                    <p class="service-desc">
                        {$lang === "ar"
                            ? service.description_ar
                            : service.description_en}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .services-section {
        padding: 100px 0;
        background: #080808;
    }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .service-card {
        padding: 40px;
        transition: var(--transition);
    }

    .service-icon {
        font-size: 3rem;
        margin-bottom: 20px;
    }

    .service-title {
        margin-bottom: 15px;
        font-size: 1.5rem;
    }

    .service-desc {
        color: var(--text-muted);
        line-height: 1.6;
    }

    @media (max-width: 768px) {
        .services-section {
            padding: 60px 0;
        }

        .services-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }

        .service-card {
            padding: 25px;
        }

        .service-icon {
            font-size: 2.5rem;
        }
    }

    .service-card:hover {
        transform: translateY(-10px);
        border-color: var(--primary);
    }
</style>
