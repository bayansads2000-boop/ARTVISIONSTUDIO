<script lang="ts">
    import { lang } from "$lib/stores/lang";
    let { data }: { data: { settings: any } } = $props();
    const settings = $derived(data.settings);
</script>

<svelte:head>
    <title
        >{$lang === "ar" ? "اتصل بنا" : "Contact Us"} | Art Vision Studio</title
    >
</svelte:head>

<section style="padding: 150px 0 100px;">
    <div class="container">
        <div style="text-align: center; margin-bottom: 80px;">
            <h1 style="font-size: 4rem; font-weight: 900; margin-bottom: 20px;">
                {$lang === "ar" ? "تواصل معنا" : "Get in Touch"}
            </h1>
            <p
                style="font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto;"
            >
                {$lang === "ar"
                    ? "نحن هنا للإجابة على استفساراتك ومساعدتك في بدء مشروعك القادم."
                    : "We are here to answer your inquiries and help you start your next project."}
            </p>
        </div>

        <div
            class="glass"
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 60px; padding: 60px;"
        >
            <div style="text-align: {$lang === 'ar' ? 'right' : 'left'};">
                <h2 style="font-size: 2.5rem; margin-bottom: 30px;">
                    {$lang === "ar" ? "معلومات " : "Contact "}
                    <span style="color: var(--primary);"
                        >{$lang === "ar" ? "التواصل" : "Info"}</span
                    >
                </h2>

                <div style="display: grid; gap: 30px;">
                    <div style="display: flex; align-items: center; gap: 20px;">
                        <div
                            style="width: 60px; height: 60px; background: rgba(227,30,36,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: var(--primary);"
                        >
                            📍
                        </div>
                        <div>
                            <h4
                                style="color: var(--text-muted); font-size: 0.9rem;"
                            >
                                {$lang === "ar" ? "الموقع" : "Location"}
                            </h4>
                            <p style="font-size: 1.1rem; font-weight: 600;">
                                {settings?.contact?.address}
                            </p>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 20px;">
                        <div
                            style="width: 60px; height: 60px; background: rgba(227,30,36,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: var(--primary);"
                        >
                            📧
                        </div>
                        <div>
                            <h4
                                style="color: var(--text-muted); font-size: 0.9rem;"
                            >
                                {$lang === "ar" ? "الايميل" : "Email"}
                            </h4>
                            <p style="font-size: 1.1rem; font-weight: 600;">
                                {settings?.contact?.email}
                            </p>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 20px;">
                        <div
                            style="width: 60px; height: 60px; background: rgba(227,30,36,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: var(--primary);"
                        >
                            📞
                        </div>
                        <div>
                            <h4
                                style="color: var(--text-muted); font-size: 0.9rem;"
                            >
                                {$lang === "ar" ? "الهاتف" : "Phone"}
                            </h4>
                            <p
                                style="font-size: 1.1rem; font-weight: 600;"
                                dir="ltr"
                            >
                                {settings?.contact?.phone}
                            </p>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 50px; display: flex; gap: 15px;">
                    <a
                        href="https://wa.me/{settings?.contact?.whatsapp}"
                        class="btn-primary"
                        style="flex: 1; text-align: center;">WhatsApp</a
                    >
                    <a
                        href="mailto:{settings?.contact?.email}"
                        class="btn-primary"
                        style="flex: 1; text-align: center; background: transparent; border: 2px solid var(--primary);"
                        >Email Us</a
                    >
                </div>
            </div>

            <form
                onsubmit={(e) => {
                    e.preventDefault();
                    // @ts-ignore
                    const name = e.currentTarget.elements.name_input.value;
                    // @ts-ignore
                    const msg = e.currentTarget.elements.message_input.value;
                    const fullMsg = `مرحباً، أنا ${name}. بخصوص الاتصال من الموقع: ${msg}`;
                    window.open(
                        `https://wa.me/${settings?.contact?.whatsapp}?text=${encodeURIComponent(fullMsg)}`,
                        "_blank",
                    );
                }}
                style="display: grid; gap: 20px; text-align: {$lang === 'ar'
                    ? 'right'
                    : 'left'};"
            >
                <h3 style="margin-bottom: 10px;">
                    {$lang === "ar" ? "أرسل لنا رسالة" : "Send a Message"}
                </h3>
                <input
                    name="name_input"
                    type="text"
                    required
                    placeholder={$lang === "ar" ? "الاسم بالكامل" : "Full Name"}
                    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px; color: white; width: 100%;"
                />

                <textarea
                    name="message_input"
                    required
                    placeholder={$lang === "ar"
                        ? "كيف يمكننا مساعدتك؟"
                        : "How can we help you?"}
                    rows="6"
                    style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px; color: white;"
                ></textarea>

                <button
                    type="submit"
                    class="btn-primary"
                    style="padding: 18px; justify-content: center; font-size: 1.1rem;"
                >
                    {$lang === "ar" ? "إرسال عبر واتساب" : "Send via WhatsApp"}
                </button>
            </form>
        </div>
    </div>
</section>
