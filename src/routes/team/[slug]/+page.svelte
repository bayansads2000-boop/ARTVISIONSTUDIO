<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import { onMount } from "svelte";

    let { data } = $props();
    const member = $derived(data.member);

    // Animation state
    let mounted = $state(false);
    onMount(() => {
        mounted = true;
    });
</script>

<svelte:head>
    <title
        >{$lang === "ar" ? member.name_ar : member.name_en} | Art Vision Studio</title
    >
</svelte:head>

<section class="team-details">
    <div class="decor-glow"></div>

    <div class="container">
        <div class="details-grid {mounted ? 'reveal' : ''}">
            <div class="image-column">
                <div class="member-image-wrap glass">
                    <img
                        src={member.image}
                        alt={$lang === "ar" ? member.name_ar : member.name_en}
                        class="main-img"
                    />
                    <div class="image-inner-glow"></div>
                </div>

                <div class="social-side-bar glass">
                    <button class="social-btn">FB</button>
                    <button class="social-btn">IG</button>
                    <button class="social-btn">BE</button>
                </div>
            </div>

            <div class="content-column" dir={$lang === "ar" ? "rtl" : "ltr"}>
                <div class="name-header">
                    <span class="role-caption"
                        >{$lang === "ar"
                            ? "عضو في الفريق"
                            : "Team Member"}</span
                    >
                    <h1 class="member-name-huge">
                        {$lang === "ar" ? member.name_ar : member.name_en}
                    </h1>
                    <div class="name-line"></div>
                </div>

                <div class="bio-section glass">
                    <h3 class="bio-title">
                        {$lang === "ar" ? "عن المبدع" : "About the Creator"}
                    </h3>
                    <p class="bio-text">
                        {$lang === "ar"
                            ? member.description_ar
                            : member.description_en}
                    </p>

                    <div class="skills-mini">
                        <span class="skill-tag">Direction</span>
                        <span class="skill-tag">Cinematography</span>
                        <span class="skill-tag">Design</span>
                    </div>
                </div>

                <div class="cta-section">
                    <a href="/contact" class="luxury-btn primary">
                        {$lang === "ar" ? "تواصل معي" : "Contact Me"}
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .team-details {
        padding: 180px 0 100px;
        min-height: 100vh;
        background: #050505;
        position: relative;
        overflow: hidden;
    }

    .decor-glow {
        position: absolute;
        top: -100px;
        right: -100px;
        width: 600px;
        height: 600px;
        background: radial-gradient(
            circle,
            rgba(227, 30, 36, 0.08),
            transparent 70%
        );
        filter: blur(80px);
        pointer-events: none;
    }

    .details-grid {
        display: grid;
        grid-template-columns: 450px 1fr;
        gap: 80px;
        align-items: center;
        opacity: 0;
        transform: translateY(40px);
        transition: all 1.2s var(--ease-out-expo);
    }

    .details-grid.reveal {
        opacity: 1;
        transform: translateY(0);
    }

    /* Image Column */
    .image-column {
        position: relative;
    }

    .member-image-wrap {
        border-radius: 40px;
        overflow: hidden;
        position: relative;
        aspect-ratio: 4/5;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
    }

    .main-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.8s ease;
    }

    .member-image-wrap:hover .main-img {
        transform: scale(1.05);
    }

    .image-inner-glow {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.4),
            transparent 40%
        );
        pointer-events: none;
    }

    .social-side-bar {
        position: absolute;
        top: 40px;
        right: -30px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 20px 10px;
        border-radius: 100px;
        z-index: 5;
    }

    .social-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-family: var(--font-en);
        font-size: 0.7rem;
        font-weight: 900;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }

    .social-btn:hover {
        background: var(--primary);
        border-color: var(--primary);
        transform: translateX(5px);
    }

    /* Content Column */
    .role-caption {
        font-size: 0.85rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.3em;
        color: var(--primary);
        display: block;
        margin-bottom: 20px;
    }

    .member-name-huge {
        font-size: clamp(3rem, 6vw, 5rem);
        font-weight: 950;
        color: white;
        margin: 0 0 30px;
        line-height: 1;
        letter-spacing: -0.02em;
    }

    .name-line {
        width: 100px;
        height: 5px;
        background: var(--primary);
        border-radius: 100px;
        margin-bottom: 50px;
    }

    .bio-section {
        padding: 40px;
        border-radius: 32px;
        margin-bottom: 40px;
    }

    .bio-title {
        font-size: 1.4rem;
        font-weight: 800;
        margin-bottom: 20px;
        color: white;
    }

    .bio-text {
        font-size: 1.15rem;
        line-height: 1.8;
        color: var(--text-muted);
        margin-bottom: 30px;
    }

    .skills-mini {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .skill-tag {
        background: rgba(255, 255, 255, 0.05);
        padding: 8px 18px;
        border-radius: 100px;
        font-size: 0.85rem;
        font-weight: 700;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .luxury-btn {
        padding: 18px 45px;
        border-radius: 100px;
        font-weight: 800;
        font-size: 1rem;
        display: inline-block;
        transition: all 0.4s var(--ease-out-expo);
    }

    .luxury-btn.primary {
        background: var(--primary);
        color: white;
        box-shadow: 0 15px 30px rgba(var(--primary-rgb), 0.3);
    }

    .luxury-btn.primary:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(var(--primary-rgb), 0.5);
    }

    @media (max-width: 992px) {
        .details-grid {
            grid-template-columns: 1fr;
            gap: 50px;
        }

        .image-column {
            max-width: 500px;
            margin: 0 auto;
        }

        .social-side-bar {
            right: 10px;
        }
    }

    @media (max-width: 768px) {
        .team-details {
            padding: 120px 0 60px;
        }

        .bio-section {
            padding: 30px;
        }
    }
</style>
