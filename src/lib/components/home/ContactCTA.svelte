<script lang="ts">
    import { lang } from "$lib/stores/lang";
    import { t } from "$lib/utils/cms";

    let { settings } = $props();
</script>

<section id="contact" class="contact-cta-section">
    <div class="container">
        <div class="glass contact-box animate-on-scroll">
            <div
                class="contact-info"
                style="text-align: {$lang === 'ar' ? 'right' : 'left'};"
            >
                <h2 class="contact-title">
                    {t(settings, "contact_cta.title")}
                </h2>
                <p class="contact-desc">
                    {t(settings, "contact_cta.desc")}
                </p>

                <div class="contact-details">
                    <div class="detail-item">
                        <div class="detail-icon">📍</div>
                        <div>
                            <h4 class="detail-label">
                                {t(settings, "common.location")}
                            </h4>
                            <p>{settings?.contact?.address ?? ""}</p>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon">📧</div>
                        <div>
                            <h4 class="detail-label">
                                {t(settings, "common.email")}
                            </h4>
                            <p>{settings?.contact?.email ?? ""}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="contact-action">
                <h3 class="action-title">
                    {t(settings, "contact_cta.box_title")}
                </h3>
                <p class="action-desc">
                    {t(settings, "contact_cta.box_desc")}
                </p>
                {#if t(settings, "contact_cta.btn_text")}
                    <a href="/contact" class="btn-primary contact-btn">
                        {t(settings, "contact_cta.btn_text")}
                    </a>
                {/if}
            </div>
        </div>
    </div>
</section>

<style>
    .contact-cta-section {
        padding: 100px 0;
        background: #050505;
    }

    .contact-box {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 60px;
        padding: 60px;
        transition: var(--transition);
    }

    .contact-title {
        font-size: 3rem;
        margin-bottom: 20px;
    }

    .contact-desc {
        color: var(--text-muted);
        margin-bottom: 30px;
    }

    .contact-details {
        display: grid;
        gap: 20px;
    }

    .detail-item {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .detail-icon {
        width: 50px;
        height: 50px;
        background: rgba(var(--primary-rgb, 227, 30, 36), 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);
    }

    .detail-label {
        font-size: 0.9rem;
        color: var(--text-muted);
    }

    .contact-action {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 20px;
    }

    .action-title {
        font-size: 2rem;
    }

    .action-desc {
        color: var(--text-muted);
    }

    .contact-btn {
        padding: 15px 40px;
        font-size: 1.1rem;
        width: auto;
    }

    @media (max-width: 768px) {
        .contact-cta-section {
            padding: 60px 0;
        }

        .contact-box {
            padding: 30px 20px;
            gap: 40px;
        }

        .contact-title {
            font-size: 2rem;
        }

        .action-title {
            font-size: 1.5rem;
        }

        .contact-btn {
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }

    .contact-box:hover {
        transform: translateY(-5px);
        border-color: var(--primary);
    }
</style>
