let acl = new Accelerometer({ frequency: 60 });

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

let boxA = Bodies.rectangle(400, 200, 80, 80);
let ballA = Bodies.circle(380, 100, 40, 10);
let ballB = Bodies.circle(460, 40, 40, 10);
let ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });
let ceiling = Bodies.rectangle(400, 20, 810, 60, { isStatic: true });
let wall1 = Bodies.rectangle(20, 200, 60, 410, { isStatic: true });
let wall2 = Bodies.rectangle(780, 200, 60, 410, { isStatic: true });

World.add(engine.world, [boxA, ballA, ballB, ground, ceiling, wall1, wall2]);

Engine.run(engine);
Render.run(render);

function updateGravity() {
    let yaw = Math.atan(-acl.x, Math.sqrt(acl.y * acl.y + acl.z * acl.z)) * (180 / Math.PI) + 90;
    gravity.x = -Math.cos(yaw * Math.PI / 180);
    gravity.y = Math.sin(yaw * Math.PI / 180);
}

acl.addEventListener('reading', updateGravity);

acl.start();