$(window).bind("pageshow", function() {
  $('form').each(function() { 
    this.reset();
  });
});

$('#cabinetFace, .cabinetFace, #cabinetMount, .cabinetMount, #cabinetLighting, .cabinetLighting, #cabinetPaint, .cabinetPaint').hide();

var priceSet;

function totalPrice(){
    var estimateTotal = depthPrice + facePrice + mountPrice + lightPrice + paintPrice;
    var estimatePrice = '$' + estimateTotal.toFixed(2);
    $('#totalPrice').attr("value", estimatePrice);
}

$('#cabinetSize').change(function(){
    if ($('#cabinetSize').val() === "23") {
        priceSet = cab23;
    } else if ($('#cabinetSize').val() === "24") {
        priceSet = cab24;
    } else if ($('#cabinetSize').val() === "25") {
        priceSet = cab25;
    } else if ($('#cabinetSize').val() === "26") {
        priceSet = cab26;
    } else if ($('#cabinetSize').val() === "28") {
        priceSet = cab28;
    } else if ($('#cabinetSize').val() === "34") {
        priceSet = cab34;
    } else if ($('#cabinetSize').val() === "35") {
        priceSet = cab35;
    } else if ($('#cabinetSize').val() === "36") {
        priceSet = cab36;
    } else if ($('#cabinetSize').val() === "38") {
        priceSet = cab38;
    } else if ($('#cabinetSize').val() === "44") {
        priceSet = cab44;
    } else if ($('#cabinetSize').val() === "45") {
        priceSet = cab45;
    } else if ($('#cabinetSize').val() === "46") {
        priceSet = cab46;
    } else if ($('#cabinetSize').val() === "48") {
        priceSet = cab48;
    } else if ($('#cabinetSize').val() === "choose") {
        priceSet = 0.00;
    }
});

$('#cabinetDepth').change(function(){
    var size = $('#cabinetSize').val();
    if (size !== "choose") {
        $('#cabinetFace, .cabinetFace').show();
    }
});

$('#cabinetSize').change(function(){
    if ($('#cabinetDepth').val() !== "choose") {
        $('#cabinetFace, .cabinetFace').show();
    }
});

var depth;
var depthPrice = 0.00;

$('#cabinetDepth, #cabinetSize').change(function(){
    
    depth = $('#cabinetDepth').val();
    var mountSingle = '<option value="choose">Choose</option><option value="in">Internal</option><option value="ex">External</option><option value="none">None</option>';
    var mountDouble = '<option value="choose">Choose</option>  <option value="pole">Double Sided Center Pole</option><option value="none">None</option>';
    var mountOptions;
    
    if (depth === "6ss") {
        mountOptions = mountSingle;
        depthPrice = priceSet['sS6'];
    } else if (depth === "75ss") {
        mountOptions = mountSingle;
        depthPrice = priceSet['sS75'];
    } else if (depth === "115ds") {
        mountOptions = mountDouble;
        depthPrice = priceSet['dS115'];
    } else {depthPrice = 0.00};
    
    $('#depthPrice').text("");
    if (depth !== "choose") {
        $('#depthPrice').append('$' + depthPrice.toFixed(2));
    }
    totalPrice();
    $('#cabinetMount option').remove();
    $('#cabinetMount').append(mountOptions);
});

$('#cabinetFace').change(function(){
    $('#cabinetMount, .cabinetMount').show();
});

var facePrice = 0.00;

$('#cabinetFace, #cabinetSize, #cabinetDepth').change(function(){
    var face = $('#cabinetFace').val();
    
    if (face === "flat" && (depth === "6ss" || depth === "75ss")) {
        facePrice = priceSet['flatFace1'];
    } else if (face === "flat" && depth === "115ds") {
        facePrice = priceSet['flatFace2'];
    } else if (face === "pan" && (depth === "6ss" || depth === "75ss")) {
        facePrice = priceSet['panFace1'];
    } else if (face === "pan" && depth === "115ds") {
        facePrice = priceSet['panFace2'];
    } else if (face === "none") {
        facePrice = priceSet['none'];
    } else {facePrice = 0.00}
    
    $('#facePrice').text("");
    if (face !== "choose" && depth !== "choose") {
        $('#facePrice').append('$' + facePrice.toFixed(2));
    }
    totalPrice();
});

$('#cabinetMount').change(function(){
    $('#cabinetLighting, .cabinetLighting').show();
});

var mountPrice = 0.00;

$('#cabinetMount, #cabinetSize, #cabinetDepth').change(function(){
    var mount = $('#cabinetMount').val();
    
    if (mount === "in") {
        mountPrice = priceSet['internal'];
    } else if (mount === "ex") {
        mountPrice = priceSet['external'];
    } else if (mount === "pole") {
        mountPrice = priceSet['centerPole'];
    } else if (mount === "none") {
        mountPrice = priceSet['none'];
    } else {mountPrice = 0.00}
    
    $('#mountPrice').text("");
    if (mount !== "choose" && depth !== "choose") {
        $('#mountPrice').append('$' + mountPrice.toFixed(2));
    }
    totalPrice();
});

$('#cabinetLighting').change(function(){
    $('#cabinetPaint, .cabinetPaint').show();
});

var lightPrice = 0.00;

$('#cabinetLighting, #cabinetSize, #cabinetDepth').change(function(){
    var light = $('#cabinetLighting').val();
    
    if (light === "fl" && (depth === "6ss" || depth === "75ss")) {
        lightPrice = priceSet['fluorescents'];
    } else if (light === "fl" && depth === "115ds") {
        lightPrice = priceSet['flourescentDS'];
    } else if (light === "led" && (depth === "6ss" || depth === "75ss")) {
        lightPrice = priceSet['sSLED'];
    } else if (light === "led" && depth === "115ds") {
        lightPrice = priceSet['dSLED'];
    } else if (light === "none") {
        lightPrice = priceSet['none'];
    } else {lightPrice = 0.00}
    
    $('#lightPrice').text("");
    if (light !== "choose" && depth !== "choose") {
        $('#lightPrice').append('$' + lightPrice.toFixed(2));
    }
    totalPrice();
});

var paintPrice = 0.00;

$('#cabinetPaint, #cabinetSize, #cabinetDepth').change(function(){
    var paint = $('#cabinetPaint').val();
    
    if (paint === "yes") {
        paintPrice = priceSet['paint'];
    } else if (paint === "no") {
        paintPrice = priceSet['none'];
    } else {paintPrice = 0.00}
    
    $('#paintPrice').text("");
    if (paint !== "choose" && depth !== "choose") {
        $('#paintPrice').append('$' + paintPrice.toFixed(2));
    }
    totalPrice();
});

/*Validate form and generate quote number*/

var submitting = '<span id="submission">Submitting Information...</span>'

$('#estimation').submit(function(event){
  if ($('#cabinetSize').val() === "choose" || $('#cabinetDepth').val() === "choose" || $('#cabinetFace').val() === "choose" || $('#cabinetMount').val() === "choose" || $('#cabinetLighting').val() === "choose" || $('#cabinetPaint').val() === "choose") {
    event.preventDefault();
    alert('Please make sure that all options have been selected before submitting.');
  } else {$('#estimateSubmit').replaceWith(submitting);}
  
  $('select').each(function(){
    if ($(this).val() === "choose") {
      $(this).addClass('error');
    }
  });
  
  var now = new Date();
  var parts = [now.getFullYear(),(now.getMonth() + 1),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds()];
  var quoteNumber = parts.join("");
  $('#estimateNumber').attr("value", quoteNumber);
  number = quoteNumber;
});

$('#cabinetSize, #cabinetDepth, #cabinetFace, #cabinetMount, #cabinetLighting, #cabinetPaint').change(function(){
  $('select').each(function(){
    $(this).removeClass('error');
  });
});

/*Contact Form Validation*/

$('#estimateContact').submit(function(event){
  $('#error').replaceWith('<p id="error"></p>')
  if ($('#name').val() === "" || $('#business').val() === "" || $('#address').val() === "" || $('#phone').val() === "" || $('#mail').val() === "") {
    event.preventDefault();
    /*$('#error').replaceWith(contactMessage);*/
    alert('Some required fields have not been filled out.  Please check section 1 of the form and fill in any missing fields.');
  } else {$('#contactSubmit').replaceWith(submitting);}
  
  $('#contactInfo input').each(function(){
    if ($(this).val() === "" && $(this).prev().children().hasClass('required')) {
      $(this).addClass('error');
    }
  });
  
});

function ok() {
  $('#contactInfo input').each(function(){
    if ($(this).val() !== "") {
      $(this).removeClass('error');
    }
  });
}
                           
$('#name, #business, #address, #phone, #mail').keyup(ok).change(ok).select(ok);