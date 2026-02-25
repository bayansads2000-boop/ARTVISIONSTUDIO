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
<<<<<<< HEAD
    const swiperBreakpoints = {
        0: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: "auto",
            spaceBetween: 40,
        },
    };
</script>

<section id="team" class="team-section">
    <div class="bg-decor">
        <div class="decor-circle decor-1"></div>
        <div class="decor-circle decor-2"></div>
    </div>

    <div class="container relative z-10">
        <div class="section-header animate-on-scroll">
            <span class="pre-title"
                >{$lang === "ar" ? "فريق العمل" : "Our Creative Team"}</span
            >
            <h2 class="title-main">
                {t(settings, "pages.team.title", $lang)}
            </h2>
            <div class="header-line"></div>
=======
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
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
        </div>
    </div>

    <div class="swiper-full-wrapper">
<<<<<<< HEAD
        {#key $lang}
            <swiper-container
                init="true"
                loop={team.length > 2}
                slides-per-view="2"
                space-between="15"
                dir={$lang === "ar" ? "rtl" : "ltr"}
                autoplay-delay="4000"
                speed="1200"
                pagination="true"
                pagination-type="progressbar"
                grab-cursor="true"
                breakpoints={JSON.stringify(swiperBreakpoints)}
                class="team-swiper"
            >
                {#each team as member (member.slug)}
                    <swiper-slide class="team-slide">
                        <a href="/team/{member.slug}" class="team-card-link">
                            <div class="team-card-premium">
                                <div class="card-inner-glass glass">
                                    <div class="member-image-box">
                                        <img
                                            src={member.image}
                                            alt={$lang === "ar"
                                                ? member.name_ar
                                                : member.name_en}
                                            class="member-img"
                                        />
                                        <div class="image-overlay"></div>
                                    </div>

                                    <div class="member-info">
                                        <h3 class="member-name">
                                            {$lang === "ar"
                                                ? member.name_ar
                                                : member.name_en}
                                        </h3>
                                        <div class="member-role">
                                            <span class="role-line"></span>
                                            <span class="role-text"
                                                >{$lang === "ar"
                                                    ? "شريك إبداعي"
                                                    : "Creative Partner"}</span
                                            >
                                        </div>
                                        <p class="member-desc">
                                            {$lang === "ar"
                                                ? member.description_ar
                                                : member.description_en}
                                        </p>
                                    </div>

                                    <div class="card-footer-decor">
                                        <div class="social-dots">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-shadow"></div>
                            </div>
                        </a>
                    </swiper-slide>
                {/each}
            </swiper-container>
        {/key}
=======
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
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
    </div>
</section>

<style>
    .team-section {
<<<<<<< HEAD
        padding: 120px 0;
        overflow-x: hidden;
        position: relative;
        background: var(--bg-dark);
    }

    .bg-decor {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
    }

    .decor-circle {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.15;
    }

    .decor-1 {
        top: -10%;
        left: 10%;
        width: 400px;
        height: 400px;
        background: var(--primary);
    }

    .decor-2 {
        bottom: 10%;
        right: 10%;
        width: 350px;
        height: 350px;
        background: rgba(var(--primary-rgb), 0.5);
=======
        padding: 100px 0;
        overflow-x: hidden;
        background: radial-gradient(
            circle at 50% -20%,
            rgba(227, 30, 36, 0.05),
            transparent 70%
        );
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
    }

    .section-header {
        text-align: center;
<<<<<<< HEAD
        margin-bottom: 80px;
    }

    .pre-title {
        font-size: 0.9rem;
        font-weight: 800;
        color: var(--primary);
        text-transform: uppercase;
        letter-spacing: 0.3em;
        margin-bottom: 20px;
        display: block;
    }

    .title-main {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 900;
        color: white;
        margin: 0 0 25px;
        letter-spacing: -0.02em;
    }

    .header-line {
        width: 80px;
        height: 4px;
        background: var(--primary);
        margin: 0 auto;
        border-radius: 10px;
    }

    .swiper-full-wrapper {
        width: 100%;
        margin: 0 auto;
    }

    .team-slide {
        height: auto;
        padding-bottom: 40px;
    }

    @media (min-width: 769px) {
        .team-slide {
            width: 380px;
        }
    }

    .team-card-premium {
        position: relative;
        height: 100%;
        transition: transform 0.5s var(--ease-out-expo);
    }

    .card-inner-glass {
        position: relative;
        padding: 30px;
        border-radius: 40px;
        background: rgba(15, 15, 15, 0.7);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        height: 100%;
        display: flex;
        flex-direction: column;
        z-index: 2;
        transition: all 0.5s var(--ease-out-expo);
    }

    .member-image-box {
        position: relative;
        width: 140px;
        height: 140px;
        margin: 0 auto 30px;
        border-radius: 50%;
        padding: 6px;
        background: linear-gradient(45deg, var(--primary), transparent);
=======
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
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
    }

    .member-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
<<<<<<< HEAD
        border: 4px solid var(--bg-dark);
        transition: filter 0.4s ease;
    }

    .image-overlay {
        position: absolute;
        inset: 6px;
        border-radius: 50%;
        background: var(--primary);
        opacity: 0;
        transition: opacity 0.4s ease;
        mix-blend-mode: soft-light;
    }

    .member-info {
        text-align: center;
        flex: 1;
    }

    .member-name {
        font-size: 1.6rem;
        font-weight: 800;
        margin-bottom: 8px;
        color: white;
    }

    .member-role {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .role-line {
        width: 15px;
        height: 2px;
        background: var(--primary);
        border-radius: 2px;
    }

    .role-text {
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--primary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .member-desc {
        font-size: 0.95rem;
        color: var(--text-muted);
        line-height: 1.7;
        opacity: 0.8;
=======
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
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

<<<<<<< HEAD
    .card-footer-decor {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .social-dots {
        display: flex;
        justify-content: center;
        gap: 8px;
    }

    .social-dots span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transition:
            background 0.3s ease,
            transform 0.3s ease;
    }

    /* Hover State */
    .team-card-premium:hover {
        transform: translateY(-12px);
    }

    .team-card-premium:hover .card-inner-glass {
        border-color: rgba(227, 30, 36, 0.3);
        background: rgba(255, 255, 255, 0.05);
    }

    .team-card-premium:hover .image-overlay {
        opacity: 0.3;
    }

    .team-card-premium:hover .social-dots span {
        background: var(--primary);
        transform: scale(1.2);
    }

    .team-card-premium:hover .social-dots span:nth-child(2) {
        transition-delay: 0.1s;
    }
    .team-card-premium:hover .social-dots span:nth-child(3) {
        transition-delay: 0.2s;
    }

    .card-shadow {
        position: absolute;
        bottom: 0;
        left: 10%;
        right: 10%;
        height: 40px;
        background: var(--primary);
        filter: blur(40px);
        opacity: 0;
        transition: opacity 0.5s ease;
        z-index: 1;
        pointer-events: none;
    }

    .team-card-premium:hover .card-shadow {
        opacity: 0.25;
    }

    swiper-container::part(pagination) {
        height: 2px;
        background: rgba(255, 255, 255, 0.05);
        position: relative;
        bottom: 0;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
    }

    swiper-container::part(pagination-progressbar-fill) {
        background: var(--primary);
=======
    .team-card:hover {
        transform: translateY(-15px);
        border-color: var(--primary);
    }

    swiper-container::part(container) {
        padding: 20px 5vw;
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
    }

    @media (max-width: 768px) {
        .team-section {
<<<<<<< HEAD
            padding: 80px 0;
        }

        swiper-container::part(container) {
            padding: 30px 2.5vw;
=======
            padding: 60px 0;
        }

        .section-title {
            font-size: 2.2rem;
        }

        .team-slide {
            width: 280px;
>>>>>>> e2dfc65c14e105a8a94b5e66d80da89ef0ea5286
        }
    }
</style>
