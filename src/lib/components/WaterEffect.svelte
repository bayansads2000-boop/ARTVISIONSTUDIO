<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as THREE from "three";

    let container: HTMLDivElement;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let mesh: THREE.Mesh;
    let material: THREE.ShaderMaterial;
    let frameId: number;

    // A more sophisticated water shader using multiple layers of FBM (Fractal Brownian Motion)
    // and interactive ripple distortion for a high-end liquid look.
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float time;
        uniform vec2 mouse;
        uniform vec2 resolution;
        varying vec2 vUv;

        // Perfect organic noise for liquid look
        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                       mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
        }

        float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
            for (int i = 0; i < 5; ++i) {
                v += a * noise(p);
                p = rot * p * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }

        void main() {
            vec2 uv = vUv;
            vec2 p = (vUv - 0.5) * 2.0;
            p.x *= resolution.x / resolution.y;

            // Mouse interaction - subtle ripple distortion
            float dist = distance(vUv, mouse);
            float mouseImpact = exp(-dist * 10.0) * 0.15;
            vec2 distortedUv = uv + (vUv - mouse) * mouseImpact;

            // Deep organic movement
            float t = time * 0.15;
            vec2 q = vec2(fbm(distortedUv + t), fbm(distortedUv + vec2(1.0)));
            
            vec2 r = vec2(fbm(distortedUv + q + vec2(1.7, 9.2) + 0.15 * t),
                          fbm(distortedUv + q + vec2(8.3, 2.8) + 0.126 * t));
            
            float f = fbm(distortedUv + r);

            // Palette: Premium Deep Dark (Black / Charcoal / Deep Blood Red)
            vec3 bgColor = vec3(0.012, 0.012, 0.015); // Almost pure black
            vec3 accentColor = vec3(0.3, 0.0, 0.02); // Deep garnet
            vec3 highlightColor = vec3(0.89, 0.12, 0.14); // Art Vision Red

            // Mix colors based on FBM layers
            vec3 color = mix(bgColor, accentColor, clamp((f*f)*4.0, 0.0, 1.0));
            color = mix(color, highlightColor, clamp(length(q), 0.0, 1.0) * 0.1);
            color = mix(color, vec3(1.0), clamp(length(r.x), 0.0, 1.0) * 0.02); // Subtle specular highlights

            // Apply a nice vignette
            float vignette = 1.0 - length(p * 0.8) * 0.5;
            color *= max(vignette, 0.5);

            gl_FragColor = vec4(color, 1.0);
        }
    `;

    onMount(() => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000,
        );
        camera.position.z = 1;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2);
        material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2(0.5, 0.5) },
                resolution: {
                    value: new THREE.Vector2(
                        container.clientWidth,
                        container.clientHeight,
                    ),
                },
            },
            vertexShader,
            fragmentShader,
        });

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        let mouseX = 0.5;
        let mouseY = 0.5;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width;
            mouseY = 1.0 - (e.clientY - rect.top) / rect.height;
        };

        const handleResize = () => {
            if (!container) return;
            renderer.setSize(container.clientWidth, container.clientHeight);
            material.uniforms.resolution.value.set(
                container.clientWidth,
                container.clientHeight,
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        const animate = (t: number) => {
            // Smoothler interpolation for mouse for a "calm" feel
            material.uniforms.mouse.value.x +=
                (mouseX - material.uniforms.mouse.value.x) * 0.05;
            material.uniforms.mouse.value.y +=
                (mouseY - material.uniforms.mouse.value.y) * 0.05;

            material.uniforms.time.value = t / 1000;
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate(0);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    });
</script>

<div bind:this={container} class="water-container"></div>

<style>
    .water-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        margin-left: calc(-50vw + 50%);
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
    }
</style>
