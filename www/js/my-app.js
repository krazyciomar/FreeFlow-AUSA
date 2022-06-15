myApp.onPageInit('PAGENAME', function (page) {  

$$.get('http://freeflow.it-tel.com.ar/loco.php', {}, function (data) {        
        $$('#PAGEPlaceHolder').html(data);          
    });     
});