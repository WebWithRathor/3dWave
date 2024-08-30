import * as THREE from 'three';
import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';
import gsap from 'gsap';

class Imageswave {
    constructor(Parent) {
        this.time = 0;
        this.container = Parent;
        this.animating = true;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.images = [...document.querySelectorAll('img')];
        this.material;
        this.Showimages = [];
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 100, 2000);
        this.camera.position.z = 200;
        this.uStartIndex = 0;
        this.uEndIndex = 1;
        this.camera.fov = 2 * Math.atan(this.height / 2 / 200) * (180 / Math.PI);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera);

        this.resize();
        this.addImages();
        this.eventSize();
        this.hoverOver();
        this.setPosition();
        this.render();
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.setPosition();
    }

    eventSize() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    setPosition() {
        this.Showimages.forEach(img => {
            const bound = img.img.getBoundingClientRect();
            img.mesh.position.x = bound.left - this.width / 2 + bound.width / 2;
            img.mesh.position.y = - bound.top + this.height / 2 - bound.height / 2;
        })
    }

    hoverOver() {
        const h1 = document.querySelectorAll('li');
        h1.forEach((link, i) => {
            link.addEventListener('mouseover', (e) => {
                this.material.uniforms.uTimeline.value = 0.0;
                if (this.animating) {
                    gsap.to(this.material.uniforms.uTimeline, {
                        value: 4.0,
                        duration: 2,
                        onStart: () => {
                            this.animating = false;
                            this.uEndIndex = i;
                            this.material.uniforms.uStartIndex.value = this.uStartIndex;
                            this.material.uniforms.uEndIndex.value = this.uEndIndex;
                            this.uStartIndex = this.uEndIndex;
                        },
                        onComplete: () => this.animating = true
                    })
                }

            })

        })

    }


    addImages() {
        const texturesLoader = new THREE.TextureLoader();
        const texture = this.images.map((img) => texturesLoader.load(img.src));

        const uniforms = {
            uTime: { value: 0 },
            uTimeline: { value: 0.0 },
            uStartIndex: { value: 0 },
            uEndIndex: { value: 1 },
            uImage1: { value: texture[0] },
            uImage2: { value: texture[1] },
            uImage3: { value: texture[2] },
            uImage4: { value: texture[3] },
        };

        this.material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
        })


        this.images.forEach((img, i) => {
            const bound = img.getBoundingClientRect();
            const geometry = new THREE.PlaneGeometry(bound.width, bound.height);
            const mesh = new THREE.Mesh(geometry, this.material);

            this.scene.add(mesh);
            this.Showimages.push({
                mesh, img, bound
            })
        })


    }

    render() {
        this.time += 0.05;
        this.material.uniforms.uTime.value = this.time;
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(this.render.bind(this));
    }
}

export const imageWave = (Parent) => {
    const imageswave = new Imageswave(Parent);
    imageswave.render();
}