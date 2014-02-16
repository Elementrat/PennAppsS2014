var nodes = exports = {}
	exports.nodes = []
	exports.node = function (){
		this.id = Math.floor(Math.random()*10000)
		this.neededInputs = 0
		this.in = {}
		this.out = {}
		this.opCode;
		this.connect = function(outSlot,node,inSlot){
			this.out[outSlot].push({slot:inSlot,node:node})
		}
		this.flush = function (){
			this.cache = {}
			for(var i = 0, j = this.neededInputs; i < j; i++){
				this.cache[i] = undefined
			}
		}
		this.isFull = function(){
			for(var prop in this.cache){
				if(!this.cache[prop]) return false
			}
			return true
		}
		this.build
		exports.nodes.push(this)
	}

	exports.clearItAll = function(){
		console.log("TRYN 2 CLEAR")
		exports.nodes = [];
	}

	exports.createConstant = function(value){

		var node = new exports.node()
			node.isConstant = true
			node.neededInputs = 0 
			node.in = {}
			node.out = {0:[]}
			node.flush()
			node.opCode = typeof(value);
			node.friendlyValue = value;

			node.build = function(){
				return {
					value : value,
					succesors : this.out[0]
				}
			}
		return node
	}

	exports.createModifier = function(argCount,modFunc,opCode){
		var node = new exports.node()
			node.neededInputs = argCount
			node.in = {0:{},1:{}}
			node.out = {0:[]}
			node.flush()
			node.opCode = opCode;
			node.build = function(){
				var values = []
				for(var prop in this.cache){
					values.push(this.cache[prop])
				}
				return {
					value : modFunc.apply(this,values),
					succesors : this.out[0]
				}
			}
		return node
	}

	exports.createSet = function(){
		var node = new exports.node()
			node.neededInputs = 1;
			node.in = {0:{}}
			node.out = {0:[]}
			node.flush()
			node.opCode = "set"
			node.build = function(){
				var values = []
				for(var prop in this.cache){
					values.push(this.cache[prop])
				}
				return {
					value : 0, //want to go get
					succesors : this.out[0]
				}
			}
		return node
	}


	exports.createIf = function(conFunc){
		var node = new exports.node()
			node.neededInputs = 2
			node.in = {0:{},1:{}}
			node.out = {0:[],1:[]}
			node.flush()
			node.outPointer = 0
			node.opCode = "if"
			node.build = function(){
				var values = []
				for(var prop in this.cache){
					values.push(this.cache[prop])
				}

				if(conFunc.apply(this,values)){
					return {
						value : values[node.outPointer],
						succesors : this.out[0]
					}
				}else{
					return {
						value : values[node.outPointer],
						succesors : this.out[1]
					}
				}

			}
		return node
	}
	exports.solve = function(nodes){
		var root = []
		nodes.forEach(function(node){
			//console.log(node)
			if(node.isConstant){
				root.push(node)
			}
		})
		exports.advance(root)
		//console.log(root)
		//console.log(nodes)
		//find all the starts
		//recursive dig that shit. 
	}

	exports.advance = function(nodes){
		var newNodes = []
		nodes.forEach(function(node){
			var build = node.build()
			console.log(build.value)
				node.flush()
				build.succesors.forEach(function(link){
					link.node.cache[link.slot] = build.value
					if(link.node.isFull()){
						newNodes.push(link.node)
					}
				})
		})
	if(newNodes.length>0){
		exports.advance(newNodes)
		//console.log(newNodes)
	}
	}


