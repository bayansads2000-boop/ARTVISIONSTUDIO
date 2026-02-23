<script lang="ts">
    import { lang } from "$lib/stores/lang";

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
                    {$lang === "ar"
                        ? settings?.contact_cta?.title_ar || "جاهز لنبدأ "
                        : settings?.contact_cta?.title_en || "Ready to "}
                    {#if !settings?.contact_cta?.title_ar && $lang === "ar"}
                        <span style="color: var(--primary);">الإبداع؟</span>
                    {/if}
                    {#if !settings?.contact_cta?.title_en && $lang === "en"}
                        <span style="color: var(--primary);">Start?</span>
                    {/if}
                </h2>
                <p style="color: var(--text-muted); margin-bottom: 30px;">
                    {$lang === "ar"
                        ? settings?.contact_cta?.desc_ar ||
                          "نحن هنا لنحول فكرتك إلى واقع مبهر."
                        : settings?.contact_cta?.desc_en ||
                          "We are here to turn your idea into a stunning reality."}
                </p>

                <div style="display: grid; gap: 20px;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div
                            style="width: 50px; height: 50px; background: rgba(227,30,36,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary);"
                        >
                            📍
                        </div>
                        <div>
                            <h4
                                style="font-size: 0.9rem; color: var(--text-muted);"
                            >
                                {$lang === "ar" ? "الموقع" : "Location"}
                            </h4>
                            <p>{settings?.contact?.address}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div
                            style="width: 50px; height: 50px; background: rgba(227,30,36,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary);"
                        >
                            📧
                        </div>
                        <div>
                            <h4
                                style="font-size: 0.9rem; color: var(--text-muted);"
                            >
                                {$lang === "ar" ? "الايميل" : "Email"}
                            </h4>
                            <p>{settings?.contact?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 30px;"
            >
                <h3 style="font-size: 2rem;">
                    {$lang === "ar"
                        ? settings?.contact_cta?.box_title_ar ||
                          "هل لديك مشروع في بالك؟"
                        : settings?.contact_cta?.box_title_en ||
                          "Have a project in mind?"}
                </h3>
                <p style="color: var(--text-muted);">
                    {$lang === "ar"
                        ? settings?.contact_cta?.box_desc_ar ||
                          "تواصل معنا الآن لنبدأ العمل على مشروعك القادم ونحوله إلى واقع."
                        : settings?.contact_cta?.box_desc_en ||
                          "Contact us now to start working on your next project and turn it into reality."}
                </p>
                <a
                    href="/contact"
                    class="btn-primary"
                    style="padding: 15px 50px; font-size: 1.2rem; text-decoration: none;"
                >
                    {$lang === "ar"
                        ? settings?.contact_cta?.btn_text_ar ||
                          "تواصل معنا الآن"
                        : settings?.contact_cta?.btn_text_en ||
                          "Contact Us Now"}
                </a>
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
