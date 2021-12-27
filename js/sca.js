/**
 * 
 * 主题设置开关JS
 * Update 12/08/2021
 * 
**/

$(document).ready(function(){


$('#pjax_switch-0-17').change(function(){
    var a=$(this).children('option:selected').val();
    
    if(a=='1'){
        $("#typecho-option-item-pjax_complete-17").show();
    }else{
        $("#typecho-option-item-pjax_complete-17").hide();
    }
})
var options=$("#pjax_switch-0-17 option:selected").val();
if(options !== '1'){
$("#typecho-option-item-pjax_complete-17").hide();
}

$('#ymusic-0-19').change(function(){
    var a=$(this).children('option:selected').val();
    
    if(a=='1'){
        $("#typecho-option-item-bof-19").show();
        $("#typecho-option-item-sxj-20").show();
        $("#typecho-option-item-musicList-21").show();
    }else{
        $("#typecho-option-item-bof-19").hide();
        $("#typecho-option-item-sxj-20").hide();
        $("#typecho-option-item-musicList-21").hide();
    }
})
var options=$("#ymusic-0-19 option:selected").val();
if(options !== '1'){
$("#typecho-option-item-bof-19").hide();
$("#typecho-option-item-sxj-20").hide();
$("#typecho-option-item-musicList-21").hide();
}

$('#SrcCdn-0-33').change(function(){
    var a=$(this).children('option:selected').val();
    
    if(a=='3'){
        $("#typecho-option-item-SrcCdn_Custom-33").show();
    }else{
        $("#typecho-option-item-SrcCdn_Custom-33").hide();
    }
})
var options=$("#SrcCdn-0-33 option:selected").val();
if(options !== '3'){
$("#typecho-option-item-SrcCdn_Custom-33").hide();
}

})