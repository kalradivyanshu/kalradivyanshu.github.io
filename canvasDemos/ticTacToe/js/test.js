jQuery.loadScript = function (callback) {
    jQuery.ajax({
        url: "https://unpkg.com/deeplearn@0.3.6/dist/deeplearn.js",
        dataType: 'script',
        success: callback,
        async: false
    });
}
if (typeof dl == 'undefined') $.loadScript( function(){
function createFullyConnectedLayer(graph, inputLayer, layerIndex, sizeOfThisLayer) {
    weights = graph.variable('multiplier'+layerIndex, dl.Array2D.randNormal([inputLayer.shape[0], sizeOfThisLayer]));
    bias = graph.variable('bias'+layerIndex, dl.Array2D.randNormal([sizeOfThisLayer]));
    return graph.tanh(graph.add(graph.matmul(inputLayer, weights), bias));
}
function createOutputLayer(graph, inputLayer, layerIndex, sizeOfThisLayer) {
    weights = graph.variable('multiplier'+layerIndex, dl.Array2D.randNormal([inputLayer.shape[0], sizeOfThisLayer]));
    bias = graph.variable('bias'+layerIndex, dl.Array2D.randNormal([sizeOfThisLayer]));
    return graph.softmax(graph.add(graph.matmul(inputLayer, weights), bias));
}

graph = new dl.Graph();
inputTensor = graph.placeholder('inp', [2]);
targetTensor = graph.placeholder('out', [2]);

fullyConnectedLayer = createFullyConnectedLayer(graph, inputTensor, 0, 8);
fullyConnectedLayer = createFullyConnectedLayer(graph, fullyConnectedLayer, 1, 8);

predictionTensor = createOutputLayer(graph, fullyConnectedLayer, 2, 2);

costTensor = graph.meanSquaredCost(targetTensor, predictionTensor);
math = new dl.NDArrayMathCPU();
session = new dl.Session(graph, math);
inp = [
  dl.Array1D.new([0, 0]),
  dl.Array1D.new([0, 1]),
  dl.Array1D.new([1, 0]),
  dl.Array1D.new([1, 1])
];
labels = [
  dl.Array1D.new([0, 1]),
  dl.Array1D.new([1, 0]),
  dl.Array1D.new([1, 0]),
  dl.Array1D.new([0, 1])
];

shuffledInputProviderBuilder = new dl.InCPUMemoryShuffledInputProviderBuilder([inp, labels]);

sipb = shuffledInputProviderBuilder.getInputProviders();

inputProvider = sipb[0];
labelProvider = sipb[1];
feed_dict = [
  {tensor: inputTensor, data: inputProvider},
  {tensor: targetTensor, data: labelProvider}
];

optimizer = new dl.SGDOptimizer(0.01);
ans = session.eval(predictionTensor, feed_dict)
console.log(ans);
});