<script lang="ts">
	import "../app.css";
	import { onMount } from "svelte";
	import Logo from "$lib/components/Logo.svelte";
	import { lang } from "$lib/stores/lang";
	import { t } from "$lib/utils/cms";
	import CmsText from "$lib/components/CmsText.svelte";

	let { children, data }: { children: any; data: { settings: any } } =
		$props();
	let mobileMenuOpen = $state(false);
	const settings = $derived(data.settings);
	const siteUrl = $derived(
		(settings?.basic_info?.site_url || "").replace(/\/$/, ""),
	);
	const getAssetUrl = (path: string) => {
		if (!path) return "";
		if (path.startsWith("http")) return path;
		return siteUrl + (path.startsWith("/") ? "" : "/") + path;
	};

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
		logo: getAssetUrl(settings?.basic_info?.logo),
		contactPoint: {
			"@type": "ContactPoint",
			telephone: settings?.contact?.phone,
			contactType: "customer service",
		},
	});

	function toggleLang() {
		lang.update((l) => (l === "ar" ? "en" : "ar"));
	}

	const hexToRgb = (hex: string) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
			: "227, 30, 36";
	};
</script>

<svelte:head>
	<style>
		:root {
			--primary: {settings?.theme?.primary_color || '#e31e24'};
			--primary-rgb: {hexToRgb(settings?.theme?.primary_color || '#e31e24')};
			--bg-dark: {settings?.theme?.bg_color || '#0a0a0a'};
		}
	</style>
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
	<meta property="og:image" content={getAssetUrl(settings?.meta?.og_image)} />

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
		content={getAssetUrl(settings?.meta?.og_image)}
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
		style="position: sticky; top: 0; z-index: 1000; margin: 20px auto; max-width: 1800px; width: calc(100% - 40px); padding: 12px 40px; display: flex; justify-content: space-between; align-items: center;"
	>
		<div class="logo">
			<a
				href="/"
				style="display: flex; align-items: center; height: 40px; width: 120px; overflow: hidden;"
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

		<ul
			class="hide-mobile"
			style="display: flex; gap: 20px; font-weight: 600; font-size: 0.9rem;"
		>
			<li><a href="/">{t(settings, "nav.home")}</a></li>
			<li>
				<a href="/services">{t(settings, "nav.services")}</a>
			</li>
			<li>
				<a href="/portfolio">{t(settings, "nav.portfolio")}</a>
			</li>
			<li>
				<a href="/packages">{t(settings, "nav.packages")}</a>
			</li>
			<li>
				<a href="/contact">{t(settings, "nav.contact")}</a>
			</li>
		</ul>

		<div style="display: flex; gap: 10px; align-items: center;">
			<button
				onclick={toggleLang}
				class="hide-mobile"
				style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 5px 12px; border-radius: 20px; cursor: pointer; font-weight: bold; font-size: 0.8rem;"
			>
				{$lang === "ar" ? "EN" : "عربي"}
			</button>
			<a
				href="/contact"
				class="btn-primary hide-mobile"
				style="padding: 8px 15px; font-size: 0.8rem;"
				>{t(settings, "nav.cta")}</a
			>

			<button
				class="mobile-only"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;"
			>
				{mobileMenuOpen ? "✕" : "☰"}
			</button>
		</div>
	</nav>

	{#if mobileMenuOpen}
		<div
			class="mobile-menu glass fade-in"
			style="position: fixed; inset: 0; z-index: 999; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; font-size: 1.5rem; font-weight: bold;"
		>
			<a href="/" onclick={() => (mobileMenuOpen = false)}
				>{t(settings, "nav.home")}</a
			>
			<a href="/services" onclick={() => (mobileMenuOpen = false)}
				>{t(settings, "nav.services")}</a
			>
			<a href="/portfolio" onclick={() => (mobileMenuOpen = false)}
				>{t(settings, "nav.portfolio")}</a
			>
			<a href="/packages" onclick={() => (mobileMenuOpen = false)}
				>{t(settings, "nav.packages")}</a
			>
			<a href="/contact" onclick={() => (mobileMenuOpen = false)}
				>{t(settings, "nav.contact")}</a
			>
			<button
				onclick={() => {
					toggleLang();
					mobileMenuOpen = false;
				}}
				style="background: var(--primary); color: white; border: none; padding: 10px 30px; border-radius: 50px; font-weight: bold;"
			>
				{$lang === "ar" ? "English" : "عربي"}
			</button>
		</div>
	{/if}

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
		<div class="container footer-grid">
			<div
				class="footer-col"
				style="text-align: {$lang === 'ar' ? 'right' : 'left'};"
			>
				<h3 style="color: var(--primary); margin-bottom: 20px;">
					{settings?.basic_info?.site_title || "Art Vision Studio"}
				</h3>
				<p style="color: var(--text-muted);">
					{settings?.basic_info?.site_description ?? ""}
				</p>
			</div>
			<div
				class="footer-col"
				style="text-align: {$lang === 'ar' ? 'right' : 'left'};"
			>
				<h4 style="margin-bottom: 20px;">
					{t(settings, "footer.quick_links")}
				</h4>
				<ul style="color: var(--text-muted); display: grid; gap: 10px;">
					<li>
						<a href="/">{$lang === "ar" ? "الرئيسية" : "Home"}</a>
					</li>
					<li>
						<a href="/portfolio"
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
			<div
				class="footer-col"
				style="text-align: {$lang === 'ar' ? 'right' : 'left'};"
			>
				<h4 style="margin-bottom: 20px;">
					{t(settings, "footer.contact_us")}
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
				{settings?.basic_info?.site_title}. {t(
					settings,
					"footer.rights",
				)}
			</p>
		</div>
	</footer>

	<style>
		.footer-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 40px;
		}

		@media (max-width: 768px) {
			.footer-grid {
				grid-template-columns: 1fr;
				text-align: center !important;
			}

			.footer-col {
				text-align: center !important;
			}
		}
	</style>
</div>
