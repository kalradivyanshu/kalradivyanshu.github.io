function randomChoice(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}
function argmax(arr) {
    maxVal = -10;
    maxInd = -1;
    for(var i = 0; i < 9; i++) {
        //console.log("Debug, argmax: ", maxVal, maxInd, arr[i]);
        if(arr[i] >= maxVal) {
            maxVal = arr[i];
            maxInd = i;
        }
    }
    return [maxInd, maxVal];
}
function agent()
{
    this.inp = 9;
    this.out = 9;
    this.gamma = 0.9;
    this.model = new brain.NeuralNetwork({
                          activation: 'sigmoid',
                          hiddenLayers: [20, 20],
                          learningRate: 0.01
                        });
    this.trainingPara = {
              errorThresh: 0.005,  // error threshold to reach
              iterations: 10,   // maximum training iterations
              log: true,           // console.log() progress periodically
              logPeriod: 10,       // number of iterations between logging
              learningRate: 0.01    // learning rate
    }
    randOut = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    randOut[int(Math.random()*9)] = 1;
    feed_dict = {input: [-1, -1, -1, -1, -1, -1, -1, -1, -1], output: randOut};
    this.model.train(feed_dict, this.trainingPara);
    this.memory = [];
    this.remember = function(state, action, next_state, reward, done) {
        this.memory.push([state, action, next_state, reward, done]);
    }
    this.replay = function(batch_size = 128) {
        batch = randomChoice(this.memory, batch_size);
        for(var i = 0; i < batch.length; i++) {
            state = batch[i][0];
            action = batch[i][1];
            next_state = batch[i][2];
            reward = batch[i][3];
            done = batch[i][4];
            finalReward = reward;
            if(done == false) {
                next_reward = argmax(this.model.run(next_state))[1];
                finalReward = reward + 0.9*next_reward;
            }
            predictions = this.model.run(state);
            predictions[action] = finalReward;
            feed_dict = {input: state, output: predictions};
            error = this.model.train(feed_dict, this.trainingPara);
            console.log("Training: ", i, error);
        }
    }
    this.action = function(state) {
        state = flatten(state);
        console.log([state]);
        predictions = this.model.run(state);
        console.log("Debug: ", predictions);
        //predictions = matRelu(predictions);
        //console.log("Debug2: ", predictions);
        return argmax(predictions)[0];
    }
}