var openedpopover;
var zoomlevelbase = 1;
var baseTop;
var baseLeft;
var ie = false;
var fullscreen= false;
var saveobjectleft;
var saveobjecttop;
var savepropertiesleft;
var savepropertiestop;

function goFullscreen(){
    
    if(!fullscreen){
        
    $('body').addClass('fullscreen');
        
            fullscreen=true;
          
            $('#objects').draggable();
            $('#properties').draggable();
            $('#fullscreen').addClass("active");
            
            saveobjectleft = $('#objects').css('left');
            saveobjecttop = $('#objects').css('top');
            
            savepropertiesleft = $('#properties').css('left');
            savepropertiestop = $('#properties').css('top');
            
            
            $('#properties').draggable();
            
            autoresizeEditLayout();     
        }
        else {
            fullscreen=false;
            
            $('body').removeClass('fullscreen');
            $('#objects').draggable('destroy');
            $("#properties" ).draggable('destroy');
            
            $('#objects').css('top',saveobjecttop);  
            $('#objects').css('left',0);  
            
            $('#properties').css('left',savepropertiesleft);
            $('#properties').css('top',savepropertiestop);   
            
            $('#fullscreen').removeClass("active");
            
            autoresizeEditLayout();          
        }   
    }



function autoresizeEditLayout() {
    if(!fullscreen){
	

    if ($(window).width() > 1025) {
        $('#viewport').css({ 'width': (560 + $(window).width() - 1050) + 'px' });
    }
    else {
        $('#viewport').css({ 'width': 526 + 'px' });
    }

    if ($(window).height() > 700) {
        $('#viewport').css({ 'height': (450 + $(window).height() - 700) + 'px' });
    }
    else {
        $('#viewport').css({ 'height': 450 + 'px' });
    }

    if (($(window).height() / 2) - ($('#content').height() / 2) > 10) {
        $('#content').css({ 'top': (($(window).height() / 2) - $('#content').height() / 2) + 'px' });
    }
	
	  if ($(window).width() < 1025) {
        $('#content').css({ 'left': 10 + 'px' });
    }
	else {
		$('#content').css({ 'left': 30 + 'px' });
   }
   
    if ($(window).height() < 660) {
                $('#footer').css({ 'bottom': -(660 - $(window).height())  + 'px' });

    } else
    {
        
         $('#footer').css({ 'bottom':'0px' });
    }


    $('#menu').css({ 'left': (($('#content').width() - $('#menu').width()) / 2) + 'px' });
    $('#options').css({ 'left': (($('#viewport').width() - $('#options').width()) / 2) + 'px' });


    $('#objects').css({ 'top': (($('#viewport').height() / 2) - ($('#objects_content').height() / 2)) + 'px' });
    $('#properties').css({ 'top': (($('#viewport').height() / 2) - ($('#properties_content').height() / 2)) + 'px' });
    }
    else{
        
         $('#viewport').css({ 'width': $(window).width() + 'px' });
         $('#viewport').css({ 'height': $(window).height() + 'px' });
        
    }
}

function autoresizeLoginLayout() {

    $('#content').css({ 'left': (($(window).width() / 2) - $('#content').width() / 2) + 'px' });
    if (($(window).height() / 2) - $('#content').height() / 2 > 110) {
        $('#content').css({ 'top': (($(window).height() / 2) - $('#content').height() / 2) + 'px' });
    }
}

function objectTabSwitch(index) {

    $('#objectscontainer-tabs .tab').removeClass("active");
    $('#objectscontainer-tabs .tab:nth-child(' + (index + 1) + ')').addClass("active");

    $('#objectscontainer-tabs-content .tabs-content').css({ 'display': 'none' });
    $('#objectscontainer-tabs-content .tabs-content:nth-child(' + (index + 1) + ')').css({ 'display': 'block' });

}

function modalTabSwitch(index) {

    $('.modal-tabs li').removeClass("active");
    $('.modal-tabs li:nth-child(' + (index + 1) + ')').addClass("active");

    $('.modal-tabs div').css({ 'display': 'none' });
    $('.modal-tabs div').eq(index).css({ 'display': 'block' });


}


function objectAccordionSwitch(index) {

    if ($('#objectscontainer-tabs-content-accordion .box:nth-child(' + (index + 1) + ')').hasClass("active")) {
        $('#objectscontainer-tabs-content-accordion .box:nth-child(' + (index + 1) + ')').removeClass("active");
    }
    else {

        $('#objectscontainer-tabs-content-accordion .box').removeClass("active");
        $('#objectscontainer-tabs-content-accordion .box:nth-child(' + (index + 1) + ')').addClass("active");

    }
    
}

function selectObject(object) {
    
    if ($('.dragElement.active').length) {
        srcTemp = $('.dragElement.active').find('img').attr("src");
        srcTemp = srcTemp.replace('_pink.svg', '.svg');
        $('.dragElement.active').find('img').attr("src", srcTemp);
        $('.dragElement.active').removeClass("active");
   }

    srcTemp = object.find('img').attr("src");
    srcTemp = srcTemp.replace('.svg', '_pink.svg');
    object.find('img').attr("src", srcTemp);
    object.addClass("active");

}

function get_data_for_popover_and_display(event) {

    var el = $(this);

    //Check if e popover is open and not the one is klicked
    if (openedpopover && el.attr('id') != openedpopover) {

        $('#'+openedpopover).popover('hide');
    }

    if ($('.popover').hasClass('in')) {

        el.popover('hide');
    } else {

        var _data = el.attr('alt');

        $.ajax({
            type: 'GET',
            url: event.data.url,
            data: _data,
            dataType: 'html',
            cache: false,
            beforeSend: function () {
                el.attr('data-content', "<div class='loader-white'><img src='images/spinner_white.gif' \></div>");
                el.popover('show');
                openedpopover = el.attr('id');
            },

            success: function (data) {
                $('.popover-content').html(data);
            },
            error: function (xhr, status, error) {
                $('.popover-content').html('An error happens<br><hr>' + status + ': ' +error);
            }
        });
    }
}

function loadModal(url) {

    $('#modal').load(url, function () {
        $(this).modal({
            keyboard: true,
            backdrop: true
        });
    }).modal('show');
}

function loadDrawing(id) {

    if (id) {
        alert("load:" + id);
    }
    else {
        alert('No Drawing selected!');
    }
}

function editDrawing(url,id) {

    if (id) {
        loadModal(url + '?id=' + id);
      
    }
    else {
        alert('No Drawing selected!');
    }
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
    );
}

function checkBaseSize(object) {

    var maxTop;
    var maxLeft;

    $('.dragElement').each(function () {
        maxTop = maxTop > parseInt($(this).css('top'),10) ? maxTop : parseInt($(this).css('top'),10);
        maxLeft = maxLeft > (parseInt($(this).css('left'), 10)) ? maxLeft : parseInt($(this).css('Left'), 10);
    });

    $('#base').css({ 'width': maxLeft + 100 + 'px' });
    $('#base').css({ 'height': maxTop + 75 + 'px' });
}

function scaleBase(type) {

        switch (type) {
            case 'plus':
                zoomlevelbase = zoomlevelbase + 0.2;
                $('#base').css({ 'zoom': zoomlevelbase });
               // $('#base').css({ '-webkit-transform': 'scale('+zoomlevelbase+')' });

                break;

            case 'minus':

                if (zoomlevelbase > 0.4) {

                    zoomlevelbase = zoomlevelbase - 0.2;
                    $('#base').css({ 'zoom': zoomlevelbase });
                }

                break;


            case 'reset':
                zoomlevelbase = 1;
                $('#base').css({ 'zoom': zoomlevelbase });
                break;
        }

}