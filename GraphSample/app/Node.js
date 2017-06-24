var Node = function(x, y)
{
    this.x = x;
    this.y = y;
    this.type = '';
    this.color = 'blue';
    this.size = 15;
    this.num = 0;
    this.graphicID = null;
    this.name = '';
};

Node.prototype.setNum = function(num)
{
    this.num = num;
};

Node.prototype.resetNode = function(n)
{
    this.x = n.x;
    this.y = n.y;
    this.type = n.type;
    this.color = n.color;
    this.size = n.size;
    this.num = n.num;
    this.graphicID = n.graphicID;
};



