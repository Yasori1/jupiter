let renderer,
    camera,
    planet,
    moon,
    sphereBg,
    terraianGeometry,
    container=document.getElementById('canvas_container'),
    timeout_Debounce,
    frame=0,
    cameraDx=0.05,
    count= 0,
    t=0;

let lineTotal=1000;
let linesGeometry= new THREE.BufferGeometry(); 
linesGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lineTotal*6), 3));
linesGeometry.setAttribute("velocity", new THREE.BufferAttribute(new Float32Array(2 * lineTotal), 1));
let l_positionAttr= linesGeometry.getAttribute("position");
let l_vertex_Array = linesGeometry.getAttribute("position").array;
let l_velocity_Array = linesGeometry.getAttribute("velocity").array;

init();
animate();

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    scene.fog = new THREE.Fog("#3c1e02" , 0.5, 50);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0,1,32);

    pointLight = new THREE.pointLight("#ffffff", 1, 0);
    pointLight.position.set(0, 30, 30);
    scene.add(pointLight);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    const texturePlanet = loader.load('https://i.ibb.co/h94JBXy/saturn3-ljge5g.jpg');
    texturePlanet.anisotropy = 16;
    const planetGeometry = new THREE.SphereBufferGeometry(10, 50, 50);
    const planetMaterial = new THREE.MeshLamberMaterial({
        map: texturePlanet,
        fog:false
    })
    planet= new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(0, 8, -30);
    scene.add(planet);

    //moon
    const textureMoon= loader.load('https://i.ibb.co/JCsHJpp/stars2-qx9prz.jpg');
    textureSphereBg.anisotropy = 16;
    const geometrySphereBg = new THREE.SphereBufferGeometry(150, 32, 32);
    const materialSphereBg = new THREE.MeshBasicMaterial({
        side: THREE.Backside,
        map: textureSphereBg,
        fog:false
    });

    sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
    sphereBg.position.set(0, 50, 0);
    scene.add(sphereBg);

    //"Terraian"
    const textureTerrain = loader.load();
    textureTerrain.rotation = THREE.MathUtils.degToRad(5);
    terraianGeometry = new THREE.PlaneBufferGeometry(70, 70, 20, 20);
    const terrainMaterial = new THREE.MeshBasicMaterial({
        map: textureTerrain,
        fog:false
    });
    terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.rotation.x = -0.47 *Math.PI;
    terrain.rotation.z = THREE.Math.degToRad(90);
    scene.add(terrain);

    let t_vertex_Array = terrainGeometry.getAttribute("position").array;
    terraianGeometry.getAttribute("position").setUsage(THREE.DynamicDrawUsage);

    terraianGeometry.setAttribute("myZ", new THREE.BufferAttirbute(new Float32Array(t_vertex_Array.length /3), 1));
    let t_myZ_Array = terraianGeometry.getAttribute("myZ").array;

    for(let i=0; i<t_vertex_Array.length; i++){
        t_myZ_Array[i] = Math.randInt(0, 5);
    }

    //Lines
    const terrain_line = new THREE.LineSegments(
        terraianGeometry,
        new THREE.LineBasicMaterial({
            color:"#fff",
            fog:false
        })
    );
    terrain_line.rotation.x = -0.47 *Math.PI;
    terrain_line.rotation.z = THREE.Math.degToRad(90);
    scene.add(terrain_line);


    // Stars
    for (let i = 0; i< lineTotal; i++){
        let x = THREE.MathUtils.randInt(-100, 100);
        let y = THREE.MathUtils.randInt(10, 40);
        if(x< 7 && x > -7 && y<20) x +=14;
        let z = THREE.MathUtils.randInt(0.-300);

        l_vertex_Array[6 *i + 0] = l_vertex_Array[6 *i + 3] = x;
        l_vertex_Array[6 *i + 1] = l_vertex_Array[6 *i + 4] = y;
        l_vertex_Array[6 *i + 2] = l_vertex_Array[6 *i + 5] = z;

        l_velocity_Array[2 *i] = l_veloccity_Array[2*i + 1] = 0;
    }
    let starsMaterial = new THREE.LineBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.5,
        fog:false
    });
    let lines = new THREE.LineSegments(linesGeometry, starsMaterial);
    scene.add(lines);










}
