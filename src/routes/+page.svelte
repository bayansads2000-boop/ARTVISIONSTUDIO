<script lang="ts">
    interface PortfolioItem {
        title: string;
        category: string;
        image: string;
        link?: string;
        description: string;
        slug: string;
    }

    interface ServiceItem {
        title: string;
        icon: string;
        description: string;
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
    style="min-height: 90vh; display: flex; align-items: center; position: relative; overflow: hidden; padding: 100px 0;"
>
    <!-- Background decoration -->
    <div
        style="position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(227,30,36,0.15) 0%, transparent 70%); z-index: -1;"
    ></div>
    <div
        style="position: absolute; bottom: -100px; left: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%); z-index: -1;"
    ></div>

    <div class="container" style="text-align: center;">
        <h1
            style="font-size: 5rem; line-height: 1; margin-bottom: 20px; font-weight: 900; letter-spacing: -2px;"
        >
            {@html settings.hero_title ||
                'WE CREATE <span style="color: var(--primary);">VISION</span><br /> BEYOND <span style="font-style: italic; font-weight: 300;">ART</span>'}
        </h1>
        <p
            style="font-size: 1.5rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 40px; font-family: var(--font-ar);"
        >
            {settings.hero_subtitle ||
                "وكالة إبداعية متخصصة في صناعة المحتوى، تطوير المواقع، وتصميم الهويات البصرية التي تخطف الأنظار."}
        </p>
        <div style="display: flex; gap: 20px; justify-content: center;">
            <a href="#portfolio" class="btn-primary"
                >{settings.cta_text || "شاهد أعمالنا"}</a
            >
            <a
                href="/packages"
                class="btn-primary"
                style="background: transparent; border: 2px solid white;"
                >اكتشف الباقات</a
            >
        </div>
    </div>
</section>

<!-- Services Section -->
<section id="services" style="padding: 100px 0; background: #080808;">
    <div class="container">
        <h2 class="section-title">خدماتنا</h2>
        <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;"
        >
            {#each data.services as service}
                <div
                    class="glass animate-on-scroll"
                    style="padding: 40px; transition: var(--transition);"
                >
                    <div style="font-size: 3rem; margin-bottom: 20px;">
                        {service.icon}
                    </div>
                    <h3 style="margin-bottom: 15px;">{service.title}</h3>
                    <p style="color: var(--text-muted);">
                        {service.description}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Portfolio Section -->
<section id="portfolio" style="padding: 100px 0;">
    <div class="container">
        <h2 class="section-title">معرض الأعمال</h2>

        <!-- Filters -->
        <div
            style="display: flex; justify-content: center; gap: 15px; margin-bottom: 50px;"
        >
            <button
                onclick={() => (filter = "all")}
                class="btn-primary"
                style="background: {filter === 'all'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}">الكل</button
            >
            <button
                onclick={() => (filter = "websites")}
                class="btn-primary"
                style="background: {filter === 'websites'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}">مواقع ويب</button
            >
            <button
                onclick={() => (filter = "designs")}
                class="btn-primary"
                style="background: {filter === 'designs'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}">تصميمات</button
            >
            <button
                onclick={() => (filter = "videos")}
                class="btn-primary"
                style="background: {filter === 'videos'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}">فيديوهات</button
            >
        </div>

        <!-- Grid -->
        <div
            style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px;"
        >
            {#each filteredPortfolio as item (item.slug)}
                <div
                    class="glass animate-on-scroll"
                    style="overflow: hidden; cursor: pointer; transition: var(--transition);"
                >
                    <div
                        style="height: 250px; background: #222; overflow: hidden; position: relative;"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition);"
                            class="portfolio-img"
                        />
                        <div
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(227,30,36,0.8); opacity: 0; transition: var(--transition); display: flex; align-items: center; justify-content: center;"
                            class="portfolio-overlay"
                        >
                            <span
                                style="font-weight: 700; color: white; border: 2px solid white; padding: 10px 20px;"
                                >عرض المزيد</span
                            >
                        </div>
                    </div>
                    <div style="padding: 25px;">
                        <span
                            style="color: var(--primary); font-size: 0.8rem; text-transform: uppercase; font-weight: 700;"
                            >{item.category}</span
                        >
                        <h3 style="margin-top: 5px;">{item.title}</h3>
                    </div>
                </div>
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
            <div>
                <h2 style="font-size: 3rem; margin-bottom: 20px;">
                    Ready to <span style="color: var(--primary);">Film?</span>
                </h2>
                <p
                    style="color: var(--text-muted); margin-bottom: 30px; font-family: var(--font-ar);"
                >
                    سواء كنت تريد موقعاً إلكترونياً، تصميماً جذاباً، أو حملة
                    تسويقية متكاملة، نحن هنا لنحول فكرتك إلى واقع مبهر.
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
                                الموقع
                            </h4>
                            <p>القاهرة، مصر</p>
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
                                الايميل
                            </h4>
                            <p>{settings.email || "bayansads2000@gmail.com"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <form style="display: grid; gap: 20px;">
                <div
                    style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;"
                >
                    <input
                        type="text"
                        placeholder="الاسم"
                        style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; color: white;"
                    />
                    <input
                        type="email"
                        placeholder="الايميل"
                        style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; color: white;"
                    />
                </div>
                <input
                    type="text"
                    placeholder="الموضوع"
                    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; color: white;"
                />
                <textarea
                    placeholder="رسالتك"
                    rows="5"
                    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; color: white;"
                ></textarea>
                <button
                    type="submit"
                    class="btn-primary"
                    style="justify-content: center;">إرسال الرسالة</button
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

    input:focus,
    textarea:focus {
        outline: none;
        border-color: var(--primary);
        background: rgba(255, 255, 255, 0.1);
    }
</style>
