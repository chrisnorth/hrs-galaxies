function hrsimg(){
    return this;
}

hrsimg.prototype.scaleimg = function(){

    //calculate widths
    var w=$(window).width();
    var h=$(window).height();
    console.log('window',w,h);
    var el=$("#mos-ir");
    var scalex=(w-20)/el.outerWidth();
    var scaley=h/el.outerHeight();
    console.log('img',el.outerWidth(),el.outerHeight())
    //var scale = (scalex < scaley ? scalex : scaley);
    scale = scalex
    console.log('scale',scale)

    //centre background images
    bgw=Math.round(parseFloat($("#mos-ir").css("width"))*scale);
    bgh=Math.round(parseFloat($("#mos-ir").css("height"))*scale);
    this.bgw=bgw
    this.bgh=bgh
    this.scale=scale
    this.ml=(w - this.bgw)/2
    //this.ml=0
    console.log('computed',this.bgw,this.bgh,this.ml)
    $(".outer").css({
	"width":bgw+"px",
	"height":bgh+"px",
	"left":this.ml+"px"
    })
    $("#mos-vis").css({
	"width":bgw+"px",
	"height":bgh+"px",
    })
    $("#mos-ir").css({
	"width":bgw+"px",
	"height":bgh+"px",
    })

    console.log('scaled')

    //centre buttons
    elbutt=$(".buttons");
    this.bw=elbutt.outerWidth()
    this.bl=(this.bgw - this.bw)/2
    elbutt.css({
	"left":this.bl+"px"
    })

}

hrsimg.prototype.setup = function(){

    //scale image
    this.scaleimg();
    bgw=this.bgw;
    bgh=this.bgh;

    //initialise visible image opacity
    this.visop=0.0;
    this.visel=$("#mos-vis");

    this.markel=$(".marker");
    this.markscale=100*(1 - this.markel.outerWidth()/$(".marker-area").innerWidth())
    console.log('marker scale',this.markscale)
    this.setvis()
};

hrsimg.prototype.setvis = function(){
    if (this.visop < 0){
	this.visop=0.0
    }
    if (this.visop > 1){
	this.visop=1.0
    }
    this.visel.css({
	"opacity":this.visop
    })
    this.markel.css({
	"left":this.visop*this.markscale+"%"
    })
    console.log('new opacity',this.visop)
};

hrsimg.prototype.incvis = function(dvis){
    console.log('increasing vis opacity by',dvis)
    this.visop = this.visop + dvis;
    this.setvis()
}
$(document).ready(function(){

    hrs = new hrsimg();
    hrs.setup();

    $(window).on("resize",{me:hrs},function(e){
	//console.log("resize");
	e.data.me.scaleimg();
    });

    $("#button-inc").click(function(){
	hrs.incvis(0.2);
    })
    $("#button-dec").click(function(){
	hrs.incvis(-0.2);
    })
    $("#button-ir").click(function(){
	hrs.incvis(-1.0);
    })
    $("#button-vis").click(function(){
	hrs.incvis(1.0);
    })

    $('a.helpbox').each(function(){
	$(this).fancybox({
	    'transitionIn': 'fade',
       	    'transitionOut': 'fade',
       	    'type': 'inline',
	    'autoDimensions': 'true'
	})
    });

    var isInIframe = (window.location != window.parent.location) ? true : false;
    //console.log(isInIframe);
    if (!isInIframe){
	$('div.fullscreenbox').css({'display':'none'});
	//console.log('not in iframe')
    }else{
	$('div.backbox').css({'display':'none'});
	//console.log('in iframe')
    };

    $('div.backbox').click(function(){
	window.history.back()
	//console.log('goback');
    });


});
