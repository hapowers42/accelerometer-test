let acl = new Accelerometer({ frequency: 60 });

//physics setup
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine = Engine.create();
let gravity = engine.world.gravity;

let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 400,
        wireframes: false
    }
});

//make all the boxes and stuff
let boxA = Bodies.rectangle(400, 200, 80, 80);
let ballA = Bodies.circle(380, 100, 40, 10);
let ballB = Bodies.circle(460, 40, 40, 10);
let ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });
let ceiling = Bodies.rectangle(400, 20, 810, 60, { isStatic: true });
let wall1 = Bodies.rectangle(20, 200, 60, 410, { isStatic: true });
let wall2 = Bodies.rectangle(780, 200, 60, 410, { isStatic: true });
//actually add the boxes
World.add(engine.world, [boxA, ballA, ballB, ground, ceiling, wall1, wall2]);

//start the physics!
Engine.run(engine);
Render.run(render);

//called on accelerometer update
function updateGravity() {
    //calculate yaw from accelerometer
    let yaw = Math.atan2(-acl.x, Math.sqrt(acl.y * acl.y + acl.z * acl.z)) * (180 / Math.PI) + 90;
    //calculate x and y components of gravity
    gravity.x = -Math.cos(yaw * Math.PI / 180);
    gravity.y = Math.sin(yaw * Math.PI / 180);
}

acl.addEventListener('reading', updateGravity);

acl.start();