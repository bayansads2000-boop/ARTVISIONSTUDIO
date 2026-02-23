<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import WaterEffect from "$lib/components/WaterEffect.svelte";

    let { settings } = $props();
</script>

<section
    class="hero-section"
    style="min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; background: #020205;"
>
    <!-- Liquid Water Effect -->
    <WaterEffect />

    <div class="vignette"></div>

    <div
        class="container"
        style="text-align: center; position: relative; z-index: 2;"
    >
        <div class="hero-content">
            <h1 class="hero-title">
                <span class="hero-subtitle"
                    >{$lang === "ar" ? "نحن نصنع" : "WE CREATE"}</span
                >
                <span class="hero-accent">
                    {settings?.hero?.title_accent || "VISION"}
                </span>
            </h1>
            <p class="hero-description">
                {settings?.hero?.subtitle ||
                    ($lang === "ar"
                        ? "وكالة إبداعية تحول الخيال إلى واقع رقمي مبهر."
                        : "A creative agency turning imagination into stunning digital reality.")}
            </p>
            <div class="hero-btns">
                <a href="/portfolio" class="btn-primary main-btn">
                    {settings?.hero?.cta_text ||
                        ($lang === "ar" ? "شاهد أعمالنا" : "View Work")}
                </a>
                <a href="/contact" class="btn-primary outline-btn">
                    {$lang === "ar" ? "ابدأ الآن" : "Start Now"}
                </a>
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

    .hero-subtitle {
        display: block;
        opacity: 0.9;
        font-size: 0.35em;
        letter-spacing: 18px;
        margin-bottom: 25px;
        font-weight: 700;
        color: var(--text-muted);
    }

    .hero-accent {
        color: var(--primary);
        text-shadow: 0 0 70px rgba(227, 30, 36, 0.7);
        display: block;
        filter: drop-shadow(0 0 20px rgba(227, 30, 36, 0.4));
    }

    .hero-description {
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
        box-shadow: 0 15px 40px rgba(227, 30, 36, 0.4);
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
