<script lang="ts">
    import { lang } from "$lib/stores/lang";

    interface PortfolioItem {
        title_ar: string;
        title_en: string;
        category: string;
        image: string;
        slug: string;
    }

    let { item }: { item: PortfolioItem } = $props();
</script>

<a href="/portfolio/{item.slug}" class="glass portfolio-card animate-on-scroll">
    <div class="card-image-wrapper">
        <img
            src={item.image}
            alt={$lang === "ar" ? item.title_ar : item.title_en}
            class="portfolio-img"
        />
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
        <span class="card-category">{item.category}</span>
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
    }

    .card-image-wrapper {
        height: 250px;
        background: #222;
        overflow: hidden;
        position: relative;
    }

    @media (max-width: 768px) {
        .card-image-wrapper {
            height: 200px;
        }
    }

    .portfolio-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .portfolio-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        opacity: 0;
        transition: var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .view-btn {
        font-weight: 700;
        color: white;
        border: 2px solid var(--primary);
        padding: 10px 20px;
    }

    .card-content {
        padding: 25px;
    }

    @media (max-width: 480px) {
        .card-content {
            padding: 15px;
        }
    }

    .card-category {
        color: var(--primary);
        font-size: 0.8rem;
        text-transform: uppercase;
        font-weight: 700;
    }

    .card-title {
        margin-top: 5px;
        font-size: 1.25rem;
    }

    @media (max-width: 480px) {
        .card-title {
            font-size: 1.1rem;
        }
    }

    .portfolio-card:hover {
        transform: translateY(-10px);
        border-color: var(--primary);
    }

    .portfolio-card:hover .portfolio-img {
        transform: scale(1.1);
    }

    .portfolio-card:hover .portfolio-overlay {
        opacity: 1;
    }
</style>
