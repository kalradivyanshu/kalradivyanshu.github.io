var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x43A5D5});
/*var renderer = Physics.renderer('pixi', {
    el: 'viewport', // The DOM element to append the stage to
    width: viewWidth,
    height: viewHeight,
    meta: false // Turns debug info on/off
});*/
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
renderer.resize(width, height);
// create a texture from an image path
var texture = PIXI.Texture.fromImage('./assets/ground_cake.png');
var alien_standing = PIXI.Texture.fromImage('./assets/player/alienBlue_stand.png');
var alien_walking1 = PIXI.Texture.fromImage('./assets/player/alienBlue_walk1.png');
var alien_walking2 = PIXI.Texture.fromImage('./assets/player/alienBlue_walk2.png');

var player = new PIXI.Sprite(alien_standing);
leftkey.press = function() {
  player.scale.x = -player_scale_x;
  left = true;
};
leftkey.release = function() {
  player.scale.x = player_scale_x;
  left = false;
};

rightkey.press = function() {
  right = true;
};

rightkey.release = function() {
  right = false;
};

upkey.press = function() {
  jump = true;
};
// create a new Sprite using the texture
var platform = new PIXI.Sprite(texture);
var platform1 = PIXI.Sprite.fromImage('./assets/ground_grass.png');
var platform2 = PIXI.Sprite.fromImage('./assets/ground_sand.png');
var ground = PIXI.Sprite.fromImage('./assets/ground.png');
var tree1 = PIXI.Sprite.fromImage('./assets/tree_oak.png');
var tree2 = PIXI.Sprite.fromImage('./assets/tree_pine.png');

tree1.scale.y = tree_scale;
tree1.scale.x = tree_scale;
tree2.scale.y = tree_scale;
tree2.scale.x = tree_scale;

player.anchor.x = anchor_default_x;
player.anchor.y = anchor_default_y;
player.position.x = player_spawn_x;
player.position.y = player_spawn_y;
player.scale.x = player_scale_x;
player.scale.y = player_scale_y;
// center the sprite's anchor point
platform.anchor.x = anchor_default_x;
platform.anchor.y = anchor_default_y;
platform.scale.y = platform_size_1_y;
platform.scale.x = platform_size_1_x;

ground.anchor.x = anchor_default_x;
ground.anchor.y = anchor_default_y;

platform1.anchor.x = anchor_default_x;
platform1.anchor.y = anchor_default_y;
platform1.scale.y = platform_size_2_y;
platform1.scale.x = platform_size_2_x;

platform2.anchor.x = anchor_default_x;
platform2.anchor.y = anchor_default_y;
platform2.scale.y = platform_size_3_y;
platform2.scale.x = platform_size_3_x;

// move the sprite to the center of the screen
platform.position.x = platform_position_1_x;
platform.position.y = platform_position_1_y;

platform1.position.x = platform_position_2_x;
platform1.position.y = platform_position_2_y;

platform2.position.x = platform_position_3_x;
platform2.position.y = platform_position_3_y;

ground.scale.x = ground_scale_x;
ground.scale.y = ground_scale_y;
ground.position.x = ground_position_x;
ground.position.y = ground_position_y;

tree1.scale.x = tree_scale_x;
tree1.scale.y = tree_scale_y;

tree2.scale.x = tree_scale_x;
tree2.scale.y = tree_scale_y;

tree1.position.x = tree1_position_x;
tree1.position.y = tree1_position_y;

tree2.position.x = tree2_position_x;
tree2.position.y = tree2_position_y;

AddClouds();
stage.addChild(ground);
stage.addChild(platform);
stage.addChild(platform1);
stage.addChild(platform2);
stage.addChild(player);
stage.addChild(tree1);
stage.addChild(tree2);
// start animating
animate();
function animate() {
    requestAnimationFrame(animate);
    moveleft();
    moveright();
    playerjump();
    renderer.render(stage);
}

function AddClouds()
{
  for (var j = 1; j < 10; j++) {
      var cloud = PIXI.Sprite.fromImage("./assets/clouds/cloud"+j.toString()+".png");
      cloud.anchor.x = 0.5;
      cloud.anchor.y = 0.5;
      cloud.x = width*j/10;
      cloud.y = height*Math.random()*0.5;
      stage.addChild(cloud);
  };
}
