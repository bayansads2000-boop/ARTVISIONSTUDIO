<script lang="ts">
    import { onMount } from "svelte";
    import { lang } from "$lib/stores/lang";
    import { t } from "$lib/utils/cms";
    import { register } from "swiper/element/bundle";

    interface TeamMember {
        name_ar: string;
        name_en: string;
        description_ar: string;
        description_en: string;
        image: string;
        slug: string;
    }

    let { team, settings }: { team: TeamMember[]; settings: any } = $props();

    onMount(() => {
        register();
    });
</script>

<section id="team" class="team-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">
                {$lang === "ar" ? "فريق الإبداع" : "Creative Team"}
            </h2>
            <p class="section-desc">
                {$lang === "ar"
                    ? "نخبة من المبدعين يعملون بشغف لتحويل رؤيتك إلى واقع ملموس."
                    : "A group of creative minds working with passion to turn your vision into reality."}
            </p>
        </div>
    </div>

    <div class="swiper-full-wrapper">
        <swiper-container
            init="true"
            loop="true"
            autoplay-delay="4000"
            autoplay-disable-on-interaction="false"
            speed="1500"
            slides-per-view="auto"
            space-between="30"
            mousewheel="true"
            class="team-swiper"
        >
            {#each team as member (member.slug)}
                <swiper-slide class="team-slide">
                    <div class="team-card glass">
                        <div class="member-image-wrapper">
                            <img
                                src={member.image}
                                alt={$lang === "ar"
                                    ? member.name_ar
                                    : member.name_en}
                                class="member-img"
                            />
                        </div>
                        <div class="member-info">
                            <h3 class="member-name">
                                {$lang === "ar"
                                    ? member.name_ar
                                    : member.name_en}
                            </h3>
                            <p class="member-desc">
                                {$lang === "ar"
                                    ? member.description_ar
                                    : member.description_en}
                            </p>
                        </div>
                    </div>
                </swiper-slide>
            {/each}
        </swiper-container>
    </div>
</section>

<style>
    .team-section {
        padding: 100px 0;
        overflow-x: hidden;
        background: radial-gradient(
            circle at 50% -20%,
            rgba(227, 30, 36, 0.05),
            transparent 70%
        );
    }

    .section-header {
        text-align: center;
        margin-bottom: 60px;
    }

    .section-title {
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 15px;
    }

    .section-desc {
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto;
    }

    .swiper-full-wrapper {
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        padding: 40px 0;
    }

    .team-slide {
        width: 320px;
        height: auto;
    }

    .team-card {
        padding: 20px;
        border-radius: 24px;
        text-align: center;
        transition:
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.5s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .member-image-wrapper {
        width: 150px;
        height: 150px;
        margin: 0 auto 25px;
        border-radius: 50%;
        overflow: hidden;
        border: 4px solid var(--primary);
        padding: 5px;
        background: rgba(227, 30, 36, 0.1);
        box-shadow: 0 10px 30px rgba(227, 30, 36, 0.2);
    }

    .member-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .member-name {
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 12px;
        color: white;
    }

    .member-desc {
        font-size: 0.95rem;
        color: var(--text-muted);
        line-height: 1.6;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .team-card:hover {
        transform: translateY(-15px);
        border-color: var(--primary);
    }

    swiper-container::part(container) {
        padding: 20px 5vw;
    }

    @media (max-width: 768px) {
        .team-section {
            padding: 60px 0;
        }

        .section-title {
            font-size: 2.2rem;
        }

        .team-slide {
            width: 280px;
        }
    }
</style>
