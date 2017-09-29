 _Lightbox = function(_obW) {
    this.obW = _obW;
    this.opis = _obW.title || "...";
    this.div_opis = null;
    this.div_background = null;
    this.div_container = null;
    this.image = null;
    this.imageWidth = 0;
    this.imageHeight = 0;
    this.loading = null;
    this.o = this;
    
    this.destroy = function() {
        this.div_background.parentNode.removeChild(this.div_background);
        this.div_container.parentNode.removeChild(this.div_container);
        delete this;
    }

    this.init = function() {            
        var ob = this.o;
        var body = document.getElementsByTagName('body')[0];
        var href = this.obW.href;
        this.loading = document.createElement('span');
        this.loading.className = 'lightbox-loading';
        this.obW.appendChild(this.loading);

        this.image = new Image();
        this.image.onload = function () {
            ob.loading.parentNode.removeChild(ob.loading);
            ob.loading = null;

            ob.imageWidth = ob.image.width;
            ob.imageHeight = ob.image.height;

            ob.div_background = document.createElement('div');
            ob.div_background.className = 'lightbox-background';
            ob.div_background.style.width = window.innerWidth;
            ob.div_background.style.height = window.innerHeight;
            ob.div_background.title = "Kliknij aby zamknąć";
            ob.div_background.onclick = function() {
                ob.destroy();
            }
            body.appendChild(ob.div_background);

            ob.div_container = document.createElement('div');
            ob.div_container.className = 'lightbox-container';
            ob.div_container.style.marginTop = -(ob.imageHeight/2+20)+'px';
            ob.div_container.style.marginLeft = -(ob.imageWidth/2)+'px';
            ob.div_container.style.width = ob.imageWidth + 'px';
            ob.div_container.style.height = ob.imageHeight+20 + 'px';
            ob.div_container.appendChild(ob.image);

            ob.div_opis = document.createElement('div');
            ob.div_opis.className = 'opis';
            ob.div_opis.appendChild(document.createTextNode(ob.opis));
            ob.div_container.appendChild(ob.div_opis);
            
            var btnClose = document.createElement('input');
                btnClose.type = "button";
                btnClose.className = "close";
                btnClose.value = "x";
                btnClose.onclick = function() {
                    ob.destroy();
                }
            ob.div_container.appendChild(btnClose);

            body.appendChild(ob.div_container);
        }
        this.image.src = this.obW.href;
    }
    this.init();
}

Node.prototype.lightbox = function() {
    if (!(new RegExp('^.+jpg|png|jpeg|gif$', 'gi')).test(this.href)) return
    this.onclick = function() {
        var lighbox = new _Lightbox(this);
        return false;
    }        
}

window.onload = function() {
    var a = document.getElementsByTagName('a');
        for (i=0; i<a.length; i++) {
            if (a[i].className == 'flesh-lightbox') {
                a[i].lightbox();
            }
        }
}