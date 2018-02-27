
function fix()
{
    var el = this;
    var par = el.parentNode;
    var next = el.nextSibling;
    par.removeChild(el);
    setTimeout(function() {par.insertBefore(el, next);}, 0)
}
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/JZaGDyaFeZTjCR1RO6VW'));

var contractAddr = ('0x03Cf94938696812A3615A98cdFcf82598EF30158');

toastr["success"](" connection", "Infura API")

var apiKey = 'AWTMYNTJUIJVCN7A7D9WJRSR3YHKG7E6GR'; // Etherscan


var balanceOf = ('0x70a08231000000000000000000000000');
var interestBy = ('0x1cff272e000000000000000000000000');
var deposit = ('0x1c762a27000000000000000000000000');




var balanceOfContract = web3.eth.getBalance(contractAddr);

var candidates = [
    numA = ('0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
    numB = ('0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'),
    numC = ('0xcccccccccccccccccccccccccccccccccccccccc'),
    numD = ('0xdddddddddddddddddddddddddddddddddddddddd'),
];
var sum = 0;

for (var i = 0; i < 4; i++) {
    var balanceOfTkn = ('0x70a08231000000000000000000000000' + candidates[i].substring(2));

    var resultsTkn = web3.eth.call({
        to: contractAddr,
        data: balanceOfTkn
    });

    var resultTkn = Number(web3.fromWei(web3.toBigNumber(resultsTkn).toString() * Math.pow(10, 18), 'ether'))
    candidates[i] = resultTkn
    sum += resultTkn

};


console.log(sum);
console.log(candidates);

$('.js_contract-address').text(contractAddr).prop('href', 'https://etherscan.io/address/'+ contractAddr + '#readContract');

$('.num_a .js-count').text(candidates[0] + ' votes');
$('.num_b .js-count').text(candidates[1] + ' votes');
$('.num_c .js-count').text(candidates[2] + ' votes');
$('.num_d .js-count').text(candidates[3] + ' votes');
if (candidates[0] == 0){
    $('.num_a .js_circle').attr("data-percentage",0 + '%');
    $('.num_a .js-count_proc').text(0  + ' %');

} else {
    $('.num_a .js_circle').attr("data-percentage", Math.round(candidates[0] * 100 /sum )  + '%');
    $('.num_a .js-count_proc').text(Math.round(candidates[0] * 100 /sum )  + ' %');


}
if (candidates[1] == 0){
    $('.num_b .js_circle').attr("data-percentage",0 + '%');
    $('.num_b .js-count_proc').text(0  + ' %');

} else {
    $('.num_b .js_circle').attr("data-percentage", Math.round(candidates[1] * 100 /sum ) + '%');
    $('.num_b .js-count_proc').text(Math.round(candidates[1] * 100 /sum )  + ' %');


}
if (candidates[2] == 0){
    $('.num_c .js_circle').attr("data-percentage",0 + '%');
    $('.num_c .js-count_proc').text(0  + ' %');

} else {
    $('.num_c .js_circle').attr("data-percentage", Math.round(candidates[2] * 100 /sum ) + '%');
    $('.num_c .js-count_proc').text(Math.round(candidates[2] * 100 /sum )  + ' %');


};
if (candidates[3] == 0){
    $('.num_d .js_circle').attr("data-percentage",0 + '%');
    $('.num_d .js-count_proc').text(0  + ' %');

} else {
    $('.num_d .js_circle').attr("data-percentage", Math.round(candidates[3] * 100 /sum ) + '%');
    $('.num_d .js-count_proc').text(Math.round(candidates[3] * 100 /sum )  + ' %');


}
$('.pie').attr("data-pie", '#ea232a ' + Math.round(candidates[0] * 100 /sum ) + ', #2F96B4 ' + Math.round(candidates[1] * 100 /sum ) + ', #030303 ' + Math.round(candidates[2] * 100 /sum )+ ', #fefefe ' + Math.round(candidates[3] * 100 /sum ));


$( '#submit' ).on( "click", function() {
    var addr = $('#address').val();
    var tknAddress = (addr).substring(2);

    $('#toast-name-2').fadeIn(400).delay(2000).fadeOut(400);

    web3.eth.call({
        to: contractAddr,
        data: interestBy + tknAddress
    }, function (err, result) {
        if (result) {
            toastr["success"]("Successful connection", "Infura API")


            var tokens = web3.toBigNumber(result).toString();
            var isOfTkn = (web3.fromWei(tokens, 'ether') * Math.pow(10, 18)).toFixed(0)
            $('#inteserest').text(isOfTkn + ' Golos')

        } else {
            toastr["error"]("Fail connection", "Infura API")
            console.log(err); // Dump errors here
            $.getJSON( "https://api.etherscan.io/api?module=proxy&action=eth_call&to="+ contractAddr +"&data="+ interestBy + tknAddress +"&tag=latest&apikey=" + apiKey, function( json ) {
                toastr["success"](" connection", "Etherscan API");
                var tokens = web3.toBigNumber(result).toString();
                var isOfTokn = (web3.fromWei(tokens, 'ether') * Math.pow(10, 18)).toFixed(0)
                $('#inteserest').text(isOfTokn + ' Assets')


            });
        }
    });
    web3.eth.call({
        to: contractAddr,
        data: interestBy + tknAddress
    }, function (err, result) {
            // toastr["success"]("Successful connection", "Infura API")

            var tokens = web3.toBigNumber(result).toString();
            var isOfTkn = (web3.fromWei(tokens, 'ether') * Math.pow(10, 18)).toFixed(0)
            $('#countdown-days').text(isOfTkn + ' Assets')
        console.log(isOfTkn)


    });

    // var balance = web3.eth.getBalance('0x03Cf94938696812A3615A98cdFcf82598EF30158');

    web3.eth.call({
        to: contractAddr,
        data: balanceOf + tknAddress,
    }, function (err, result) {
        if (result) {

            var tokens = web3.toBigNumber(result).toString();
            var blOfTokn = web3.fromWei(tokens, 'ether') * Math.pow(10, 18)

            $('#coinage').text(" " + blOfTokn + ' Assets')

        } else {
            console.log(err); // Dump errors here
            $.getJSON( "https://api.etherscan.io/api?module=proxy&action=eth_call&to="+ contractAddr +"&data="+ balanceOf + tknAddress +"&tag=latest&apikey=" + apiKey, function( json ) {
                var tokens = web3.toBigNumber(result).toString();
                var blOfTokn = web3.fromWei(tokens, 'ether') * Math.pow(10, 18)

                $('#coinage').text(" " + blOfTokn + ' Assets')


            });
        }
    });

    web3.eth.call({
        to: contractAddr,
        data: deposit + tknAddress,
    }, function (err, result) {
        if (result) {

            var tokens = web3.toBigNumber(result).toString();
            var blOfTokn = web3.fromWei(tokens, 'ether') * Math.pow(10, 18)

            $('#deposit').text(" " + blOfTokn + ' Assets')

        } else {
            console.log(err); // Dump errors here
            $.getJSON( "https://api.etherscan.io/api?module=proxy&action=eth_call&to="+ contractAddr +"&data="+ balanceOf + tknAddress +"&tag=latest&apikey=" + apiKey, function( json ) {
                var tokens = web3.toBigNumber(result).toString();
                var blOfTokn = web3.fromWei(tokens, 'ether') * Math.pow(10, 18)

                $('#deposit').text(" " + blOfTokn + ' Assets')


            });
        }
    });



});

;(function(){
    /*
     * SVG Pie Chart Generator
     *
     * Inserts a SVG pie chart inside elements with a `data-pie` attribute containing the colors and numbers. Total is generated dynamically, so the numbers do not have to be a percentage.
     * Example: `<div data-pie="#fab484 5, #fe8e3f 3, #f96b07 3, #b45919 3, #7f4319 1"></div>`
     */

    var template = {
        open: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><circle id="graph" r="15.9154943092" cx="16" cy="16" transform="rotate(-90 16 16)" /><mask id="clip"><use xlink:href="#graph" fill="#FFF" /></mask></defs><g class="graph" mask="url(#clip)" stroke-width="32">',
        piece: '<use class="graph__percent graph__percent--{{num}}" xlink:href="#graph" fill="none" stroke="{{color}}" stroke-dasharray="0 {{offset}} {{percent}} 100" />',
        close: '</g></svg>'
    };
    var regex = {
        number: /([0-9]+)$/i,
        color: /(#[0-9A-Z]+)/i
    };

    function Piece(data){
        data = data.trim();
        this.number = parseInt(data.match(regex.number));
        this.color = data.match(regex.color)[1];
    }

    Piece.prototype.render = function(total,num) {
        return template.piece
            .replace('{{num}}',num)
            .replace('{{color}}',this.color)
            .replace('{{offset}}',(this.offset / total) * 100)
            .replace('{{percent}}',(this.number / total) * 100);
    }

    function Pie(elem){
        this.data = elem.getAttribute('data-pie').split(',');
        this.pieces = [];
        this.total = 0;

        var output = "",
            len = this.data.length,
            piece, i;

        for (i = 0; i < len; i++) {
            piece = new Piece(this.data[i]);
            piece.offset = this.total;
            this.total += piece.number;
            this.pieces.push(piece);
        }

        len = this.pieces.length;
        for (i = 0; i < len; i++) {
            output += this.pieces[i].render(this.total,i);
        }

        elem.innerHTML = template.open + output + template.close;
    }

    var pies = document.querySelectorAll('[data-pie]');

    for (i = 0; i < pies.length; i++) { new Pie(pies[i]); }

}());


var textarea = document.getElementById("textarea");
var copyButton= document.getElementById("copyButton");
var textarea1 = document.getElementById("textarea1");
var copyButton1= document.getElementById("copyButton1");

copyButton.addEventListener('click', function(e) {

    // Выделяем текст в поле
    textarea.select();
    // Копируем текст в буфер обмена
    document.execCommand('copy');

});
copyButton1.addEventListener('click', function(e) {

    // Выделяем текст в поле
    textarea1.select();
    // Копируем текст в буфер обмена
    document.execCommand('copy');

});


var ringer = {
    countdown_to: "02/28/2018", //1519805288
    rings: {
        'YEARS': {
            s: 31536000000, // mseconds in a day,
            max: 14
        },
        'MONTHS': {
            s: 2628000000, // mseconds in a day,
            max: 14
        },

        'DAYS': {
            s: 86400000, // mseconds in a day,
            max: 14
        },
        'HOURS': {
            s: 3600000, // mseconds per hour,
            max: 24
        },
        'MINUTES': {
            s: 60000, // mseconds per minute
            max: 60
        },
        'SECONDS': {
            s: 1000,
            max: 60
        },
        'MICROSEC': {
            s: 10,
            max: 100
        }
    },


    r_count: 4,
    r_spacing: 3, // px
    r_size: 100, // px
    r_thickness: 4, // px
    update_interval: 100, // ms


    init: function(){

        $r = ringer;
        $r.cvs = document.createElement('canvas');

        $r.size = {
            w: ($r.r_size + $r.r_thickness) * $r.r_count + ($r.r_spacing*($r.r_count-1)),
            h: ($r.r_size + $r.r_thickness)
        };


        //added devicePixelRatio for retina screens
        $r.cvs.setAttribute('width',$r.size.w * window.devicePixelRatio);
        $r.cvs.setAttribute('height',$r.size.h * window.devicePixelRatio);


        $r.ctx = $r.cvs.getContext('2d');

        //*1 multiply for non-retinas
        $r.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        $('#canvastimer').append($r.cvs);
        $r.cvs = $($r.cvs);
        $r.ctx.textAlign = 'center';
        $r.actual_size = $r.r_size + $r.r_thickness;
        $r.countdown_to_time = new Date($r.countdown_to).getTime();
        $r.cvs.css({ width: $r.size.w+"px", height: $r.size.h+"px" });
        $r.go();



    },
    ctx: null,
    go: function(){
        var idx=0;

        $r.time = (new Date().getTime()) - $r.countdown_to_time;


        for(var r_key in $r.rings) $r.unit(idx++,r_key,$r.rings[r_key]);

        setTimeout($r.go,$r.update_interval);
    },
    unit: function(idx,label,ring) {
        var x,y, value, ring_secs = ring.s;
        value = parseFloat($r.time/ring_secs);
        $r.time-=Math.round(parseInt(value)) * ring_secs;
        value = Math.abs(value);

        x = ($r.r_size*.5 + $r.r_thickness*.5);
        x +=+(idx*($r.r_size+$r.r_spacing+$r.r_thickness));
        y = $r.r_size*.5;
        y += $r.r_thickness*.5;


        // calculate arc end angle
        var degrees = 270-(value / ring.max) * 360.0;
        var endAngle = degrees * (Math.PI / 180);

        $r.ctx.save();

        $r.ctx.translate(x,y);
        $r.ctx.clearRect($r.actual_size*-0.5,$r.actual_size*-0.5,$r.actual_size,$r.actual_size);

        // first circle
        $r.ctx.strokeStyle = "#efefef";
        $r.ctx.beginPath();
        $r.ctx.arc(0,0,$r.r_size/2,1.5*Math.PI,-0.5*Math.PI, 1);
        $r.ctx.lineWidth =$r.r_thickness;
        $r.ctx.stroke();

        // second circle
        $r.ctx.strokeStyle = "#cc0000";
        $r.ctx.beginPath();
        $r.ctx.arc(0,0,$r.r_size/2,1.5*Math.PI,endAngle, 1);
        $r.ctx.lineWidth =$r.r_thickness;
        $r.ctx.stroke();

        // label
        $r.ctx.fillStyle = "#aaa";

        $r.ctx.font = '400 16px sans-serif';
        $r.ctx.fillText(label, 0, 20);

        $r.ctx.font = '400 34px sans-serif';
        $r.ctx.fillStyle = "#fefefe";
        $r.ctx.fillText(Math.floor(value), 0, 5);

        $r.ctx.restore();
    }
}

ringer.init();



$(function() {
    $('body').on('keyup keydown cut paste change focus drop',".form-control", function() {
        if($(this).val().length != 0) {
            $(this).closest('.form-group').addClass('show-label');
        } else {
            $(this).closest('.form-group').removeClass('show-label');
        }
    });

    $('.form-control').each(function() {
        if($(this).val().length != 0) {
            $(this).closest('.form-group').addClass('show-label');
        }
    });



});


$('#contract_balance').text(balanceOfContract.toString(10) / Math.pow(10, 18))

// $(document).ready(function() {
//     $('.graph__percent--3').tooltipster({
//         content: 'My new content',// <-  USE THE PROPER SELECTOR FOR YOUR INPUTs
//         trigger: 'custom', // default is 'hover' which is no good here
//         onlyOne: false,    // allow multiple tips to be open at a time
//         position: 'right'  // display the tips to the right of the element
//     });
// });

// $('.graph__percent--3').tooltipster({
// });
$(document).ready(function() {

$('.graph__percent--0').attr("title", $( ".num_a em" ).text()).tooltipster({
});
    $('.graph__percent--1').attr("title", $( ".num_b em" ).text()).tooltipster({
    });
    $('.graph__percent--2').attr("title", $( ".num_c em" ).text()).tooltipster({
    });
    $('.graph__percent--3').attr("title", $( ".num_d em" ).text()).tooltipster({
    });
});

var now = new Date(),
    otherDay =  new Date(2018,1,4)
var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()
console.log(today)
var other = otherDay.valueOf()
console.log(other)

if (other < today) { // 24*60*60*1000
    console.log('раньше чем вчера')
    $('#check_time').text('before the')

}else {
    console.log('сегодня или потом')



}