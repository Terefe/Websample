//(function ({
var app = {};
window.onload = function()
{

          app.init(); 
	  nodeX = [];
	  nodeY = [];
};
//})();
app.init = function()
{   
    var canvas = document.getElementById('mycanvas');
      canvas.width = $('#canvas-div').width();
      //canvas.height = window.innerHeight;
      canvas.height = 600;
      paper.setup(canvas);
      
       app.canvaswidth = canvas.width;
      
      app.tool = new paper.Tool();
      
     app.nodes = [];
     app.links = [];
     app.circle = [];
     
     app.States = {APP_DELETE:0, APP_DRAG:1, APP_ADD:2};
     app.state = app.States.APP_DRAG;
     
     app.nodeSelected = null;
     app.Generate();
     app.Nodestatescallback();
     app.Mousedownevent();
     app.enterNodeName();
     app.enterNodeSize();
     app.enterNodeColor();
}; 
 
app.Generate = function()
{
	$("#Generate").click(function(){
		app.nodes = [];
                app.links = [];
		var num = prompt("Enter a number to Generate");
		num = Number(num);
                var w = app.canvaswidth-100;
		for (var i = 0; i<num; i++)
		{
			var ranx = Math.floor(Math.random() * (w) + 20);
			var rany = Math.floor(Math.random() * (550) + 20);
                        var n = new Node (ranx, rany);
                        n.setNum(i);
                        app.nodes.push(n);
		}
                app.GenerateLink();
                app.CreateNode();
	});
}

 app.GenerateLink = function ()
    {
      console.log('network.CreateLink()');
      var Num = app.nodes.length;
      for (var i = 0; i < Num; i++)
      {
        var src = Math.floor((Math.random() * Num) + 0);
        var trg = Math.floor((Math.random() * Num) + 0);
        var L = new Link(src, trg);
        app.links.push(L);
        //console.log(app.links);
      }
    };
    

app.CreateNode = function()
{
    paper.project.clear();
        var num = app.nodes.length;
        console.log(app.links);
        for(var i = 0; i<app.links.length; i++)
	{
             app.createlink(i);
        };
	for(var i = 0; i<num; i++)
	{
            
                var node = app.nodes[i];
               // console.log(node);
                //node.num = i;
		app.circle[i] = new paper.Path.Circle(new paper.Point(node.x, node.y), node.size);
		app.circle[i].fillColor = {
			gradient: {
				stops: [ [node.color, 0.3], ['black', 1]],
				radial: true
			},
			origin: app.circle[i].position,
			destination: app.circle[i].bounds.rightCenter
		};
                
                node.graphicID =  app.circle[i].id; 
                app.circle[i].nodeNum = i;
                app.circle[i].onMouseDown = OnNodeSelected;

                app.circle[i].onMouseDrag = onNodeDragging;

                app.circle[i].onMouseUp = onNodeMouseUp;
                
                
		//circle.strokeColor = 'black';
		//circle.strokeWidth = 2;
                
                var text = new paper.PointText(new paper.Point(app.nodes[i].x, app.nodes[i].y - (node.size + 2)));
                text.justification = 'center';
                text.fillColor = 'black';
                text.fontWeight = 'bold';
                text.content = (node.num);
                
                if(node.name != '')
                {
                   var text = new paper.PointText(new paper.Point(app.nodes[i].x, app.nodes[i].y  - (node.size + 13)));
                   text.justification = 'center';
                   text.fillColor = 'black';
                   text.fontWeight = 'bold';
                   text.content = (node.name); 
                }
            
            paper.view.draw();
	}
};

app.createlink = function (i)
{
      var link = app.links[i];
        // console.log(link.source);
        // console.log(link.target);
         var secondpoint = null;
         var firstpoint = null;
         
          console.log(link);
         for(var j = 0; j<app.nodes.length; j++)
         {
            var n = app.nodes[j];
             if(link.source == n.num)
             {
                 firstpoint = new paper.Point(n.x, n.y);
             }
             if(link.target == n.num)
             {
                  secondpoint = new paper.Point(n.x, n.y);
             }
                 
         };

       // var firstpoint = new paper.Point(app.nodes[link.source].x, app.nodes[link.source].y);
       // var secondpoint = new paper.Point(app.nodes[link.target].x, app.nodes[link.target].y);
        var path = new paper.Path(firstpoint, secondpoint);

       // app.links[i].color = app.nodes[link.source].color;
      //  link.type = app.nodes[link.source].type;
       // link.graphicID = path.id;
        path.strokeColor = 'black';
};

app.Nodestatescallback = function()
{
    $("#Delete").click(function(){
        app.state = app.States.APP_DELETE;
    });
    
    $("#Drag").click(function(){
        app.state = app.States.APP_DRAG;
    });
    
    $("#Addnode").click(function(){
        app.state = app.States.APP_ADD;
    });
}
function OnNodeSelected ()
{
   var n = app.findNodeByGraphicalId(this.id);
   var nn = n.num;
   console.log(nn);
   $('#nodeNum').val(n.num);
   app.nodeSelected = n;
   if(app.state == app.States.APP_DELETE)
   {
        this.remove();
        app.removeFromapp(nn);
        
       // app.recaluateNodeLink();
       app.CreateNode();
   }
    
}

app.removeFromapp = function(nn)
{
    
    for(var i = 0; i<app.links.length; i++)
    {
        if(app.links[i].source === nn )
        {
            app.links.splice(i, 1);
        }
    }

   /* for(var j = 0; j<app.links.length; j++)
    {
        if(app.links[j].target === nn)
        {
            console.log(app.links[j]);
            app.links.splice(j, 1);
        }
    }*/
            
    for(var j =app.links.length-1; j>=0; j--)
    {
        if(app.links[j].target === nn)
        {
            console.log(app.links[j]);
            app.links.splice(j, 1);
        }
    }
    
   console.log(app.links);
   
     for(var i = 0; i<app.nodes.length; i++)
    {
        if(app.nodes[i].num === nn)
        {
            app.nodes.splice(i, 1);
        }
    }
    
    console.log(app.nodes);
};

app.recaluateNodeLink = function(n)
{
    var replace = app.nodes;
    app.nodes = [];
    
    for(var i = 0; i<replace.length; i++)
    {
        var nn = new Node();
        nn.resetNode(replace[i]);
        app.nodes.push(nn);
    }
    
    var repLink = app.links;
    app.links = [];
     for(var i = 0; i<repLink.length; i++)
    {
        var nn = new Link();
        nn.resetLink(repLink[i]);
        app.links.push(nn);
    }
    
        console.log(app.nodes);
        console.log(app.links);
    
};

app.Mousedownevent = function ()
{
  console.log("Mousedownevent()");

  app.tool.onMouseDown = function (e)
  {
    if (app.state === app.States.APP_ADD)
      app.addNode(e);
  };

};
    

app.addNode = function (e)
{
    var n = new Node(e.point.x, e.point.y);
    app.nodes.push(n);
    //n.setNum();
    var circle = new paper.Path.Circle(new paper.Point(n.x, n.y), n.size);
		circle.fillColor = {
			gradient: {
				stops: [ [n.color, 0.3], ['black', 1]],
				radial: true
			},
			origin: circle.position,
			destination: circle.bounds.rightCenter
		};
                
     app.CreateNode();
 }
function onNodeDragging (e)
{
    var n = this.nodeNum;
    if(app.state == app.States.APP_DRAG)
    {
        if(e.point.x>app.canvaswidth)
        {
            app.nodes[n].x = app.canvaswidth;
            app.nodes[n].y = e.point.y;
             //app.CreateNode();
        }
        else if(e.point.y>600)
        {
            app.nodes[n].x = e.point.x;
            app.nodes[n].y = 600;
             //app.CreateNode();
        }
        else if(e.point.y<10)
        {
            app.nodes[n].x = e.point.x;
            app.nodes[n].y = 10;
            // app.CreateNode();
        }
        else
        {
            this.position.x = e.point.x;
            this.position.y = e.point.y;

             app.nodes[n].x = e.point.x;
             app.nodes[n].y = e.point.y;
            // app.CreateNode();
         }
         app.CreateNode();
     }
    
}

function onNodeMouseUp ()
{
    
}

app.enterNodeName = function()
{
    $('#nodeName').keypress(function(e)
    {
       if (e.which === 13)
        {
          e.preventDefault();
          app.nodeSelected.name = $('#nodeName').val();
          app.CreateNode();
        }
    });
}

app.enterNodeSize = function()
{
    $('#nodeSize').keypress(function(e)
    {
       if (e.which === 13)
        {
          e.preventDefault();
          app.nodeSelected.size = Number($('#nodeSize').val());
          app.CreateNode();
        }
    });
}

app.enterNodeColor = function()
{
    $('#nodeColor').keypress(function(e)
    {
       if (e.which === 13)
        {
          e.preventDefault();
          app.nodeSelected.color = $('#nodeColor').val();
          app.CreateNode();
        }
    });
}


app.findNodeByGraphicalId = function(id)
{
    for(var i = 0; i<app.nodes.length; i++)
    {
        if(app.nodes[i].graphicID == id)
        {
            return app.nodes[i];
        }
    }
    return null;
};



















