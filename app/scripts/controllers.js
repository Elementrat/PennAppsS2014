var ng = angular.module('learnCode', [])

ng.controller('MainCtrl', ['$scope', function($scope){
$scope.data = {}
$scope.data.nodes = nodes.nodes;
$scope.data.clearFunc = nodes.clearItAll;

$scope.data.memory = {
    strength : "not set yet",
    health : "not set yet"
}

var node1 = nodes.createConstant(15);
var node2 = nodes.createConstant(17);
var node3 = nodes.createModifier(2, function(a,b){return a * b}, "x")

node1.connect(0, node3, 0)
node2.connect(0, node3, 1)
nodes.solve(nodes.nodes)
console.log(nodes.nodes)

$scope.getStyle = function(opcode){
var bg ="";
console.log("code we got in was" + opcode)
switch(opcode){
    case "+":
    case "-":
    case "x":
    case "/":
        bg = "url(../app/images/mathman.png)";
    break;

    case "set":
        bg = "url(../app/images/nodeicon_set.png)";
    break;
}

    return {
        background : bg
    }
}

$scope.imgurl = function(opcode){
    if(opcode == "+"){
       return("../app/images/mathman.png");
    }
}

$scope.addNode = function(nodeType){
    if(nodeType =='yes'){
        var newNode = nodes.createConstant(true)
    }
    if(nodeType == 'no'){
        var newNode = nodes.createConstant(false);
    }
    if(nodeType == 'number'){
        var newNode = nodes.createConstant(0)
    }
    if(nodeType == 'string'){
        var newNode = nodes.createConstant("string");
    }
    if(nodeType == 'letter'){
        var newNode = nodes.createConstant('c')
    }
    if(nodeType == '-'){
        var newNode =  nodes.createModifier(2, function(a,b) { return a - b} , "-")
    }
    if(nodeType == '+'){
        var newNode =  nodes.createModifier(2, function(a,b) { return a + b} , "+")
    }
    if(nodeType == '/'){
        var newNode =  nodes.createModifier(2, function(a,b) { return a / b} , "/")
    }
    if(nodeType == 'x'){
        var newNode =  nodes.createModifier(2, function(a,b) { return a + b} , "x")
    }
    if(nodeType == 'set'){
        var newNode = nodes.createSet();
    }
}

$scope.clearTree = function(){
    $scope.data.clearFunc();
}

$scope.arrangeTree = function(){

    //var roots =
    nodes.nodes.forEach(function(node){
        var nodeSelektor = "#node_"+node.id.toString();
        var $node = $(nodeSelektor).parent()
        $node.css("left","50%")
        if(node.isConstant){
            //root.push(node)
        }
    })
}
}]);

ng.controller('ToolBoxCtrl', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
    $scope.tools = {

    actions : [
        'shout',
         'set',
      'compare'
    ],

    math : [
        '+',
        '-',
        'x',
        '/',
    ],

    values : [
        'yes',
        'no',
        'string',
        'number',
        'letter',
    ],

    directors : [
        'goto',
    ],

    zextras : [
        'clean',
        'clear'
    ]

    }

	$scope.selectedTool = function(tool){
		if(tool == 'clean'){
            $scope.arrangeTree();
        }
        else if(tool == 'clear'){
            $scope.clearTree();
        }
        else{
            console.log("DOIT");
            $scope.addNode(tool);
        }
  
	}
}]);

ng.controller('MemoryZoneCtrl', ['$scope', function($scope){

}])


ng.directive('draggable', function(){
	return {
		restrict : 'A',
		link : function(scope, element, attr, ctrl){
			$(element).draggable();
		}
	}
})