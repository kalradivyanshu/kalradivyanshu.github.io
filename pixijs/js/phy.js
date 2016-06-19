function getplayerspeed_x(direction)
{
  if(player.x > width*0.95 && direction == "right")
    return 0;
  else if(player.x < width*0.05 && direction == "left")
    return 0;
  else
    return player_x_speed;
}
function getplayerspeed_y()
{
  //if(player_y_speed > 0)
  if(player_on_solid_ground() == false)
  {
    player_y_speed -= gravity;
    falling = true;
  }
  if(player_on_solid_ground() == true && falling == true)
  {
    player_y_speed = 0;
    falling = false;
  }
  return player_y_speed;
}
function player_on_solid_ground()
{
  return detectcollision(player, platform)||detectcollision(player, platform1)||detectcollision(player, platform2)||detectcollision(player, ground)
}
//ydist > -pickup.height/2 && ydist < pickup.height/2
function detectcollision(obj1, obj2)
{
  var ydist = obj1.y - obj2.y;
  var xdist = obj1.x - obj2.x;
  var mul = 2;
  console.log(ydist,xdist,obj2.height/mul,obj2.width/mul)
  if(ydist > -obj2.height/2 && ydist < obj2.height/mul)
  {
    if(xdist > -obj2.width/mul && xdist < obj2.width/mul)
    {
      console.log("true")
      return true;
    }
    else
    {
      return false;
    }
  }
  else
  {
    return false;
  }
}
