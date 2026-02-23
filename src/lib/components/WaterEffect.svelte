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

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float time;
        uniform vec2 mouse;
        uniform vec2 resolution;
        varying vec2 vUv;

        void main() {
            vec2 p = -1.0 + 2.0 * vUv;
            p.x *= resolution.x / resolution.y;

            // Interactive wave distortion based on mouse
            float dist = distance(vUv, mouse);
            float strength = 0.05 / (dist + 0.1);
            
            vec2 uv = vUv;
            float t = time * 0.5;
            
            // Layered noise for water effect
            for(float i=1.0; i<4.0; i++) {
                uv.x += strength * sin(uv.y * 10.0 + t * i) * 0.1;
                uv.y += strength * cos(uv.x * 10.0 + t * i) * 0.1;
            }

            // Liquid colors (Deep dark blue to primary red highlights)
            vec3 color1 = vec3(0.02, 0.02, 0.05); // Dark deep
            vec3 color2 = vec3(0.1, 0.0, 0.02); // Deep red tint
            vec3 color3 = vec3(0.8, 0.1, 0.1); // Bright primary red
            
            float noise = sin(uv.x * 3.0 + t) * cos(uv.y * 3.0 + t);
            vec3 finalColor = mix(color1, color2, noise * 0.5 + 0.5);
            
            // Add mouse highlight
            float glow = exp(-dist * 5.0) * 0.3;
            finalColor += color3 * glow * strength;

            // Reflective highlights
            float light = pow(max(0.0, noise), 10.0) * 0.5;
            finalColor += vec3(1.0) * light;

            gl_FragColor = vec4(finalColor, 1.0);
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

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            material.uniforms.mouse.value.set(x, y);
        };

        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            material.uniforms.resolution.value.set(
                container.clientWidth,
                container.clientHeight,
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        const animate = (t: number) => {
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
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
    }
</style>
