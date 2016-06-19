function moveleft()
{
  if(left == true)
  {
    player.position.x -= getplayerspeed_x("left");
    walk = true;
    if(walk1 == false)
    {
      player.texture = alien_walking1;
      walk1 = true;
    }
    else
    {
      player.texture = alien_walking2;
      walk1 = false;
    }
  }
}
function moveright()
{
  if(right == true)
  {
    player.position.x += getplayerspeed_x("right");
    walk = true;
    if(walk1 == false)
    {
      player.texture = alien_walking1;
      walk1 = true;
    }
    else
    {
      player.texture = alien_walking2;
      walk1 = false;
    }
  }
}
function playerjump()
{
  if(jump == true && player_on_solid_ground() == true)
  {
    player_y_speed = 10;
    player.position.y -= 5;
    jump = false;
  }
  player.position.y -= getplayerspeed_y();
}
