<script lang="ts">
    import { lang } from "$lib/stores/lang";
    let { data } = $props();
    const settings = $derived(data.settings);
</script>

<section style="padding: 150px 0 100px;">
    <div class="container">
        <div style="text-align: center; margin-bottom: 80px;">
            <h1 style="font-size: 4rem; font-weight: 900; margin-bottom: 20px;">
                {$lang === "ar" ? "باقاتنا الإبداعية" : "Our Creative Packages"}
            </h1>
            <p
                style="font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto;"
            >
                {$lang === "ar"
                    ? "اختر الباقة المناسبة لاحتياجات عملك وانطلق معنا اليوم."
                    : "Choose the right package for your business needs and start with us today."}
            </p>
        </div>

        <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: stretch;"
        >
            {#each data.packages as pkg}
                <div
                    class="glass animate-on-scroll"
                    style="padding: 50px 40px; display: flex; flex-direction: column; position: relative; border: 1px solid {pkg.popular
                        ? 'var(--primary)'
                        : 'rgba(255,255,255,0.1)'}"
                >
                    {#if pkg.popular}
                        <div
                            style="position: absolute; top: 20px; right: 20px; background: var(--primary); color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: bold;"
                        >
                            {$lang === "ar" ? "الأكثر طلباً" : "Popular"}
                        </div>
                    {/if}

                    <h3 style="font-size: 1.8rem; margin-bottom: 10px;">
                        {$lang === "ar" ? pkg.title_ar : pkg.title_en}
                    </h3>
                    <div
                        style="font-size: 3rem; font-weight: 900; margin-bottom: 30px; color: var(--primary);"
                    >
                        {pkg.price}
                    </div>

                    <ul
                        style="margin-bottom: 40px; flex-grow: 1; display: grid; gap: 15px;"
                    >
                        {#each $lang === "ar" ? pkg.features_ar : pkg.features_en as feature}
                            <li
                                style="display: flex; align-items: center; gap: 10px; color: var(--text-muted);"
                            >
                                <span style="color: var(--primary);">✓</span>
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
                        class="btn-primary"
                        style="text-align: center; background: {pkg.popular
                            ? 'var(--primary)'
                            : 'transparent'}; border: 2px solid var(--primary);"
                    >
                        {$lang === "ar" ? "اطلب الآن" : "Order Now"}
                    </a>
                </div>
            {/each}
        </div>
    </div>
</section>
