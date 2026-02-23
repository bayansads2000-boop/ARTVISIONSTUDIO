<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";

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
        varying vec2 vUv;

        // "Greatness" Shader: Liquid Abyss
        // Highly reactive, cinematic, and deep.
        
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
            
            // INTENSE INTERACTIVE DISTORTION
            // The mouse acts as a heavy sphere pushing the liquid
            vec2 m = (mouse - 0.5) * (resolution.xy / min(resolution.y, resolution.x));
            float d = length(p - m);
            
            // Physical Ripple + Direct Push
            float ripple = sin(d * 25.0 - time * 6.0) * exp(-d * 4.0) * 0.15;
            float push = exp(-d * 10.0) * 0.2; // Immediate physical push
            p += (p - m) * (ripple + push);

            // Background Liquid movement
            float t = time * 0.2;
            vec2 uv2 = p * 1.5;
            float n = noise(uv2 + t);
            n += noise(uv2 * 2.0 - t * 0.5) * 0.5;
            
            // Specular highlights for that "Liquid Metal" look
            float specular = pow(max(0.0, n), 10.0) * 0.4;
            
            // Colors: Deep Black to Brand Red
            vec3 base = vec3(0.01, 0.01, 0.02);
            vec3 red = vec3(0.89, 0.12, 0.14);
            
            // Mix colors based on noise and mouse distance
            vec3 color = mix(base, red * 0.2, n);
            color += red * specular;
            
            // Chromatic Aberration near mouse
            float ca = exp(-d * 5.0) * 0.05;
            color.r += noise(p + ca) * 0.1;
            color.b += noise(p - ca) * 0.1;

            // Soft glow at mouse
            color += red * exp(-d * 8.0) * 0.3;

            // Vignette
            color *= 1.0 - length(p) * 0.4;

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
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            if (material) material.uniforms.resolution.value.set(width, height);
        };

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2(0.5, 0.5) },
                resolution: {
                    value: new THREE.Vector2(
                        window.innerWidth,
                        container.clientHeight,
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
            currentMouse.lerp(targetMouse, 0.15); // Faster response for better feel
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
        width: 100vw;
        height: 100%;
        margin-left: calc(-50vw + 50%);
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
    }
</style>
