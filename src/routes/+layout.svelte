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
	const getAssetUrl = (path: any) => {
		if (!path) return "";
		// If path is an array, take the first element
		const actualPath = Array.isArray(path) ? path[0] : path;
		if (typeof actualPath !== "string") return "";
		if (actualPath.startsWith("http")) return actualPath;
		return siteUrl + (actualPath.startsWith("/") ? "" : "/") + actualPath;
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
		href={settings?.basic_info?.favicon ||
			settings?.basic_info?.logo ||
			"/favicon.svg"}
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
		? 'var(--font-ar)'
		: 'var(--font-en)'}, sans-serif;"
>
	<nav
		class="glass"
		style="position: sticky; top: 0; z-index: 1000; margin: 20px auto; max-width: 1800px; width: calc(100% - 40px); padding: 12px 40px; display: flex; justify-content: space-between; align-items: center;"
	>
		<div class="logo">
			<a
				href="/"
				aria-label="Home"
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
			class="hide-mobile nav-links"
			style="display: flex; gap: 30px; font-weight: 600; font-size: 0.9rem; align-items: center;"
		>
			<li>
				<a href="/" class="nav-link">{t(settings, "nav.home", $lang)}</a
				>
			</li>
			<li>
				<a href="/services" class="nav-link"
					>{t(settings, "nav.services", $lang)}</a
				>
			</li>
			<li class="dropdown">
				<button class="dropdown-trigger">
					{t(settings, "nav.portfolio", $lang)} & {t(
						settings,
						"nav.packages",
						$lang,
					)}
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						><polyline points="6 9 12 15 18 9"></polyline></svg
					>
				</button>
				<div class="dropdown-content glass">
					<a href="/portfolio"
						>{t(settings, "nav.portfolio", $lang)}</a
					>
					<a href="/packages">{t(settings, "nav.packages", $lang)}</a>
				</div>
			</li>
			<li>
				<a href="/contact" class="nav-link"
					>{t(settings, "nav.contact", $lang)}</a
				>
			</li>
		</ul>

		<div style="display: flex; gap: 10px; align-items: center;">
			<button
				onclick={toggleLang}
				class="hide-mobile"
				style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 5px 12px; border-radius: 20px; cursor: pointer; font-weight: bold; font-size: 0.8rem; font-family: var(--font-en);"
			>
				{$lang === "ar" ? "EN" : "عربي"}
			</button>
			<a
				href="/contact"
				class="btn-primary hide-mobile"
				style="padding: 8px 15px; font-size: 0.8rem;"
				>{t(settings, "nav.cta", $lang)}</a
			>

			<div
				class="mobile-quick-actions mobile-only"
				style="display: flex; gap: 15px; align-items: center; margin-{$lang ===
				'ar'
					? 'left'
					: 'right'}: 15px;"
			>
				<a
					href="/portfolio"
					title={t(settings, "nav.portfolio", $lang)}
					style="color: white; font-size: 1.2rem;"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><rect x="3" y="3" width="7" height="7"></rect><rect
							x="14"
							y="3"
							width="7"
							height="7"
						></rect><rect x="14" y="14" width="7" height="7"
						></rect><rect x="3" y="14" width="7" height="10"
						></rect></svg
					>
				</a>
				<a
					href="/packages"
					title={t(settings, "nav.packages", $lang)}
					style="color: white; font-size: 1.2rem;"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
						></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"
						></polyline><line x1="12" y1="22.08" x2="12" y2="12"
						></line></svg
					>
				</a>
				<a
					href="/contact"
					title={t(settings, "nav.contact", $lang)}
					style="color: white; font-size: 1.2rem;"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
						></path></svg
					>
				</a>
			</div>

			<div class="relative">
				<button
					class="mobile-only"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					style="background: none; border: none; color: white; font-size: 1.8rem; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; width: 40px; height: 40px;"
				>
					{mobileMenuOpen ? "✕" : "☰"}
				</button>

				{#if mobileMenuOpen}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="mobile-dropdown glass fade-in"
						onclick={() => (mobileMenuOpen = false)}
					>
						<a href="/">{t(settings, "nav.home", $lang)}</a>
						<a href="/services"
							>{t(settings, "nav.services", $lang)}</a
						>
						<a href="/portfolio"
							>{t(settings, "nav.portfolio", $lang)}</a
						>
						<a href="/packages"
							>{t(settings, "nav.packages", $lang)}</a
						>
						<a href="/contact"
							>{t(settings, "nav.contact", $lang)}</a
						>
						<hr
							style="border: none; border-top: 1px solid rgba(255,255,255,0.1); width: 100%; margin: 5px 0;"
						/>
						<button
							onclick={(e) => {
								e.stopPropagation();
								toggleLang();
								mobileMenuOpen = false;
							}}
							style="background: var(--primary); color: white; border: none; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-family: var(--font-en); width: 100%; display: flex; justify-content: center; align-items: center;"
						>
							{$lang === "ar" ? "English" : "عربي"}
						</button>
					</div>
				{/if}
			</div>
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

	<!-- Floating Social Bar -->
	<div
		class="floating-social-bar glass"
		style="position: fixed; top: 50%; transform: translateY(-50%); {$lang ===
		'ar'
			? 'right: 30px;'
			: 'left: 30px;'} display: flex; flex-direction: column; gap: 20px; padding: 15px; z-index: 1000;"
	>
		<a
			href={settings?.social?.facebook}
			target="_blank"
			aria-label="Facebook"
			class="social-link"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
				<path
					d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.21c0-.837.396-1.39 1.162-1.39h2.196v-4.41c-.381-.053-1.691-.165-3.21-.165-3.181 0-5.358 1.942-5.358 5.518v2.657z"
				/>
			</svg>
		</a>
		<a
			href={settings?.social?.instagram}
			target="_blank"
			aria-label="Instagram"
			class="social-link"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
				<path
					d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
				/>
			</svg>
		</a>
		<a
			href={settings?.social?.youtube}
			target="_blank"
			aria-label="YouTube"
			class="social-link"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
				<path
					d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
				/>
			</svg>
		</a>
	</div>

	<footer
		style="background: #050505; border-top: 1px solid rgba(255,255,255,0.1); padding: 80px 0 40px;"
	>
		<div class="container footer-grid">
			<div
				class="footer-col"
				style="text-align: {$lang === 'ar' ? 'right' : 'left'};"
			>
				<div class="footer-logo" style="margin-bottom: 25px;">
					<a href="/" style="display: block; width: 150px;">
						{#if settings?.basic_info?.logo}
							<img
								src={settings.basic_info.logo}
								alt={settings.basic_info.site_title}
								style="width: 100%; height: auto;"
							/>
						{:else}
							<Logo />
						{/if}
					</a>
				</div>
				<p style="color: var(--text-muted); margin-bottom: 25px;">
					{settings?.basic_info?.site_description ?? ""}
				</p>
				<div
					class="footer-social"
					style="display: flex; gap: 15px; justify-content: {$lang ===
					'ar'
						? 'flex-start'
						: 'flex-start'};"
				>
					<a
						href={settings?.social?.facebook}
						target="_blank"
						aria-label="Facebook"
						class="social-icon"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.21c0-.837.396-1.39 1.162-1.39h2.196v-4.41c-.381-.053-1.691-.165-3.21-.165-3.181 0-5.358 1.942-5.358 5.518v2.657z"
							/>
						</svg>
					</a>
					<a
						href={settings?.social?.instagram}
						target="_blank"
						aria-label="Instagram"
						class="social-icon"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
							/>
						</svg>
					</a>
					<a
						href={settings?.social?.youtube}
						target="_blank"
						aria-label="YouTube"
						class="social-icon"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
							/>
						</svg>
					</a>
				</div>
			</div>
			<div
				class="footer-col"
				style="text-align: {$lang === 'ar' ? 'right' : 'left'};"
			>
				<h4 style="margin-bottom: 20px;">
					{t(settings, "footer.quick_links", $lang)}
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
					{t(settings, "footer.contact_us", $lang)}
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
					$lang,
				)}
			</p>
		</div>
	</footer>

	<style>
		.nav-link {
			color: white;
			opacity: 0.8;
			transition: var(--transition);
		}

		.nav-link:hover {
			opacity: 1;
			color: var(--primary);
		}

		.dropdown {
			position: relative;
		}

		.dropdown-trigger {
			background: none;
			border: none;
			color: white;
			opacity: 0.8;
			font-weight: 600;
			font-size: 0.9rem;
			cursor: pointer;
			display: flex;
			align-items: center;
			gap: 6px;
			transition: var(--transition);
			padding: 0;
		}

		.dropdown:hover .dropdown-trigger {
			opacity: 1;
			color: var(--primary);
		}

		.dropdown-content {
			position: absolute;
			top: calc(100% + 15px);
			left: 50%;
			transform: translateX(-50%) translateY(10px);
			min-width: 180px;
			display: flex;
			flex-direction: column;
			gap: 5px;
			padding: 10px;
			border-radius: 12px;
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.dropdown:hover .dropdown-content {
			opacity: 1;
			visibility: visible;
			transform: translateX(-50%) translateY(0);
		}

		.dropdown-content a {
			padding: 10px 15px;
			border-radius: 8px;
			font-size: 0.85rem;
			color: white;
			transition: var(--transition);
		}

		.dropdown-content a:hover {
			background: rgba(255, 255, 255, 0.1);
			color: var(--primary);
		}

		.relative {
			position: relative;
		}

		.mobile-dropdown {
			position: absolute;
			top: calc(100% + 10px);
			right: 0;
			width: 200px;
			display: flex;
			flex-direction: column;
			gap: 5px;
			padding: 15px;
			border-radius: 15px;
			z-index: 1001;
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
			animation: slideDown 0.3s ease-out;
		}

		[dir="rtl"] .mobile-dropdown {
			right: auto;
			left: 0;
		}

		@keyframes slideDown {
			from {
				opacity: 0;
				transform: translateY(-10px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		.mobile-dropdown a {
			padding: 10px;
			border-radius: 8px;
			font-size: 0.95rem;
			font-weight: 600;
			transition: var(--transition);
		}

		.mobile-dropdown a:hover {
			background: rgba(255, 255, 255, 0.1);
			color: var(--primary);
		}

		.footer-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 40px;
		}

		.social-icon {
			color: var(--text-muted);
			transition: var(--transition);
		}

		.social-icon:hover {
			color: var(--primary);
			transform: translateY(-3px);
		}

		.social-link {
			color: white;
			transition: var(--transition);
			opacity: 0.7;
		}

		.social-link:hover {
			color: var(--primary);
			transform: scale(1.2);
			opacity: 1;
		}

		@media (max-width: 768px) {
			.footer-grid {
				grid-template-columns: 1fr;
				text-align: center !important;
			}

			.footer-col {
				text-align: center !important;
			}

			.footer-social {
				justify-content: center !important;
			}

			.floating-social-bar {
				display: none !important;
			}
		}
	</style>
</div>
