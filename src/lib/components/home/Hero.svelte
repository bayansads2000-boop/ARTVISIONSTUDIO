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
            <h1 class="hero-title">
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
                {#if t(settings, "hero.cta_text", $lang)}
                    <a href="/portfolio" class="btn-primary main-btn">
                        {t(settings, "hero.cta_text", $lang)}
                    </a>
                {/if}
                {#if t(settings, "hero.cta_outline_text", $lang)}
                    <a href="/contact" class="btn-primary outline-btn">
                        {t(settings, "hero.cta_outline_text", $lang)}
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
        font-size: clamp(2.5rem, 10vw, 7.5rem);
        line-height: 1.1; /* Increased to prevent overlap and glow issues */
        margin-bottom: 25px;
        font-weight: 950;
        letter-spacing: -1px; /* Reduced negative spacing to prevent character crowding */
        text-transform: uppercase;
        -webkit-font-smoothing: antialiased; /* Ensure sharp rendering */
        -moz-osx-font-smoothing: grayscale;
    }

    :global(.hero-subtitle) {
        display: block;
        opacity: 0.9;
        font-size: 0.3em;
        letter-spacing: 12px; /* Increased to ensure characters like L, E, A, T don't touch */
        margin-bottom: 20px;
        font-weight: 700;
        color: var(--text-muted);
    }

    @media (min-width: 769px) {
        .hero-title {
            letter-spacing: -2px;
            line-height: 1.1;
            margin-bottom: 35px;
        }
        :global(.hero-subtitle) {
            font-size: 0.32em;
            letter-spacing: 16px; /* Optimized for large screens */
            margin-bottom: 30px;
        }
    }

    :global(.hero-accent) {
        color: var(--palette-grey-0);
        display: block;
        line-height: 0.9; /* Specific tight line-height just for the accent part if needed */
    }

    :global(.hero-description) {
        font-size: clamp(1rem, 2.5vw, 1.7rem);
        color: rgba(255, 255, 255, 0.9);
        padding: 0 10px;
        max-width: 900px;
        margin: 0 auto 40px;
        line-height: 1.5;
        font-weight: 500;
    }

    .hero-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;
        align-items: center;
    }

    .main-btn,
    .outline-btn {
        padding: 16px 40px;
        font-size: 1rem;
        width: auto;
    }

    @media (max-width: 480px) {
        .hero-btns {
            flex-direction: column;
            width: 100%;
            padding: 0 20px;
        }
        .main-btn,
        .outline-btn {
            width: 100%;
        }
    }

    .main-btn {
        box-shadow: 0 15px 40px rgba(var(--primary-rgb, 227, 30, 36), 0.3);
    }

    .main-btn:hover {
        background: var(--primary);
        box-shadow: 0 15px 50px rgba(var(--primary-rgb, 227, 30, 36), 0.5);
    }

    .outline-btn {
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
    }

    .outline-btn:hover {
        border-color: white;
        background: white;
        color: black;
    }
</style>
