<script lang="ts">
    import { lang } from "$lib/stores/lang";

    import PortfolioCard from "$lib/components/PortfolioCard.svelte";

    interface PortfolioItem {
        title_ar: string;
        title_en: string;
        category: string;
        image: string;
        description_ar: string;
        description_en: string;
        date?: string;
        slug: string;
    }

    let { portfolio }: { portfolio: PortfolioItem[] } = $props();
    let filter = $state("all");

    const filteredPortfolio = $derived(
        portfolio
            .filter(
                (item: PortfolioItem) =>
                    filter === "all" || item.category === filter,
            )
            // @ts-ignore
            .sort(
                (a, b) =>
                    new Date(b.date || 0).getTime() -
                    new Date(a.date || 0).getTime(),
            )
            .slice(0, 21),
    );
</script>

<section id="portfolio" style="padding: 100px 0;">
    <div class="container">
        <h2 class="section-title">
            {$lang === "ar" ? "معرض الأعمال" : "Portfolio"}
        </h2>

        <div
            style="display: flex; justify-content: center; gap: 15px; margin-bottom: 50px;"
        >
            <button
                onclick={() => (filter = "all")}
                class="btn-primary"
                style="background: {filter === 'all'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}"
                >{$lang === "ar" ? "الكل" : "All"}</button
            >
            <button
                onclick={() => (filter = "websites")}
                class="btn-primary"
                style="background: {filter === 'websites'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}"
                >{$lang === "ar" ? "مواقع ويب" : "Websites"}</button
            >
            <button
                onclick={() => (filter = "designs")}
                class="btn-primary"
                style="background: {filter === 'designs'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}"
                >{$lang === "ar" ? "تصميمات" : "Designs"}</button
            >
            <button
                onclick={() => (filter = "videos")}
                class="btn-primary"
                style="background: {filter === 'videos'
                    ? 'var(--primary)'
                    : 'rgba(255,255,255,0.1)'}"
                >{$lang === "ar" ? "فيديوهات" : "Videos"}</button
            >
        </div>

        <div
            style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px;"
        >
            {#each filteredPortfolio as item (item.slug)}
                <PortfolioCard {item} />
            {/each}
        </div>

        <div style="text-align: center; margin-top: 60px;">
            <a
                href="/portfolio"
                class="btn-primary"
                style="padding: 15px 40px; font-size: 1.1rem; text-decoration: none; display: inline-block;"
            >
                {$lang === "ar" ? "عرض جميع الأعمال" : "View All Works"}
            </a>
        </div>
    </div>
</section>

<style>
    .section-title {
        font-size: 3.5rem;
        font-weight: 900;
        margin-bottom: 60px;
        text-align: center;
        letter-spacing: -2px;
    }
</style>
