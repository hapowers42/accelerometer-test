let acl = new Accelerometer({frequency: 60});

acl.addEventListener('reading', () => {
//   console.log("Acceleration along the X-axis " + acl.x);
//   console.log("Acceleration along the Y-axis " + acl.y);
//   console.log("Acceleration along the Z-axis " + acl.z);
    // Roll = atan2(Y, Z) * 180/M_PI;
    // Pitch = atan2(-X, sqrt(Y*Y + Z*Z)) * 180/M_PI;
    //console.log('roll is ' + (Math.atan2(acl.y, acl.z) * 180/Math.PI));
    let yaw = Math.atan(-acl.x, Math.sqrt(acl.y * acl.y + acl.z * acl.z)) * (180/Math.PI);
    console.log('yaw is ' + yaw);

}
);

acl.start();