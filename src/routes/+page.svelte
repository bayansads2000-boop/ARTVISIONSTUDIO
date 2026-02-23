<script lang="ts">
    import { lang } from "$lib/stores/lang";

    interface PortfolioItem {
        title_ar: string;
        title_en: string;
        category: string;
        image: string;
        description_ar: string;
        description_en: string;
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
        filter === "all"
            ? data.portfolio
            : data.portfolio.filter(
                  (item: PortfolioItem) => item.category === filter,
              ),
    );
</script>

<!-- Hero Section -->
<section
    style="min-height: 90vh; display: flex; align-items: center; position: relative; overflow: hidden; padding: 100px 0; background: url({settings
        ?.hero?.bg_image}) center/cover no-repeat;"
>
    <div
        style="position: absolute; inset: 0; background: rgba(0,0,0,0.7); z-index: 0;"
    ></div>

    <div
        style="position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; background: radial-gradient(circle, var(--primary) 0%, transparent 70%); opacity: 0.15; z-index: 1;"
    ></div>

    <div
        class="container"
        style="text-align: center; position: relative; z-index: 2;"
    >
        <h1
            style="font-size: 5rem; line-height: 1.1; margin-bottom: 20px; font-weight: 900; letter-spacing: -2px;"
        >
            {settings?.hero?.title || "WE CREATE"}
            <span style="color: var(--primary);">
                {settings?.hero?.title_accent || "VISION"}
            </span>
        </h1>
        <p
            style="font-size: 1.5rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 40px;"
        >
            {settings?.hero?.subtitle ||
                ($lang === "ar"
                    ? "وكالة إبداعية متخصصة في صناعة المحتوى"
                    : "Specialized creative agency in content creation")}
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
                            : 'left' || 'center'};"
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

            <form
                onsubmit={(e) => {
                    e.preventDefault();
                    // @ts-ignore
                    const name = e.currentTarget.elements.name_input.value;
                    // @ts-ignore
                    const msg = e.currentTarget.elements.message_input.value;
                    const fullMsg = `مرحباً، أنا ${name}. ${msg}`;
                    window.open(
                        `https://wa.me/${settings?.contact?.whatsapp}?text=${encodeURIComponent(fullMsg)}`,
                        "_blank",
                    );
                }}
                style="display: grid; gap: 20px; text-align: {$lang === 'ar'
                    ? 'right'
                    : 'left'};"
            >
                <input
                    name="name_input"
                    type="text"
                    required
                    placeholder={$lang === "ar" ? "الاسم" : "Name"}
                    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; color: white; width: 100%;"
                />

                <textarea
                    name="message_input"
                    required
                    placeholder={$lang === "ar" ? "رسالتك" : "Message"}
                    rows="5"
                    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; color: white;"
                ></textarea>
                <button
                    type="submit"
                    class="btn-primary"
                    style="justify-content: center;"
                    >{$lang === "ar"
                        ? "إرسال عبر واتساب"
                        : "Send via WhatsApp"}</button
                >
            </form>
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
