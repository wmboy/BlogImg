
//Ajax 评论
function ajaxcomments(){
    var
    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
 var
    comments_order = 'DESC',
    comment_list   = '.comment-list',
    comments       = '.noticom',
    comment_reply  = '.vreply',
    comment_form   = '#comment-form',
    respond        = '#comments-ajax',
    textarea       = '#textarea',
    submit_btn     = '#submit',
    new_id = '', parent_id = '';

 click_bind();
 
 $(comment_form).submit(function() { // 提交

    /* 预检 */
     var textValue = $(comment_form).find(textarea).html().replace(/(^\s*)|(\s*$)/g, "");//检查空格信息
     var textValuex = $(comment_form).find(textarea).val().replace(/(^\s*)|(\s*$)/g, "");//检查空格信息

     if (textValue == null || textValue == "") {
         if(textValuex == null || textValuex == ""){
            $.notify({
                // options
                message: '评论内容不能为空！' 
                },{
                // settings
                element: 'body',
                position: "fixed",
                type: "info",
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 1000,
                timer: 1000,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:12rem;background:#ff9800;color: white;box-shadow:rgb(255 152 0 / 43%) 0px 0px 30px 0px;">' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                    '</div>' 
            });
             return false;
         }
     }
     
     $.ajax({
         url: $(this).attr('action'),
         type: $(this).attr('method'),
         data: $(this).serializeArray(),async: false,
         error: function() {
            $.notify({
                // options
                message: '提交失败，请重试！' 
                },{
                // settings
                element: 'body',
                position: "fixed",
                type: "info",
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 1000,
                timer: 1000,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:12rem;background:#ff9800;color: white;box-shadow:rgb(255 152 0 / 43%) 0px 0px 30px 0px;">' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                    '</div>' 
            });
             return false;
         },
         success: function(data) { //成功取到数据
             //console.log(data);

             try {
                 if (!$(comment_list, data).length) {
                    $.notify({
                        // options
                        message: '评论太快了！' 
                        },{
                        // settings
                        element: 'body',
                        position: "fixed",
                        type: "info",
                        placement: {
                            from: "top",
                            align: "right"
                        },
                        offset: 20,
                        spacing: 10,
                        z_index: 1031,
                        delay: 1000,
                        timer: 1000,
                        animate: {
                            enter: 'animated fadeInDown',
                            exit: 'animated fadeOutUp'
                        },
                        template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:12rem;background:#ff9800;color: white;box-shadow:rgb(255 152 0 / 43%) 0px 0px 30px 0px;">' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                    '</div>' 
                    });
                     return false;
                 } else {
                     new_id = $(comment_list, data).html().match(/id=\"?comment-\d+/g).join().match(/\d+/g).sort(function(a, b) {
                         return a - b
                     }).pop(); // TODO：找新 id，如果在第二页评论的话，找到的ID是有问题的！

                     if ($('.page-navigator .prev').length && parent_id == ""){
                         new_id = '';
                         var dd=$(".prev a").attr("href");//获取上页地址
                         $(".prev a").attr("href",""); //将地址清空
                         dd=dd.replace(/comment-page-(.*?)#comments/, "comment-page-1#comments");//将获取的地址页码改为1
                         $(".prev a").attr("href",dd); //将地址放回去
                         $('.prev a').get(0).click(); //点击这个超链接
                     }//判断当前评论列表是否在第一页,并且只会在母评论时候才会生效

                     console.log("new id " + new_id);
                     //插入评论内容到当前页面
                     if (parent_id) {
                         data = $('#li-comment-' + new_id, data).hide(); // 取新评论
                         if ($('#' + parent_id).find(".comment-children").length <= 0) {
                             $('#' + parent_id).append("<div class='comment-children'><ol class='comment-list'></ol></div>");
                         }
                         if (new_id)//new_id不为空的时候才会插入
                             $('#' + parent_id + ".comment-children .comment-list").prepend(data);
                         console.log('该评论为子评论,parent_id:' + parent_id);
                         parent_id = '';
                         console.log(data);
                     } else {
                         data = $('#li-comment-' + new_id, data).hide(); // 取新评论
                         //console.log('该评论为母评论');
                         if (!$(comment_list).length) //如果一条评论也没有的话
                             $(respond).append('<ol class="comment-list"></ol>'); // 加 ol
                         $(comment_list).prepend(data);
                         console.log('评论内容:');
                         console.log(data);
                     }
                     $('#li-comment-' + new_id).fadeIn(); // 显示
                     $.notify({
                        // options
                        message: '评论成功！' 
                        },{
                        // settings
                        element: 'body',
                        position: "fixed",
                        type: "success",
                        placement: {
                            from: "top",
                            align: "right"
                        },
                        offset: 20,
                        spacing: 10,
                        z_index: 1031,
                        delay: 1000,
                        timer: 1000,
                        animate: {
                            enter: 'animated fadeInDown',
                            exit: 'animated fadeOutUp'
                        },
                        template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:10rem;background:rgb(71 183 76);color: white;box-shadow:rgb(71 183 76 / 50%) 0px 0px 30px 0px;">' +
                            '<span data-notify="title">{1}</span> ' +
                            '<span data-notify="message">{2}</span>' +
                        '</div>' 
                    });
                     var num;
                     $(comments).length ? (num = parseInt($(comments).text().match(/\d+/)), $(comments).html($(comments).html().replace(num, num + 1))) : 0;
                     //console.log($('#comments h4').length);
                     // 评论数加一
                     TypechoComment.cancelReply();
                     $(textarea).html('');$(textarea).val('');
                     $(comment_reply + ' #cancel-comment-reply-link').unbind('click');
                     click_bind(); // 新评论绑定
                     if (new_id){
                         $body.animate({scrollTop: $('#li-comment-' + new_id).offset().top - 200}, 900);
                     }else{
                         $body.animate({scrollTop: $('#comments').offset().top - 200}, 900);
                     }
                 }
             } catch(e) {
                $.notify({
                    // options
                    message: '评论ajax错误!' 
                    },{
                    // settings
                    element: 'body',
                    position: "fixed",
                    type: "info",
                    placement: {
                        from: "top",
                        align: "right"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 1000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOutUp'
                    },
                    template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:12rem;background:#ff9800;color: white;box-shadow:rgb(255 152 0 / 43%) 0px 0px 30px 0px;">' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                    '</div>' 
                });
                 window.location.reload();
             }
         } // end success()
     }); // end ajax()
     return false;
 }); // end $(comment_form).submit()
 
function click_bind() { // 绑定
    $(comment_reply).click(function() { // 回复
        parent_id = $(this).parent().parent().parent().attr("id");
        $(textarea).focus();
    });
    $('#cancel-comment-reply-link').click(function() { // 取消
        parent_id = '';
    });
}

}