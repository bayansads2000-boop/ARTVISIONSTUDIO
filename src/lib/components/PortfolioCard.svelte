<script lang="ts">
    import { lang } from "$lib/stores/lang";

    interface PortfolioItem {
        title_ar: string;
        title_en: string;
        category: string;
        image: string;
        thumbnail?: string;
        video_link?: string;
        slug: string;
    }

    let { item }: { item: PortfolioItem } = $props();

    const displayImage = $derived(
        item.video_link && item.thumbnail ? item.thumbnail : item.image,
    );

    const categoryMap: Record<string, string> = {
        websites: "Web Development",
        designs: "Creative Design",
        videos: "Video Production",
    };

    const categoryMapAr: Record<string, string> = {
        websites: "تطوير المواقع",
        designs: "تصميم إبداعي",
        videos: "إنتاج مرئي",
    };
</script>

<a
    href="/portfolio/{item.slug}"
    class="portfolio-card-premium animate-on-scroll"
>
    <div class="card-inner glass">
        <div class="card-image-wrapper">
            <img
                src={displayImage}
                alt={$lang === "ar" ? item.title_ar : item.title_en}
                class="portfolio-img"
            />

            {#if item.video_link}
                <div class="video-indicator">
                    <span class="pulse"></span>
                    <span class="indicator-text"
                        >{$lang === "ar" ? "فيديو" : "Video"}</span
                    >
                </div>
            {/if}

            <div class="hover-overlay">
                <div class="icon-circle">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>

        <div
            class="card-info"
            style="text-align: {$lang === 'ar' ? 'right' : 'left'};"
        >
            <div class="meta-info">
                <span class="category-text">
                    {$lang === "ar"
                        ? categoryMapAr[item.category]
                        : categoryMap[item.category]}
                </span>
            </div>
            <h3 class="project-title">
                {$lang === "ar" ? item.title_ar : item.title_en}
            </h3>
        </div>
    </div>
    <div class="card-bg-glow"></div>
</a>

<style>
    .portfolio-card-premium {
        position: relative;
        display: block;
        text-decoration: none;
        color: inherit;
        border-radius: 28px;
        transition: transform 0.6s var(--ease-out-expo);
        z-index: 1;
        background: rgba(255, 255, 255, 0.01);
    }

    .card-inner {
        position: relative;
        overflow: hidden;
        border-radius: 28px;
        background: rgba(15, 15, 15, 0.7);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.5s var(--ease-out-expo);
        z-index: 2;
    }

    .card-image-wrapper {
        aspect-ratio: 16/10;
        overflow: hidden;
        position: relative;
        mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
        -webkit-mask-image: linear-gradient(
            to bottom,
            black 85%,
            transparent 100%
        );
    }

    .portfolio-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .video-indicator {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        padding: 6px 12px;
        border-radius: 100px;
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 3;
    }

    :global([dir="rtl"]) .video-indicator {
        right: auto;
        left: 20px;
    }

    .pulse {
        width: 8px;
        height: 8px;
        background: var(--primary);
        border-radius: 50%;
        box-shadow: 0 0 0 0 rgba(227, 30, 36, 0.7);
        animation: pulse-red 2s infinite;
    }

    @keyframes pulse-red {
        0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(227, 30, 36, 0.7);
        }
        70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(227, 30, 36, 0);
        }
        100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(227, 30, 36, 0);
        }
    }

    .indicator-text {
        font-size: 0.65rem;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: white;
    }

    .hover-overlay {
        position: absolute;
        inset: 0;
        background: rgba(var(--primary-rgb), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.5s ease;
        z-index: 4;
    }

    .icon-circle {
        width: 50px;
        height: 50px;
        background: white;
        color: black;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(0.5) rotate(-45deg);
        transition: all 0.6s var(--ease-out-expo);
    }

    .card-info {
        padding: 24px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
    }

    .meta-info {
        margin-bottom: 8px;
    }

    .category-text {
        font-size: 0.7rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: var(--primary);
        opacity: 0.9;
    }

    .project-title {
        margin: 0;
        font-size: 1.3rem;
        font-weight: 900;
        line-height: 1.2;
        color: white;
        letter-spacing: -0.01em;
    }

    /* Hover State Improvements */
    .portfolio-card-premium:hover {
        transform: translateY(-12px) scale(1.02);
    }

    .portfolio-card-premium:hover .card-inner {
        border-color: rgba(227, 30, 36, 0.4);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
    }

    .portfolio-card-premium:hover .portfolio-img {
        transform: scale(1.15);
    }

    .portfolio-card-premium:hover .hover-overlay {
        opacity: 1;
    }

    .portfolio-card-premium:hover .icon-circle {
        transform: scale(1) rotate(0);
    }

    .card-bg-glow {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 40px;
        background: var(--primary);
        filter: blur(50px);
        opacity: 0;
        transition: opacity 0.6s ease;
        z-index: 0;
        pointer-events: none;
    }

    .portfolio-card-premium:hover .card-bg-glow {
        opacity: 0.25;
    }

    @media (max-width: 768px) {
        .card-inner {
            border-radius: 22px;
        }

        .project-title {
            font-size: 1.1rem;
        }

        .card-info {
            padding: 18px;
        }

        .icon-circle {
            width: 40px;
            height: 40px;
        }
    }
</style>
