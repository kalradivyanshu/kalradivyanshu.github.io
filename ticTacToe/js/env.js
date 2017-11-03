function env()
{
    this.actionMapping = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    this.action = function(action, xoro) {
        window.nextStateAvailable = false;
        this_state = window.gameState;
        coordinates = this.actionMapping[action];
        console.log("mapping: ", action, coordinates);
        if(window.gameState[coordinates[0]][coordinates[1]] == -1)
            window.gameState[coordinates[0]][coordinates[1]] = xoro;
        else
            return [flatten(this_state), flatten(window.gameState), -10, false]
        var reward = 1;
        var isdone = window.isdone();
        if(isdone == xoro) {
            reward = 1000;
            isdone = true;
        }
        else if(isdone == 10) {
            reward = 100;
            isdone = true;
        }
        else if(isdone != -1) {
            reward = -1000;
            isdone = true;
        }
        else {
            reward = 1;
            isdone = false;
        }
        return [flatten(this_state), flatten(window.gameState), reward, isdone];
    }
    this.reset = function() {
        window.reset();
        return [flatten(window.gameState), flatten(window.gameState), 0, false];
    }
}