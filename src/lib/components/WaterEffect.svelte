<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";

    let { settings } = $props();
    let container: HTMLDivElement;
    let frameId: number;

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        precision highp float;
        uniform float time;
        uniform vec2 mouse;
        uniform vec2 resolution;
        uniform vec3 uParticleColor;
        uniform vec3 uAccentColor;
        varying vec2 vUv;

        // "Zen Liquid & Particles" Shader
        // Slow, weighted, and harmonious.
        
        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
            vec2 i = floor(p); vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                       mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec2 p = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.y, resolution.x);
            
            // SLOW & WEIGHTED INTERACTIVE DISTORTION
            vec2 m = (mouse - 0.5) * (resolution.xy / min(resolution.y, resolution.x));
            float d = length(p - m);
            
            // Subtle Ambient Waves
            float waveTime = time * 0.5;
            p.x += sin(p.y * 2.0 + waveTime) * 0.02;
            p.y += cos(p.x * 2.0 + waveTime) * 0.02;

            // Liquid Ripple Mechanics (Weighted)
            float ripple = sin(d * 12.0 - time * 2.0) * exp(-d * 3.0) * 0.08;
            float push = exp(-d * 5.0) * 0.1; 
            p += (p - m) * (ripple + push);

            // Layered Noise (Cinematic)
            float t = time * 0.1;
            vec2 uv2 = p * 1.5;
            float n = noise(uv2 + t);
            n = mix(n, noise(uv2 * 2.5 - t * 0.5), 0.5);
            
            // MONOCHROME COLORS (Controlled via CMS)
            vec3 baseColor = vec3(0.04, 0.04, 0.05); // Deep Obsidian
            
            // Mix base with accent (set to dark grey by default in CMS for B&W)
            vec3 color = mix(baseColor, uAccentColor, n * 0.3);
            
            // PARTICLE GRID (Floating Points) - High Density / Premium Quality
            vec2 grid_uv = p * 32.0; 
            vec2 i_uv = floor(grid_uv);
            vec2 f_uv = fract(grid_uv) - 0.5;
            
            // Refined dot logic for extreme crispness
            float dot_wave = sin(i_uv.x * 0.2 + i_uv.y * 0.3 + time * 1.5) * 0.3;
            float dot_dist = length(f_uv - dot_wave);
            float dot_size = 0.08 / (d * 1.5 + 1.0); 
            float dot_mask = smoothstep(dot_size, dot_size - 0.02, dot_dist);
            
            // Add dots with a professional fade
            float dot_fade = smoothstep(1.3, 0.4, length(p)); 
            color += uParticleColor * dot_mask * 0.35 * dot_fade;

            // Specular highlights
            float specular = pow(max(0.0, n), 12.0) * 0.4;
            color += uParticleColor * specular;
            
            // Subtle Chromatic Aberration near mouse
            float ca = exp(-d * 4.0) * 0.02;
            color.r += noise(p + ca) * 0.03;
            color.b += noise(p - ca) * 0.03;

            // Soft Deep Blue Glow at mouse
            color += uAccentColor * exp(-d * 5.0) * 0.3;

            // Global Vignette (Balanced)
            color *= 1.3 - length(p) * 0.6;

            gl_FragColor = vec4(color, 1.0);
        }
    `;

    onMount(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        const updateSize = () => {
            const width = window.innerWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            // Force High-DPI for crisp dots (Retina/4K support)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
            if (material)
                material.uniforms.resolution.value.set(
                    width * renderer.getPixelRatio(),
                    height * renderer.getPixelRatio(),
                );
        };

        const geometry = new THREE.PlaneGeometry(2, 2);

        // Convert hex colors to THREE.Color for shader
        const particleBaseColor = new THREE.Color(
            settings?.theme?.particle_color || "#E6EAF0",
        );
        const liquidAccentColor = new THREE.Color(
            settings?.theme?.liquid_accent_color || "#3279F9",
        );

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2(0.5, 0.5) },
                uParticleColor: {
                    value: new THREE.Vector3(
                        particleBaseColor.r,
                        particleBaseColor.g,
                        particleBaseColor.b,
                    ),
                },
                uAccentColor: {
                    value: new THREE.Vector3(
                        liquidAccentColor.r,
                        liquidAccentColor.g,
                        liquidAccentColor.b,
                    ),
                },
                resolution: {
                    value: new THREE.Vector2(
                        window.innerWidth * (window.devicePixelRatio || 1),
                        container.clientHeight * (window.devicePixelRatio || 1),
                    ),
                },
            },
            vertexShader,
            fragmentShader,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        container.appendChild(renderer.domElement);
        updateSize();

        let targetMouse = new THREE.Vector2(0.5, 0.5);
        let currentMouse = new THREE.Vector2(0.5, 0.5);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            targetMouse.x = (e.clientX - rect.left) / rect.width;
            targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", updateSize);

        const animate = (t: number) => {
            currentMouse.lerp(targetMouse, 0.04); // Heavier, slower weighted feel
            material.uniforms.mouse.value.copy(currentMouse);
            material.uniforms.time.value = t / 1000;

            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate(0);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", updateSize);
            cancelAnimationFrame(frameId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    });
</script>

<div bind:this={container} class="liquid-abyss"></div>

<style>
    .liquid-abyss {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
    }
</style>
