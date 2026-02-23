<script lang="ts">
	import "../app.css";
	import { onMount } from "svelte";
	import Logo from "$lib/components/Logo.svelte";
	import { lang } from "$lib/stores/lang";

	let { children, data }: { children: any; data: { settings: any } } =
		$props();
	const settings = $derived(data.settings);
	const siteUrl = $derived(settings?.basic_info?.site_url || "");

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("fade-in");
					}
				});
			},
			{ threshold: 0.1 },
		);

		document
			.querySelectorAll(".animate-on-scroll")
			.forEach((el) => observer.observe(el));
	});

	// Dynamic JSON-LD Schemas
	const websiteSchema = $derived({
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: settings?.basic_info?.site_title,
		url: siteUrl,
	});

	const organizationSchema = $derived({
		"@context": "https://schema.org",
		"@type": "Organization",
		name: settings?.meta?.org_name || settings?.basic_info?.site_title,
		url: siteUrl,
		logo: siteUrl + settings?.basic_info?.logo,
		contactPoint: {
			"@type": "ContactPoint",
			telephone: settings?.contact?.phone,
			contactType: "customer service",
		},
	});

	function toggleLang() {
		lang.update((l) => (l === "ar" ? "en" : "ar"));
	}
</script>

<svelte:head>
	<title>{settings?.basic_info?.site_title || "Art Vision Studio"}</title>
	<meta name="description" content={settings?.basic_info?.site_description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:title" content={settings?.basic_info?.site_title} />
	<meta
		property="og:description"
		content={settings?.basic_info?.site_description}
	/>
	<meta property="og:image" content={siteUrl + settings?.meta?.og_image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={siteUrl} />
	<meta property="twitter:title" content={settings?.basic_info?.site_title} />
	<meta
		property="twitter:description"
		content={settings?.basic_info?.site_description}
	/>
	<meta
		property="twitter:image"
		content={siteUrl + settings?.meta?.og_image}
	/>

	<!-- Favicon -->
	<link
		rel="icon"
		type="image/svg+xml"
		href={settings?.basic_info?.logo || "/favicon.svg"}
	/>

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}<\/script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}<\/script>`}
</svelte:head>

<div
	dir={$lang === "ar" ? "rtl" : "ltr"}
	style="--primary: {settings?.theme?.primary_color ||
		'#e31e24'}; --bg-dark: {settings?.theme?.bg_color ||
		'#0a0a0a'}; min-height: 100vh; background-color: var(--bg-dark); color: white; font-family: {$lang ===
	'ar'
		? 'Cairo'
		: 'Outfit'}, sans-serif;"
>
	<nav
		class="glass"
		style="position: sticky; top: 0; z-index: 1000; margin: 20px; padding: 10px 40px; display: flex; justify-content: space-between; align-items: center;"
	>
		<div class="logo">
			<a
				href="/"
				style="display: flex; align-items: center; height: 50px; width: 150px; overflow: hidden;"
			>
				{#if settings?.basic_info?.logo}
					<img
						src={settings.basic_info.logo}
						alt={settings.basic_info.site_title}
						style="height: 100%; width: 100%; object-fit: contain; object-position: center;"
					/>
				{:else}
					<Logo />
				{/if}
			</a>
		</div>

		<ul style="display: flex; gap: 30px; font-weight: 600;">
			<li><a href="/">{$lang === "ar" ? "الرئيسية" : "Home"}</a></li>
			<li>
				<a href="/services">{$lang === "ar" ? "خدماتنا" : "Services"}</a
				>
			</li>
			<li>
				<a href="/portfolio"
					>{$lang === "ar" ? "أعمالنا" : "Portfolio"}</a
				>
			</li>
			<li>
				<a href="/packages">{$lang === "ar" ? "الباقات" : "Packages"}</a
				>
			</li>
			<li>
				<a href="/contact">{$lang === "ar" ? "اتصل بنا" : "Contact"}</a>
			</li>
		</ul>

		<div style="display: flex; gap: 15px; align-items: center;">
			<button
				onclick={toggleLang}
				style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 5px 12px; border-radius: 20px; cursor: pointer; font-weight: bold; font-size: 0.8rem;"
			>
				{$lang === "ar" ? "EN" : "عربي"}
			</button>
			<a
				href="/contact"
				class="btn-primary"
				style="padding: 8px 20px; font-size: 0.9rem;"
				>{$lang === "ar" ? "ابدأ مشروعك" : "Start Project"}</a
			>
		</div>
	</nav>

	<main>
		{@render children()}
	</main>

	<a
		href="https://wa.me/{settings?.contact?.whatsapp}"
		target="_blank"
		class="whatsapp-btn"
		aria-label="Contact us on WhatsApp"
		style="position: fixed; bottom: 30px; left: {$lang === 'ar'
			? '30px'
			: 'auto'}; right: {$lang === 'en'
			? '30px'
			: 'auto'}; width: 60px; height: 60px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; box-shadow: 0 10px 20px rgba(0,0,0,0.3); z-index: 1000; transition: var(--transition);"
	>
		<svg width="35" height="35" viewBox="0 0 24 24" fill="white">
			<path
				d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.171.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.853.448-1.274.607-1.448.159-.174.347-.217.463-.217l.333.004c.101.005.241-.038.376.289.135.327.463 1.129.503 1.21.04.081.066.175.012.28-.054.106-.081.182-.162.277-.081.095-.174.159-.241.241-.073.089-.153.185-.065.337.088.152.392.648.841 1.048.577.513 1.063.673 1.216.749.153.076.241.063.333-.044.091-.107.391-.455.494-.61.104-.155.207-.13.348-.078.14.053.885.419 1.038.497.153.078.256.115.293.18.037.065.037.377-.107.782z"
			/>
		</svg>
	</a>

	<footer
		style="background: #050505; border-top: 1px solid rgba(255,255,255,0.1); padding: 80px 0 40px;"
	>
		<div
			class="container"
			style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px;"
		>
			<div style="text-align: {$lang === 'ar' ? 'right' : 'left'};">
				<h3 style="color: var(--primary); margin-bottom: 20px;">
					{settings?.basic_info?.site_title || "Art Vision Studio"}
				</h3>
				<p style="color: var(--text-muted);">
					{settings?.basic_info?.site_description ||
						($lang === "ar"
							? "نحول الرؤى الفنية إلى واقع رقمي ملموس. نحن شركاؤك في النجاح والنمو."
							: "Translating artistic visions into tangible digital reality. We are your partners in success and growth.")}
				</p>
			</div>
			<div style="text-align: {$lang === 'ar' ? 'right' : 'left'};">
				<h4 style="margin-bottom: 20px;">
					{$lang === "ar" ? "روابط سريعة" : "Quick Links"}
				</h4>
				<ul style="color: var(--text-muted); display: grid; gap: 10px;">
					<li>
						<a href="/">{$lang === "ar" ? "الرئيسية" : "Home"}</a>
					</li>
					<li>
						<a href="/#portfolio"
							>{$lang === "ar" ? "أعمالنا" : "Portfolio"}</a
						>
					</li>
					<li>
						<a href="/packages"
							>{$lang === "ar" ? "الباقات" : "Packages"}</a
						>
					</li>
					<li>
						<a href="/admin"
							>{$lang === "ar" ? "لوحة التحكم" : "Admin"}</a
						>
					</li>
				</ul>
			</div>
			<div style="text-align: {$lang === 'ar' ? 'right' : 'left'};">
				<h4 style="margin-bottom: 20px;">
					{$lang === "ar" ? "تواصل معنا" : "Contact Us"}
				</h4>
				<ul style="color: var(--text-muted); display: grid; gap: 10px;">
					<li dir="ltr">Email: {settings?.contact?.email}</li>
					<li dir="ltr">Phone: {settings?.contact?.phone}</li>
					<li dir="ltr">Location: {settings?.contact?.address}</li>
				</ul>
			</div>
		</div>

		<div
			class="container"
			style="margin-top: 60px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; color: var(--text-muted); font-size: 0.9rem;"
		>
			<p>
				© {new Date().getFullYear()}
				{settings?.basic_info?.site_title}. All rights reserved.
			</p>
		</div>
	</footer>
</div>
