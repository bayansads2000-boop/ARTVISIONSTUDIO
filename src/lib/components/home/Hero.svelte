<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import WaterEffect from "$lib/components/WaterEffect.svelte";
    import { t, raw } from "$lib/utils/cms";
    import CmsText from "$lib/components/CmsText.svelte";

    let { settings } = $props();
</script>

<section
    class="hero-advanced"
    style="background: {raw(settings, 'theme.bg_color') || '#050505'};"
>
    <!-- Liquid Water Effect -->
    <WaterEffect {settings} />

    <div class="hero-overlay-refined"></div>
    <div class="noise-wrap"></div>

<<<<<<< HEAD
    <div class="container hero-container-rel">
        <div class="hero-master-content">
            <div class="hero-top-meta">
                <span class="meta-line"></span>
=======
    <div
        class="container"
        style="text-align: center; position: relative; z-index: 2;"
    >
        <div class="hero-content">
            <h1 class="hero-title">
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
                <CmsText
                    {settings}
                    path="hero.subtitle_prefix"
                    class="hero-pre-title"
                    el="span"
                />
            </div>

            <h1 class="hero-main-title">
                <div class="title-overflow">
                    <CmsText
                        {settings}
                        path="hero.title_accent"
                        class="title-reveal"
                        el="span"
                    />
                </div>
            </h1>

            <div class="hero-desc-wrap">
                <CmsText
                    {settings}
                    path="hero.subtitle"
                    class="hero-paragraph"
                    el="p"
                />
            </div>

<<<<<<< HEAD
            <div class="hero-action-row">
                {#if t(settings, "hero.cta_text", $lang)}
                    <a href="/portfolio" class="luxury-btn primary">
                        <span class="btn-text"
                            >{t(settings, "hero.cta_text", $lang)}</span
                        >
                        <div class="btn-glow"></div>
                    </a>
                {/if}
                {#if t(settings, "hero.cta_outline_text", $lang)}
                    <a href="/contact" class="luxury-btn secondary">
                        <span class="btn-text"
                            >{t(settings, "hero.cta_outline_text", $lang)}</span
                        >
=======
            <div class="hero-btns">
                {#if t(settings, "hero.cta_text", $lang)}
                    <a href="/portfolio" class="btn-primary main-btn">
                        {t(settings, "hero.cta_text", $lang)}
                    </a>
                {/if}
                {#if t(settings, "hero.cta_outline_text", $lang)}
                    <a href="/contact" class="btn-primary outline-btn">
                        {t(settings, "hero.cta_outline_text", $lang)}
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
                    </a>
                {/if}
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-down-premium">
        <div class="mouse">
            <div class="wheel"></div>
        </div>
        <div class="arrow">
            <span></span>
            <span></span>
        </div>
    </div>
</section>

<style>
    .hero-advanced {
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        padding: 120px 0;
    }

    .hero-overlay-refined {
        position: absolute;
        inset: 0;
        background: radial-gradient(
            circle at 50% 50%,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.85) 100%
        );
        z-index: 1;
        pointer-events: none;
    }

    .hero-container-rel {
        position: relative;
        z-index: 10;
        text-align: center;
    }

    .hero-top-meta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin-bottom: 30px;
        opacity: 0;
        animation: fadeInDown 1s var(--ease-out-expo) forwards;
    }

    .meta-line {
        width: 30px;
        height: 2px;
        background: var(--primary);
    }

    :global(.hero-pre-title) {
        font-size: 0.9rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.4em;
        color: var(--primary);
    }

    .hero-main-title {
        font-size: clamp(3rem, 12vw, 8.5rem);
        font-weight: 950;
        line-height: 1;
        margin-bottom: 40px;
        letter-spacing: -0.04em;
    }

    .title-overflow {
        overflow: hidden;
    }

    :global(.title-reveal) {
        display: block;
        background: linear-gradient(to bottom, #fff, #999);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: titleReveal 1.5s var(--ease-out-expo) 0.3s forwards;
        transform: translateY(110%);
    }

    .hero-desc-wrap {
        max-width: 800px;
        margin: 0 auto 50px;
        overflow: hidden;
    }

    :global(.hero-paragraph) {
        font-size: clamp(1.1rem, 2.5vw, 1.6rem);
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.6;
        font-weight: 500;
        opacity: 0;
        animation: fadeInUp 1.2s var(--ease-out-expo) 0.6s forwards;
    }

    .hero-action-row {
        display: flex;
        justify-content: center;
        gap: 20px;
        opacity: 0;
        animation: fadeInUp 1s var(--ease-out-expo) 0.9s forwards;
    }

    .luxury-btn {
        position: relative;
        padding: 18px 45px;
        border-radius: 100px;
        font-weight: 800;
        font-size: 1rem;
        transition: all 0.4s var(--ease-out-expo);
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }

    .luxury-btn.primary {
        background: var(--primary);
        color: white;
        border: 1px solid var(--primary);
    }

    .luxury-btn.secondary {
        background: rgba(255, 255, 255, 0.05);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    }

    .btn-glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.4),
            transparent 70%
        );
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    .luxury-btn:hover {
        transform: scale(1.05) translateY(-3px);
    }

    .luxury-btn.primary:hover {
        box-shadow: 0 20px 40px rgba(var(--primary-rgb), 0.4);
    }

    .luxury-btn.primary:hover .btn-glow {
        opacity: 0.3;
    }

    .luxury-btn.secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.3);
    }

    /* Scroll Indicator */
    .scroll-down-premium {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        opacity: 0;
        animation: fadeIn 1s ease 1.5s forwards;
    }

    .mouse {
        width: 26px;
        height: 44px;
        border: 2px solid rgba(255, 255, 255, 0.25);
        border-radius: 20px;
        position: relative;
    }

    .wheel {
        width: 4px;
        height: 8px;
        background: var(--primary);
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 2px;
        animation: scrollWheel 2s infinite;
    }

    @keyframes scrollWheel {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(15px);
        }
    }

    @keyframes titleReveal {
        to {
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

<<<<<<< HEAD
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .hero-main-title {
            font-size: 4rem;
        }
        .hero-action-row {
=======
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
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
            flex-direction: column;
            width: 100%;
            padding: 0 20px;
        }
        .luxury-btn {
            width: 100%;
        }
        :global(.hero-pre-title) {
            letter-spacing: 0.2em;
        }
    }
</style>
