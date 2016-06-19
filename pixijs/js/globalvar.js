var width = window.innerWidth,
height = window.innerHeight,

leftkey = keyboard(37),
rightkey = keyboard(39),
upkey = keyboard(38),
left = false,
right = false,
jump = false,

tree_scale = 0.5,
player_spawn_x = width*0.5,
player_spawn_y = height*0.81,
anchor_default_x = 0.5,
anchor_default_y = 0.5,
player_scale_x = 0.4,
player_scale_y = 0.4,
player_out = false,
//platform #1
platform_size_1_y = 0.5,
platform_size_1_x = 0.7,
platform_position_1_x = width*0.20,
platform_position_1_y = height*0.25,

//platform #2
platform_size_2_y = 0.5,
platform_size_2_x = 0.7,
platform_position_2_x = width*0.6,
platform_position_2_y = height*0.25,

//platform #3
platform_size_3_y = 0.5,
platform_size_3_x = 0.7,
platform_position_3_x = width*0.4,
platform_position_3_y = height*0.6,

ground_scale_x = 1.3,
ground_scale_y = 1,
ground_position_x = width*0.5,
ground_position_y = height*0.95,

tree_scale_x = 1.01,
tree_scale_y = 1.01,

tree1_position_x = width*0.05,
tree1_position_y = height*0.53,

tree2_position_x = width*0.9,
tree2_position_y = height*0.5,

player_x_speed = 3,
player_y_speed = 0,
gravity = 0.1,
falling = false,

walk1 = false,
walk = false;
