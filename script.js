$("document").ready(function(){

	//var URL = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";
	var URL= "https://api.myjson.com/bins/6wgp7"; //Palestine
	var SVG_WIDTH = 800;
	var SVG_HEIGHT = 600;
	var CIR_R = 5;

	d3.json(URL, function(err,result){
	if(err) throw error;

	var links = result.links;
	var nodes = result.nodes;

	var force = d3.layout.force()
	.nodes(d3.values(nodes))
	.links(links)
	.size([SVG_WIDTH, SVG_HEIGHT])
	.linkDistance(20)
	.charge(-70)
	.on("tick",tick)
	.start();

	var svg = d3.select("body")
	.append("svg")
	.attr("width",SVG_WIDTH)
	.attr("height",SVG_HEIGHT);

	var link = svg.selectAll(".link")
		.data(force.links())
		.enter()
		.append("line")
		.attr("class","link");

		var node = svg.selectAll(".nodex")
		.data(force.nodes())
		.enter()
		.append("g")
		.attr("id",function(val,idx){
			return nodes[idx].code;
		})
		.attr("class","node")
		.call(force.drag)

		/*node.append("rect")
		.attr("height","10px")
		.attr("width","10px");*/

		
		/*node.append("text")
		.text(function(val,idx){
			return nodes[idx].country;
		})*/

		var img = d3.select("body").selectAll("#img")
		.data(force.nodes())
		.enter()
		.append("img")
		.attr("id",function(val,idx){
			return idx;
		})
		.attr("class",function(val, idx){
			return "flag flag-"+nodes[idx].code;
		})
		//.style("position","absolute")
		//.style("top","100px")
		.call(force.drag);

		$("img").on("mouseover",function(e){
			$(".tip").css("visibility","visible");
			$(".tip").css("top",e.clientY-15+"px")
			$(".tip").css("left",e.clientX+15+"px")
			$(".tip").html(nodes[$(this).attr("id")].country);
		}); 

		$("img").on("mouseleave",function(e){
			$(".tip").css("visibility","hidden");
		}); 

		function tick(){
			link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

			node
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			
			img
			//.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
			.style("position","absolute")
			.style("top", function(d){
					return d.y+"px";
			})
			.style("left",function(d){
					return d.x+"px";	
			});
		}

	}); // end d3.json

}); // end JQUERY