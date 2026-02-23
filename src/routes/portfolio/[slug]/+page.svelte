<script lang="ts">
    import { onMount } from "svelte";
    import { marked } from "marked";

    let { data } = $props();
    const project = $derived(data.project);

    let htmlBody = $derived(project.body ? marked.parse(project.body) : "");
</script>

<svelte:head>
    <title>{project.title} | Art Vision Studio</title>
    <meta name="description" content={project.description} />
    <meta property="og:title" content={project.title} />
    <meta property="og:description" content={project.description} />
    <meta property="og:image" content={project.image} />
</svelte:head>

<section style="padding: 150px 0 100px;">
    <div class="container">
        <!-- Project Header -->
        <div style="margin-bottom: 60px; text-align: center;">
            <span
                style="color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 2px;"
                >{project.category}</span
            >
            <h1 style="font-size: 4rem; margin: 10px 0 20px; font-weight: 900;">
                {project.title}
            </h1>
            <p
                style="font-size: 1.2rem; color: var(--text-muted); max-width: 800px; margin: 0 auto;"
            >
                {project.description}
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
                        title={project.title}
                    ></iframe>
                </div>
            {:else}
                <img
                    src={project.image}
                    alt={project.title}
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
                style="padding: 40px; line-height: 1.8; font-size: 1.1rem;"
            >
                <h3 style="margin-bottom: 20px; color: var(--primary);">
                    تفاصل المشروع
                </h3>
                <div class="prose">
                    {@html htmlBody}
                </div>
            </div>

            <div style="display: grid; gap: 30px;">
                <div class="glass" style="padding: 30px;">
                    <h4 style="margin-bottom: 15px;">معلومات</h4>
                    <div
                        style="display: grid; gap: 10px; color: var(--text-muted);"
                    >
                        <div>
                            <strong>التاريخ:</strong>
                            {project.date || "---"}
                        </div>
                        <div><strong>التصنيف:</strong> {project.category}</div>
                    </div>
                    {#if project.link}
                        <a
                            href={project.link}
                            target="_blank"
                            class="btn-primary"
                            style="margin-top: 25px; width: 100%; text-align: center;"
                            >زيارة المشروع</a
                        >
                    {/if}
                </div>

                {#if project.gallery && project.gallery.length > 0}
                    <div class="glass" style="padding: 30px;">
                        <h4 style="margin-bottom: 15px;">معرض الصور</h4>
                        <div
                            style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;"
                        >
                            {#each project.gallery as img}
                                <img
                                    src={img}
                                    alt="Gallery item"
                                    style="width: 100%; border-radius: 8px; cursor: pointer;"
                                />
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</section>

<style>
    .prose :global(p) {
        margin-bottom: 20px;
    }
    .prose :global(h2),
    .prose :global(h3) {
        margin: 30px 0 15px;
        color: white;
    }
</style>
