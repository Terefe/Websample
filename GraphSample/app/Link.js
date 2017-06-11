var Link = function(src, trg)
{
    this.source = src;
    this.target = trg;
    this.type = '';
    this.color = '';
    
};

Link.prototype.resetLink = function(L)
{
    this.source = L.source;
    this.target = L.target;
    this.type = L.type;
    this.color = L.color;
};


