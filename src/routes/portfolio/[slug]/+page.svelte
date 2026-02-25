<script lang="ts">
    import { marked } from "marked";
    import { lang } from "$lib/stores/lang";
    import { t } from "$lib/utils/cms";

    let { data } = $props();
    const project = $derived(data.project);
    const settings = $derived(data.settings);

    let htmlBody = $derived(
        project ? ($lang === "ar" ? project.body_ar : project.body_en) : "",
    );
</script>

<svelte:head>
    <title
        >{$lang === "ar" ? project.title_ar : project.title_en} | Art Vision Studio</title
    >
    <meta
        name="description"
        content={$lang === "ar"
            ? project.description_ar
            : project.description_en}
    />
</svelte:head>

<section style="padding: 150px 0 100px;">
    <div class="container">
        <!-- Project Header -->
        <div style="margin-bottom: 60px; text-align: center;">
            <span
                style="color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 2px;"
                >{t(settings, `common.${project.category}`, $lang)}</span
            >
            <h1 style="font-size: 4rem; margin: 10px 0 20px; font-weight: 900;">
                {$lang === "ar" ? project.title_ar : project.title_en}
            </h1>
            <p
                style="font-size: 1.2rem; color: var(--text-muted); max-width: 800px; margin: 0 auto;"
            >
                {$lang === "ar"
                    ? project.description_ar
                    : project.description_en}
            </p>
        </div>

        <!-- Main Image/Video -->
        <div
            style="margin-bottom: 60px; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.5);"
        >
            {#if project.video_link}
                <div
                    style="position: relative; padding-bottom: 56.25%; height: 0;"
                >
                    <iframe
                        src={project.video_link.includes("youtube.com")
                            ? project.video_link.replace("watch?v=", "embed/")
                            : project.video_link}
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        title={$lang === "ar"
                            ? project.title_ar
                            : project.title_en}
                    ></iframe>
                </div>
            {:else if project.video_file}
                <video
                    controls
                    playsinline
                    poster={project.thumbnail || project.image}
                    style="width: 100%; display: block;"
                >
                    <source src={project.video_file} type="video/mp4" />
                    <track kind="captions" />
                </video>
            {:else}
                <img
                    src={project.image}
                    alt={$lang === "ar" ? project.title_ar : project.title_en}
                    style="width: 100%; display: block;"
                />
            {/if}
        </div>

        <!-- Project Content -->
        <div
            style="display: grid; grid-template-columns: 2fr 1fr; gap: 60px; align-items: start;"
        >
            <div
                class="glass"
                style="padding: 40px; line-height: 1.8; font-size: 1.1rem; text-align: {$lang ===
                'ar'
                    ? 'right'
                    : 'left'};"
            >
                <h3 style="margin-bottom: 20px; color: var(--primary);">
                    {t(settings, "common.project_details", $lang)}
                </h3>
                <div class="prose">
                    {@html marked.parse(htmlBody)}
                </div>
            </div>

            <div style="display: grid; gap: 30px;">
                <div
                    class="glass"
                    style="padding: 30px; text-align: {$lang === 'ar'
                        ? 'right'
                        : 'left'};"
                >
                    <h4 style="margin-bottom: 15px;">
                        {t(settings, "common.order_similar_work", $lang)}
                    </h4>
                    <p
                        style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;"
                    >
                        {$lang === "ar"
                            ? "هل أعجبك هذا العمل؟ تواصل معنا لننفذ لك مشروعاً بمستوى احترافي مشابه."
                            : "Did you like this work? Contact us to execute a professional project for you."}
                    </p>
                    <a
                        href="https://wa.me/{settings?.contact
                            ?.whatsapp}?text={encodeURIComponent(
                            settings?.whatsapp_messages?.portfolio_msg +
                                ($lang === 'ar'
                                    ? project.title_ar
                                    : project.title_en),
                        )}"
                        target="_blank"
                        class="btn-primary"
                        style="width: 100%; text-align: center;"
                    >
                        {t(settings, "common.contact_now", $lang)}
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .prose :global(p) {
        margin-bottom: 20px;
    }
</style>
