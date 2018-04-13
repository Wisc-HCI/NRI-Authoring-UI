
function connectROS(addr){
  var end_effector_position;

  //url : 'ws://192.168.56.101:9090'
  var ros = new ROSLIB.Ros({
      url : addr
    });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });
  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });

  // Subscribing to a Topic
  // ----------------------
  var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/m1n6s200_driver/out/cartesian_command',
    messageType : 'kinova_msgs/KinovaPose'
  });

  listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message);
    console.log(message.X);
    console.log(message.Y);    
    console.log(message.Z);    
    end_effector_position = message;
    listener.unsubscribe();
  });

  //test end effector
  end_effector_position='1223 21212 122';
  return end_effector_position;
};