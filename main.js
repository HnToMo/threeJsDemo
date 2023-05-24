window.addEventListener("DOMContentLoaded", init);

function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    renderer.render(scene, camera);
    
    const generator = new THREE.PMREMGenerator(renderer);
    const envMap = generator.fromScene(scene, 0, 0.1, 1300);
    scene.environment = envMap.texture;
    generator.dispose();
    
    const loader = new THREE.GLTFLoader();
    const url = "./katana.glb";
    let model = null;
    loader.load(
        url,
        function(gltf) {
            model = gltf.scene;
            model.scale.set(5.0, 5.0, 5.0);
            model.position.set(0, 0, 0);
            scene.add(gltf.scene);
        }
    );
    
    const env_loader = new THREE.RGBELoader();
    env_loader.load("./environment_sky2.hdr", function(texture){
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.rotation = 180;
        scene.environment = texture;
    });
    
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(20, 20, 20);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);
    
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);
    
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

