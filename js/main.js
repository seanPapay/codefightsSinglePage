$().ready(function() {
    $(".simple").splitter({
	type: "v",
	//outline: true,
	//anchorToWindow: true,
	minLeft: 100, sizeLeft: 250, minRight: 100,
	
	accessKey: 'I'
    });
    
    var start = Date.now();
    var total = 180000;
    
    //use this if your browser is allowing cross-origin requests without the proper headers
    //$.ajax('http://jaspervdj.be/lorem-markdownum/markdown.txt').done(function(md) {
    //use this if you are running a real server and loading via http:// instead of file://
    $.ajax('lorem.md').done(function(md) {
	var markdownDiv = $('#markdown');
	markdownDiv.html(markdown.toHTML(md));
	
    });
    
    var formatTime = function(time) {
	var minutes = Math.floor(time / 60000);
	time %= 60000;
	var seconds = Math.floor(time / 1000);
	if (seconds < 10) seconds = "0" + seconds;
	return minutes + ":" + seconds;
    };

    //there is probably a good way to make the page reactive using proper bootstrap and stuff.
    //unfortunately, I do not know that, and the split pane library I am using seems to complicate things
    //this is probably a bit hackish...
    var onResize = function() {
	console.log($(window).height());
	$(".simple").css("height", ($(window).height() - 30) + "px");
	$(".markdown").css("height", ($(window).height() - 50) + "px");
	$(".CodeMirror").css("height", ($(window).height() - 50) + "px");
	$(".vsplitbar").css("height", ($(window).height() - 40) + "px");
    };

    $(window).resize(onResize);
    onResize();
    
    var step = function() {
        var elapsed = Date.now() - start;
        var remaining = Math.max(0, total - elapsed);
	
        var timer = document.getElementById("timer");
        timer.innerHTML = formatTime(remaining);
	window.requestAnimationFrame(step);
    };
    step();
});
