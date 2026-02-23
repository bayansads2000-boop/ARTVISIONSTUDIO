<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import WaterEffect from "$lib/components/WaterEffect.svelte";
    import { t, raw } from "$lib/utils/cms";
    import CmsText from "$lib/components/CmsText.svelte";

    let { settings } = $props();
</script>

<section
    class="hero-section"
    style="min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; background: {raw(
        settings,
        'theme.bg_color',
    ) || '#0a0a0a'};"
>
    <!-- Liquid Water Effect -->
    <WaterEffect {settings} />

    <div class="vignette"></div>

    <div
        class="container"
        style="text-align: center; position: relative; z-index: 2;"
    >
        <div class="hero-content">
            <h1
                class="hero-title"
                style="--hero-glow: {raw(settings, 'theme.hero_glow_color') ??
                    '#e31e24'}"
            >
                <CmsText
                    {settings}
                    path="hero.subtitle_prefix"
                    class="hero-subtitle"
                    el="span"
                />
                <CmsText
                    {settings}
                    path="hero.title_accent"
                    class="hero-accent"
                    el="span"
                />
            </h1>

            <CmsText
                {settings}
                path="hero.subtitle"
                class="hero-description"
                el="p"
            />

            <div class="hero-btns">
                {#if t(settings, "hero.cta_text")}
                    <a href="/portfolio" class="btn-primary main-btn">
                        {t(settings, "hero.cta_text")}
                    </a>
                {/if}
                {#if t(settings, "hero.cta_outline_text")}
                    <a href="/contact" class="btn-primary outline-btn">
                        {t(settings, "hero.cta_outline_text")}
                    </a>
                {/if}
            </div>
        </div>
    </div>
</section>

<style>
    .vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(
            circle at 50% 50%,
            transparent 0%,
            rgba(0, 0, 0, 0.8) 100%
        );
        z-index: 1;
        pointer-events: none;
    }

    .hero-content {
        animation: heroReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes heroReveal {
        from {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .hero-title {
        font-size: clamp(3.5rem, 12vw, 7.5rem);
        line-height: 0.85;
        margin-bottom: 35px;
        font-weight: 950;
        letter-spacing: -6px;
        text-transform: uppercase;
    }

    :global(.hero-subtitle) {
        display: block;
        opacity: 0.9;
        font-size: 0.35em;
        letter-spacing: 18px;
        margin-bottom: 25px;
        font-weight: 700;
        color: var(--text-muted);
    }

    :global(.hero-accent) {
        color: var(--palette-grey-0);
        text-shadow: 0 0 50px var(--hero-glow);
        display: block;
        filter: drop-shadow(0 0 20px var(--hero-glow));
    }

    :global(.hero-description) {
        font-size: clamp(1.2rem, 2.5vw, 1.7rem);
        color: rgba(255, 255, 255, 0.9);
        max-width: 900px;
        margin: 0 auto 60px;
        line-height: 1.4;
        font-weight: 500;
    }

    .hero-btns {
        display: flex;
        gap: 30px;
        justify-content: center;
        align-items: center;
    }

    .main-btn {
        padding: 22px 55px;
        font-size: 1.15rem;
        box-shadow: 0 15px 40px rgba(var(--primary-rgb, 227, 30, 36), 0.3);
    }

    .main-btn:hover {
        background: var(--primary);
        box-shadow: 0 15px 50px rgba(var(--primary-rgb, 227, 30, 36), 0.5);
    }

    .outline-btn {
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.3);
        padding: 22px 55px;
        font-size: 1.15rem;
        transition: all 0.3s ease;
    }

    .outline-btn:hover {
        border-color: white;
        background: white;
        color: black;
    }
</style>
