/**
 *
 * WebGL With Three.js - Lesson 7 - loading models
 * http://www.script-tutorials.com/webgl-with-three-js-lesson-7/
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Script Tutorials
 * http://www.script-tutorials.com/
 */

var lesson7 = {
    scene: null,
    camera: null,
    renderer: null,
    container: null,
    controls: null,
    clock: null,
    stats: null,

    init: function() { // Initialization

        // create main scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0xcce0ff, 0.0003);

        var SCREEN_WIDTH = window.innerWidth,
            SCREEN_HEIGHT = window.innerHeight;

        // prepare camera
        var VIEW_ANGLE = 60,
            ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
            NEAR = 0.1,
            FAR = 20000;
        this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.scene.add(this.camera);
        this.camera.position.set(-27, 15, -25);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // prepare renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.renderer.setClearColor(this.scene.fog.color);
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;

        // prepare container
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.container.appendChild(this.renderer.domElement);

        // events
        THREEx.WindowResize(this.renderer, this.camera);

        // prepare controls (OrbitControls)
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = new THREE.Vector3(0, 0, 0);
        this.controls.maxDistance = 3000;

        // prepare clock
        this.clock = new THREE.Clock();

        // prepare stats
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '50px';
        this.stats.domElement.style.bottom = '50px';
        this.stats.domElement.style.zIndex = 1;
        this.container.appendChild(this.stats.domElement);

        this.scene.add(new THREE.AmbientLight(0x606060));

        // light
        var dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(200, 200, 1000).normalize();
        this.camera.add(dirLight);
        this.camera.add(dirLight.target);

        // load models
        this.loadModels();
    },
    loadModels: function() {

        // prepare AWD loader and load the model
        var oAwdLoader = new THREE.AWDLoader();
        oAwdLoader.load('models/sample.awd', function(object) {

            object.position.set(-10, 1, -15);
            object.scale.set(0.1, 0.1, 0.1);
            lesson7.scene.add(object);
        });

        // prepare Babylon loader and load the model
        var oBabylonLoader = new THREE.BabylonLoader();
        oBabylonLoader.load('models/rabbit.babylon', function(object) {

            // apply custom material
            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {

                    // apply custom material (texture)
                    var textureD = THREE.ImageUtils.loadTexture('models/0.jpg', undefined, function() {

                        child.material = new THREE.MeshLambertMaterial({
                            map: textureD
                        });
                        child.position.set(-10, 0, -5);
                        child.scale.set(0.1, 0.1, 0.1);
                        lesson7.scene.add(child);
                    });
                    textureD.needsUpdate = true;
                    textureD.magFilter = THREE.NearestFilter;
                    textureD.repeat.set(1, 1);
                    textureD.wrapS = textureD.wrapT = THREE.RepeatWrapping;
                    textureD.anisotropy = 16;
                }
            });
        });

        // prepare PDB loader and load the model
        var oPdbLoader = new THREE.PDBLoader();
        oPdbLoader.load('models/caf2.pdb', function(geometry, geometryBonds) {

            var group = new THREE.Object3D();

            var i = 0;
            geometry.vertices.forEach(function(position) {
                var sphere = new THREE.SphereGeometry(0.3);
                var material = new THREE.MeshPhongMaterial({
                    color: geometry.colors[i++]
                });
                var mesh = new THREE.Mesh(sphere, material);
                mesh.position.copy(position);
                group.add(mesh);
            });
            for (var j = 0; j < geometryBonds.vertices.length; j += 2) {
                var path = new THREE.SplineCurve3([geometryBonds.vertices[j], geometryBonds.vertices[j + 1]]);
                var tube = new THREE.TubeGeometry(path, 1, 0.05)
                var material = new THREE.MeshPhongMaterial({
                    color: 0xcccccc
                });
                var mesh = new THREE.Mesh(tube, material);
                group.add(mesh);
            }

            group.position.set(20, 5, -20);
            group.scale.set(2, 2, 2);
            lesson7.scene.add(group);
        });

        // prepare PLY loader and load the model
        var oPlyLoader = new THREE.PLYLoader();
        oPlyLoader.load('models/F117.ply', function(geometry) {

            var material = new THREE.MeshBasicMaterial({
                color: 0xff4444
            });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.set(-Math.PI / 2 - 0.2, 0, -Math.PI / 2 + 0.2);
            mesh.position.set(-20, 15, 10);
            mesh.scale.set(2, 2, 2);
            lesson7.scene.add(mesh);
        });

        // prepare STL loader and load the model
        var oStlLoader = new THREE.STLLoader();
        oStlLoader.load('models/teeth.stl', function(geometry) {

            var material = new THREE.MeshNormalMaterial();
            var mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
            mesh.position.set(-10, 0, 10);
            mesh.scale.set(2, 2, 2);
            lesson7.scene.add(mesh);
        });

        // prepare WRL loader and load the model
        var oWrlLoader = new THREE.VRMLLoader();
        oWrlLoader.load('models/house.wrl', function(geometry) {
            lesson7.scene.add(geometry);
        });

        // prepare VTK loader and load the model
        var oVtkLoader = new THREE.VTKLoader();
        oVtkLoader.load('models/bunny.vtk', function(geometry) {

            geometry.computeVertexNormals();

            var material = new THREE.MeshLambertMaterial({
                color: 0xff4444,
                side: THREE.DoubleSide
            });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0, -15);
            mesh.scale.set(20, 20, 20);
            lesson7.scene.add(mesh);
        });
    }
};

// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

// Update controls and stats
function update() {
    lesson7.controls.update(lesson7.clock.getDelta());
    lesson7.stats.update();
}

// Render the scene
function render() {
    if (lesson7.renderer) {
        lesson7.renderer.render(lesson7.scene, lesson7.camera);
    }
}

// Initialize lesson on page load
function initializeLesson() {
    lesson7.init();
    animate();
}

if (window.addEventListener)
    window.addEventListener('load', initializeLesson, false);
else if (window.attachEvent)
    window.attachEvent('onload', initializeLesson);
else window.onload = initializeLesson;