<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import { t } from "$lib/utils/cms";

    let { settings } = $props();
</script>

<section id="contact" style="padding: 100px 0; background: #050505;">
    <div class="container">
        <div
            class="glass animate-on-scroll"
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 60px; padding: 60px;"
        >
            <div style="text-align: {$lang === 'ar' ? 'right' : 'left'};">
                <h2 style="font-size: 3rem; margin-bottom: 20px;">
                    {t(settings, "contact_cta.title")}
                </h2>
                <p style="color: var(--text-muted); margin-bottom: 30px;">
                    {t(settings, "contact_cta.desc")}
                </p>

                <div style="display: grid; gap: 20px;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div
                            style="width: 50px; height: 50px; background: rgba(var(--primary-rgb, 227, 30, 36), 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary);"
                        >
                            📍
                        </div>
                        <div>
                            <h4
                                style="font-size: 0.9rem; color: var(--text-muted);"
                            >
                                {t(settings, "common.location")}
                            </h4>
                            <p>{settings?.contact?.address ?? ""}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div
                            style="width: 50px; height: 50px; background: rgba(var(--primary-rgb, 227, 30, 36), 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary);"
                        >
                            📧
                        </div>
                        <div>
                            <h4
                                style="font-size: 0.9rem; color: var(--text-muted);"
                            >
                                {t(settings, "common.email")}
                            </h4>
                            <p>{settings?.contact?.email ?? ""}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 30px;"
            >
                <h3 style="font-size: 2rem;">
                    {t(settings, "contact_cta.box_title")}
                </h3>
                <p style="color: var(--text-muted);">
                    {t(settings, "contact_cta.box_desc")}
                </p>
                {#if t(settings, "contact_cta.btn_text")}
                    <a
                        href="/contact"
                        class="btn-primary"
                        style="padding: 15px 50px; font-size: 1.2rem; text-decoration: none;"
                    >
                        {t(settings, "contact_cta.btn_text")}
                    </a>
                {/if}
            </div>
        </div>
    </div>
</section>

<style>
    .glass:hover {
        transform: translateY(-10px);
        border-color: var(--primary);
    }
</style>
