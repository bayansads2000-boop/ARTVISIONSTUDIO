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

<section id="services" style="padding: 100px 0; background: #080808;">
    <div class="container">
        <h2 class="section-title">
            {t(settings, "pages.services.title")}
        </h2>
        <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;"
        >
            {#each services as service}
                <div
                    class="glass animate-on-scroll"
                    style="padding: 40px; transition: var(--transition); text-align: {$lang ===
                    'ar'
                        ? 'right'
                        : 'left'};"
                >
                    <div style="font-size: 3rem; margin-bottom: 20px;">
                        {service.icon}
                    </div>
                    <h3 style="margin-bottom: 15px;">
                        {$lang === "ar" ? service.title_ar : service.title_en}
                    </h3>
                    <p style="color: var(--text-muted);">
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
    .section-title {
        font-size: 3.5rem;
        font-weight: 900;
        margin-bottom: 60px;
        text-align: center;
        letter-spacing: -2px;
    }
    .glass:hover {
        transform: translateY(-10px);
        border-color: var(--primary);
    }
</style>
