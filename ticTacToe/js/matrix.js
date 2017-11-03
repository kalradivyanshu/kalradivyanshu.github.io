function flatten(mat) {
    flattened = [];
    for(var i = 0; i < mat.length; i++) {
        row = mat[i];
        for(var j = 0; j < row.length; j++)
            flattened.push(mat[i][j]);
    }
    return flattened;
}
function matRelu(mat) {
    ans = [];
    for(var i = 0; i < mat.length; i++) {
        if(mat[i] > 0)
            ans.push(mat[i]);
        else
            ans.push(0);
    }
    return ans;
}