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
</script>

<a href="/portfolio/{item.slug}" class="glass portfolio-card animate-on-scroll">
    <div class="card-image-wrapper">
        <img
            src={displayImage}
            alt={$lang === "ar" ? item.title_ar : item.title_en}
            class="portfolio-img"
        />
        {#if item.video_link}
            <div class="video-play-indicator">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
            </div>
        {/if}
        <div class="portfolio-overlay">
            <span class="view-btn">
                {$lang === "ar" ? "عرض التفاصيل" : "View Details"}
            </span>
        </div>
    </div>
    <div
        class="card-content"
        style="text-align: {$lang === 'ar' ? 'right' : 'left'};"
    >
        <div class="card-meta">
            <span class="card-category"
                >{$lang === "ar"
                    ? item.category === "websites"
                        ? "موقع ويب"
                        : item.category === "designs"
                          ? "تصميم إبداعي"
                          : "فيديو إحترافي"
                    : item.category}</span
            >
        </div>
        <h3 class="card-title">
            {$lang === "ar" ? item.title_ar : item.title_en}
        </h3>
    </div>
</a>

<style>
    .portfolio-card {
        overflow: hidden;
        cursor: pointer;
        transition: var(--transition);
        text-decoration: none;
        color: inherit;
        display: block;
        border-radius: 20px;
    }

    .card-image-wrapper {
        aspect-ratio: 16/10;
        background: #222;
        overflow: hidden;
        position: relative;
    }

    .portfolio-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .video-play-indicator {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: rgba(227, 30, 36, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        z-index: 2;
        box-shadow: 0 4px 15px rgba(227, 30, 36, 0.4);
    }

    :global([dir="rtl"]) .video-play-indicator {
        right: auto;
        left: 20px;
    }

    .video-play-indicator svg {
        width: 20px;
        height: 20px;
        margin-left: 2px;
    }

    .portfolio-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(5px);
        opacity: 0;
        transition: var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
    }

    .view-btn {
        font-weight: 700;
        color: white;
        border: 2px solid var(--primary);
        padding: 12px 25px;
        border-radius: 50px;
        background: var(--primary);
        transform: translateY(20px);
        transition:
            transform 0.4s ease,
            opacity 0.4s ease;
    }

    .card-content {
        padding: 20px;
    }

    .card-meta {
        margin-bottom: 8px;
    }

    .card-category {
        color: var(--primary);
        font-size: 0.75rem;
        text-transform: uppercase;
        font-weight: 800;
        letter-spacing: 0.05em;
    }

    .card-title {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 700;
        line-height: 1.4;
    }

    .portfolio-card:hover {
        transform: translateY(-5px);
        border-color: rgba(227, 30, 36, 0.5);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .portfolio-card:hover .portfolio-img {
        transform: scale(1.1);
    }

    .portfolio-card:hover .portfolio-overlay {
        opacity: 1;
    }

    .portfolio-card:hover .view-btn {
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        .card-image-wrapper {
            aspect-ratio: 16/9;
        }

        .card-title {
            font-size: 1rem;
        }
    }
</style>
