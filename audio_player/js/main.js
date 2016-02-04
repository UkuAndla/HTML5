// Hide Pause
$('#pause').hide();

var audio;
initAudio($('#playlist li:first-child'));

function initAudio(element){
    var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');
    // Create audio object
    audio = new Audio('media/'+song);

    // Set starting volume
    audio.volume = parseFloat($('#volume').val()/100);

    // Insert audio info
    $('.artist').text(artist);
    $('.title').text(title);

    // Insert song cover
    $('img.cover').attr('src','img/covers/'+cover);

    //
    $('#playlist li').removeClass('active');
    element.addClass('active');
}

// Play button
$('#play').click(function(){
    audio.play();
    $('#play').hide();
    $('#pause').show();
    showDuration();
});

// Pause button
$('#pause').click(function(){
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});

// Stop button
$('#stop').click(function(){
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
});

// Next button
$('#next').click(function(){
    audio.pause();
    var next = $('#playlist li.active').next();
    if(next.length == 0){
        next = $('#playlist li:first-child');
    }
    initAudio(next);
    audio.play();
    showDuration();
});

// Prev button
$('#prev').click(function(){
    audio.pause();
    var prev = $('#playlist li.active').prev();
    if(prev.length == 0){
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
    audio.play();
    showDuration();
});

// Playlist song click
$('#playlist li').click(function(){
    audio.pause();
    initAudio($(this));
    $('#play').hide();
    $('#pause').show();
    audio.play();
    showDuration();
})

// Volume control
$('#volume').change(function(){
    audio.volume = parseFloat(this.value / 100);
});

// Time Duration
function showDuration(){
    $(audio).bind('timeupdate',function(){
       // Get seconds and minutes
        var s = parseInt(audio.currentTime % 60);
        var m = parseInt(audio.currentTime / 60) % 60;
        if(s<10){
            s = '0'+s;
        }
        $('#duration').html(m+":"+ s);
        var value = 0;
        if(audio.currentTime>0){
            value =Math.floor((100/audio.duration)* audio.currentTime);
        }
        $('#progress').css('width',value +'%');
    });
}

// Time jump
$('#progress-bar').click(function(e){

    var percent = e.offsetX / this.offsetWidth;
    console.log(audio.currentTime);
    audio.currentTime = percent * audio.duration;
    console.log(audio.currentTime);
    this.value = percent /100;
});
