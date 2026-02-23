<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import WaterEffect from "$lib/components/WaterEffect.svelte";

    interface PortfolioItem {
        title_ar: string;
        title_en: string;
        category: string;
        image: string;
        description_ar: string;
        description_en: string;
        date?: string;
        slug: string;
    }

    interface ServiceItem {
        title_ar: string;
        title_en: string;
        icon: string;
        description_ar: string;
        description_en: string;
        slug: string;
    }

    let {
        data,
    }: {
        data: {
            portfolio: PortfolioItem[];
            services: ServiceItem[];
            settings: any;
        };
    } = $props();
    let filter = $state("all");
    const settings = $derived(data.settings);

    const filteredPortfolio = $derived(
        data.portfolio
            .filter(
                (item: PortfolioItem) =>
                    filter === "all" || item.category === filter,
            )
            // @ts-ignore
            .sort(
                (a, b) =>
                    new Date(b.date || 0).getTime() -
                    new Date(a.date || 0).getTime(),
            )
            .slice(0, 21),
    );
</script>

<!-- Hero Section -->
<section
    style="min-height: 90vh; display: flex; align-items: center; position: relative; overflow: hidden; padding: 100px 0; background: #050505;"
>
    <!-- Liquid Water Effect -->
    <WaterEffect />

    <div
        style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%); z-index: 1; pointer-events: none;"
    ></div>

    <div
        class="container"
        style="text-align: center; position: relative; z-index: 2;"
    >
        <h1
            style="font-size: clamp(3rem, 10vw, 6rem); line-height: 1; margin-bottom: 25px; font-weight: 950; letter-spacing: -4px; text-transform: uppercase;"
        >
            <span style="display: block; opacity: 0.9;"
                >{settings?.hero?.title || "WE CREATE"}</span
            >
            <span
                style="color: var(--primary); text-shadow: 0 0 30px rgba(227,30,36,0.5);"
            >
                {settings?.hero?.title_accent || "VISION"}
            </span>
        </h1>
        <p
            style="font-size: clamp(1.1rem, 2vw, 1.4rem); color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto 50px; line-height: 1.6; font-weight: 500;"
        >
            {settings?.hero?.subtitle ||
                ($lang === "ar"
                    ? "وكالة إبداعية متخصصة في صناعة المحتوى، تطوير المواقع، وتصميم الهويات البصرية التي تخطف الأنظار."
                    : "A creative agency specialized in content creation, web development, and visual identities that capture attention.")}
        </p>
        <div style="display: flex; gap: 20px; justify-content: center;">
            <a
                href="https://wa.me/{settings?.contact
                    ?.whatsapp}?text={encodeURIComponent(
                    settings?.whatsapp_messages?.hero_msg,
                )}"
                target="_blank"
                class="btn-primary"
            >
                {settings?.hero?.cta_text ||
                    ($lang === "ar" ? "شاهد أعمالنا" : "View Work")}
            </a>
            <a
                href="/packages"
                class="btn-primary"
                style="background: transparent; border: 2px solid white;"
                >{$lang === "ar" ? "اكتشف الباقات" : "Explore Packages"}</a
            >
        </div>
    </div>
</section>

<!-- Services Section -->
<section id="services" style="padding: 100px 0; background: #080808;">
    <div class="container">
        <h2 class="section-title">
            {$lang === "ar" ? "خدماتنا" : "Our Services"}
        </h2>
        <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;"
        >
            {#each data.services as service}
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

<!-- Portfolio Section -->
<section id="portfolio" style="padding: 100px 0;">
    <div class="container">
        <h2 class="section-title">
            {$lang === "ar" ? "معرض الأعمال" : "Portfolio"}
        </h2>

        <div
            style="display: flex; justify-content: center; gap: 15px; margin-bottom: 50px;"
        >
            <button
                onclick={() => (filter = "all")}
                class="btn-primary"
                style="background: {filter === 'all'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}"
                >{$lang === "ar" ? "الكل" : "All"}</button
            >
            <button
                onclick={() => (filter = "websites")}
                class="btn-primary"
                style="background: {filter === 'websites'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}"
                >{$lang === "ar" ? "مواقع ويب" : "Websites"}</button
            >
            <button
                onclick={() => (filter = "designs")}
                class="btn-primary"
                style="background: {filter === 'designs'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}"
                >{$lang === "ar" ? "تصميمات" : "Designs"}</button
            >
            <button
                onclick={() => (filter = "videos")}
                class="btn-primary"
                style="background: {filter === 'videos'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}"
                >{$lang === "ar" ? "فيديوهات" : "Videos"}</button
            >
        </div>

        <div
            style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px;"
        >
            {#each filteredPortfolio as item (item.slug)}
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
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); opacity: 0; transition: var(--transition); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;"
                            class="portfolio-overlay"
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

        <div style="text-align: center; margin-top: 60px;">
            <a
                href="/portfolio"
                class="btn-primary"
                style="padding: 15px 40px; font-size: 1.1rem; text-decoration: none; display: inline-block;"
            >
                {$lang === "ar" ? "عرض جميع الأعمال" : "View All Works"}
            </a>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact" style="padding: 100px 0; background: #050505;">
    <div class="container">
        <div
            class="glass animate-on-scroll"
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 60px; padding: 60px;"
        >
            <div style="text-align: {$lang === 'ar' ? 'right' : 'left'};">
                <h2 style="font-size: 3rem; margin-bottom: 20px;">
                    {$lang === "ar" ? "جاهز لنبدأ " : "Ready to "}
                    <span style="color: var(--primary);"
                        >{$lang === "ar" ? "الإبداع؟" : "Start?"}</span
                    >
                </h2>
                <p style="color: var(--text-muted); margin-bottom: 30px;">
                    {$lang === "ar"
                        ? "نحن هنا لنحول فكرتك إلى واقع مبهر."
                        : "We are here to turn your idea into a stunning reality."}
                </p>

                <div style="display: grid; gap: 20px;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div
                            style="width: 50px; height: 50px; background: rgba(227,30,36,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary);"
                        >
                            📍
                        </div>
                        <div>
                            <h4
                                style="font-size: 0.9rem; color: var(--text-muted);"
                            >
                                {$lang === "ar" ? "الموقع" : "Location"}
                            </h4>
                            <p>{settings?.contact?.address}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div
                            style="width: 50px; height: 50px; background: rgba(227,30,36,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary);"
                        >
                            📧
                        </div>
                        <div>
                            <h4
                                style="font-size: 0.9rem; color: var(--text-muted);"
                            >
                                {$lang === "ar" ? "الايميل" : "Email"}
                            </h4>
                            <p>{settings?.contact?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 30px;"
            >
                <h3 style="font-size: 2rem;">
                    {$lang === "ar"
                        ? "هل لديك مشروع في بالك؟"
                        : "Have a project in mind?"}
                </h3>
                <p style="color: var(--text-muted);">
                    {$lang === "ar"
                        ? "تواصل معنا الآن لنبدأ العمل على مشروعك القادم ونحوله إلى واقع."
                        : "Contact us now to start working on your next project and turn it into reality."}
                </p>
                <a
                    href="/contact"
                    class="btn-primary"
                    style="padding: 15px 50px; font-size: 1.2rem; text-decoration: none;"
                >
                    {$lang === "ar" ? "تواصل معنا الآن" : "Contact Us Now"}
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    .glass:hover {
        transform: translateY(-10px);
        border-color: var(--primary);
    }
    .portfolio-img:hover {
        transform: scale(1.1);
    }
    .glass:hover .portfolio-overlay {
        opacity: 1;
    }
</style>
