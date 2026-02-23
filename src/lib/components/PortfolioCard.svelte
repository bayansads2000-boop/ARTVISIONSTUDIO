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

<a
    href="/portfolio/{item.slug}"
    class="glass animate-on-scroll"
    style="overflow: hidden; cursor: pointer; transition: var(--transition); text-decoration: none; color: inherit; display: block;"
>
    <div
        style="height: 250px; background: #222; overflow: hidden; position: relative;"
    >
        <img
            src={item.image}
            alt={$lang === "ar" ? item.title_ar : item.title_en}
            style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition);"
            class="portfolio-img"
        />
        <div
            class="portfolio-overlay"
            style="position: absolute; inset: 0; background: rgba(0,0,0,0.8); opacity: 0; transition: var(--transition); display: flex; align-items: center; justify-content: center;"
        >
            <span
                style="font-weight: 700; color: white; border: 2px solid var(--primary); padding: 10px 20px;"
                >{$lang === "ar" ? "عرض التفاصيل" : "View Details"}</span
            >
        </div>
    </div>
    <div
        style="padding: 25px; text-align: {$lang === 'ar' ? 'right' : 'left'};"
    >
        <span
            style="color: var(--primary); font-size: 0.8rem; text-transform: uppercase; font-weight: 700;"
            >{item.category}</span
        >
        <h3 style="margin-top: 5px;">
            {$lang === "ar" ? item.title_ar : item.title_en}
        </h3>
    </div>
</a>

<style>
    .glass:hover {
        transform: translateY(-10px);
        border-color: var(--primary);
    }
    .portfolio-img {
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glass:hover .portfolio-img {
        transform: scale(1.1);
    }
    .glass:hover .portfolio-overlay {
        opacity: 1;
    }
</style>
