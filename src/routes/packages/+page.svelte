<script>
    let { data } = $props();
</script>

<section style="padding: 150px 0 100px;">
    <div class="container">
        <div style="text-align: center; margin-bottom: 80px;">
            <h1 style="font-size: 4rem; margin-bottom: 20px;">
                Packages <span style="color: var(--primary);">Boutique</span>
            </h1>
            <p
                style="color: var(--text-muted); max-width: 600px; margin: 0 auto; font-family: var(--font-ar);"
            >
                اختر الباقة المناسبة لاحتياجاتك وابدأ رحلة التميز معنا. حلول
                متكاملة لكل ميزانية.
            </p>
        </div>

        <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;"
        >
            {#each data.packages as pkg}
                <div
                    class="glass animate-on-scroll"
                    style="padding: 50px 40px; position: relative; display: flex; flex-direction: column; border: {pkg.popular
                        ? '2px solid var(--primary)'
                        : '1px solid rgba(255,255,255,0.1)'}"
                >
                    {#if pkg.popular}
                        <div
                            style="position: absolute; top: 0; right: 50%; transform: translate(50%, -50%); background: var(--primary); padding: 5px 20px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;"
                        >
                            Most Popular
                        </div>
                    {/if}

                    <h3 style="font-size: 2rem; margin-bottom: 10px;">
                        {pkg.title}
                    </h3>
                    <div
                        style="font-size: 3rem; font-weight: 900; margin-bottom: 30px; color: {pkg.popular
                            ? 'var(--primary)'
                            : 'white'};"
                    >
                        {pkg.price}
                    </div>

                    <ul style="margin-bottom: 40px; flex-grow: 1;">
                        {#each pkg.features as feature}
                            <li
                                style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: var(--text-muted);"
                            >
                                <span style="color: var(--primary);">✓</span>
                                {feature}
                            </li>
                        {/each}
                    </ul>

                    <button
                        class="btn-primary"
                        style="width: 100%; justify-content: center; background: {pkg.popular
                            ? 'var(--primary)'
                            : 'transparent'}; border: 2px solid var(--primary);"
                    >
                        اطلب الآن
                    </button>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .glass:hover {
        transform: scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }
</style>
