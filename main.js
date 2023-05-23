/*
window.addEventListener("DOMContentLoaded", init);

function init() {
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg"),
    });
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    
    const scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xaaaaaa);

    const point = new THREE.PointLight(0xffffff);
    point.position.set(5, 5, 5);

    const ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient, point);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({color: 0xff6367});
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
    renderer.render(scene, camera);
};

*/

window.addEventListener("DOMContentLoaded", init);
function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(30);
    renderer.render(scene, camera);
    
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({color: 0xff6347});
    const torus = new THREE.Mesh(geometry, material);
    //scene.add(torus);
    
    const loader = new THREE.GLTFLoader();
    const url = "sample.glb";
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
    
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(20, 20, 20);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);
    
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);
    
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.01
        torus.rotation.y += 0.005
        torus.rotation.z += 0.01
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

