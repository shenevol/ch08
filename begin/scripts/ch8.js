/*global $, document, location, alert*/
$(document).ready(function(){
    var freq = 10000;
    var startUpdate = false;

    function clearInputs(){
        $('#newRunner:input').each(function(){
            $(this).val('');
            //if val has its param, it will replace this value with ''
            //if val(), it will get the value of this
        });
    }

    function showFreq(){
        $('#freq').html('this page is refreshed every ' + (freq / 1000) + ' sec');
        console.log(freq);
    }

    function updateTime(){
        // var d = new Date();
        // var hours = d.getHours();
        // var am_pm;
        // if (hours < 12){
        //     am_pm = 'am';
        // }
        // else{
        //     am_pm = 'pm';
        // }
        // var minutes = d.getMinutes();
        // var seconds = d.getSeconds();

        $.get('http://localhost:3000/', function(data) {
            var date = new Date(data);
            $('#updatedTime').text(date);
            console.log('async');
            console.log(data);

        });
        // var now = 'now is '+hours+':'+minutes+':'+seconds+' '+am_pm;
        // console.log('now is '+hours+':'+minutes+':'+seconds+' '+am_pm);
        // return now;
    }

    function getRacer(){
        $.getJSON('http://localhost:3000/finishers', function(data) {
            $('#f_runners').empty();
            $('#m_runners').empty();
            $('#all_runners').empty();

            data.finishers.forEach(function(finisher) {
                var html = '<li>Name: ' + finisher.fname + ' ' + finisher.lname + ' ' + finisher.time + '</li>';

                if (finisher.gender === 'f') {
                    $('#f_runners').append(html);
                } else if (finisher.gender === 'm') {
                    $('#m_runners').append(html);
                }

                $('#all_runners').append(html);
            });
        });
    }

    function startAJAXcall(){
        if(startUpdate){
            setTimeout(function(){
                startAJAXcall();
                getRacer();
                updateTime();
                console.log('setTimeout');
            }, freq);
        }
    } //end of startAJAXcall


    getRacer();

    updateTime();

    // refresh

    $('#startUpdate').click(function(){
        startUpdate = true;
        startAJAXcall();
        showFreq();
    });

    $('#stopUpdate').click(function(){
        startUpdate = false;
        $('#freq').html('Now stop updates');
    });

    // navigation

    $('.nav-tabs li').click(function(){
        var tabActive;

        $('.nav-tabs .active').removeClass('active');
        $(this).addClass('active');
        $('.nav-tabs li .selected').removeClass('selected');
        $(this).find('a').addClass('selected');
        tabActive = $(this).find('a').attr('href');
        $('.tab-content .active').removeClass('active');
        $(tabActive).addClass('active');


    });

    $('.nav-tabs [href=' + location.hash + ']').closest('li').click();
    /* [href] is attribute select, it will select all nodes under
    class .nav-tabs, and find href=location.hash,
    and click the li of that node
    */

    $('#addRunner').click(function(){
        var newFinisher = $('#newRunner').serializeArray();
        var actionEndpoint = $('#newRunner').attr('action');

        // $.post(actionEndpoint, newFinisher, function(json){
        //     getRacer();
        //     clearInputs();
        // }, 'json');

        $.post(actionEndpoint, newFinisher)
            .done(function(data) {
                console.log('asdf')
            });

    });

    $('#newRunner').submit(function(){
        return false;
        //do not use original form submit method, use ajax
        //to pass form to server

    });
    // if( location.search == '?status=ok'){
    //     alert('successfully add a new runner');
    // }
}); //end of ready
