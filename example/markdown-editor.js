/**
* Chinese translation for bootstrap-markdown
* benhaile <denghaier@163.com>
*/
(function ($) {
$.fn.markdown.messages.zh = {
    'Bold': "粗体",
    'Italic': "斜体",
    'Heading': "标题",
    'URL/Link': "链接",
    'Image': "图片",
    'List': "列表",
    'Unordered List': "无序列表",
    'Ordered List': "有序列表",
    'Code': "代码",
    'Quote': "引用",
    'Preview': "预览",
    'strong text': "粗体",
    'emphasized text': "强调",
    'heading text': "标题",
    'enter link description here': "输入链接说明",
    'Insert Hyperlink': "URL地址",
    'enter image description here': "输入图片说明",
    'Insert Image Hyperlink': "图片URL地址",
    'enter image title here': "在这里输入图片标题",
    'list text here': "这里是列表文本",
    'code text here': "这里输入代码",
    'quote here': "这里输入引用文本"
};
}(jQuery));

var $markdownText = $('#markdownText') ,
    $htmlText = $('#htmlText') ;

// 初始化markdown编辑器
// 不可更改的情况请直接给 textarea 加上 disabled 属性
var bootstrapMarkdown = $markdownText.markdown({
            resize : false ,
            language : 'zh' ,
            hiddenButtons : ['cmdPreview','cmdImage','cmdQuote'] ,
            onChange : function( e ) {
                $htmlText.html( markdownit.render( e.getContent() ) );
                markdownit.inlineStyles( $htmlText[0] )	;
            } ,
            additionalButtons : [
            [{
                    name: "groupCustom",
                    data: [{
                    name: "cmdNote",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "灰色注释",
                    icon: { 'glyph' : "glyphicon glyphicon-pencil" } ,
                    callback: function(e){
                        // Replace selection with some drinks
                        var chunk,
                            frontText , 
                            contentText ,
                            endText , 
                            cursor,
                            selected = e.getSelection() ;
                            
                        frontText = '::: note ' ;
                        contentText = '写注释' ;
                        endText     = '\n:::' ;

                        // Give random drink
                        chunk = frontText + contentText + endText ;

                        // transform selection and set the cursor into chunked text
                        e.replaceSelection(chunk) ;
                        cursor = selected.start + frontText.length ;
                        // Set the cursor
                        e.setSelection(cursor,cursor+contentText.length) ;
                    }
                    },{
                    name: "cmdWireframe",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "线框注释",
                    icon: { 'glyph' : "glyphicon glyphicon-bookmark" } ,
                    callback: function(e){
                        // Replace selection with some drinks
                        var chunk,
                            frontText , 
                            contentText ,
                            endText , 
                            cursor,
                            selected = e.getSelection() ;
                            
                        frontText = '::: wireframe ' ;
                        contentText = '线框注释' ;
                        endText     = '\n:::' ;

                        // Give random drink
                        chunk = frontText + contentText + endText ;

                        // transform selection and set the cursor into chunked text
                        e.replaceSelection(chunk) ;
                        cursor = selected.start + frontText.length ;
                        // Set the cursor
                        e.setSelection(cursor,cursor+contentText.length) ;
                    }
                    },{
                    name: "cmdIntent",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "带缩进的文本区域",
                    icon: { 'glyph' : "glyphicon glyphicon-indent-left" } ,
                    callback: function(e){
                        // Replace selection with some drinks
                        var chunk,
                            frontText , 
                            contentText ,
                            endText , 
                            cursor,
                            selected = e.getSelection() ;
                            
                        frontText = '::: intent <' ;
                        contentText = '\n带缩进的文本区域' ;
                        endText     = '\n:::' ;

                        // Give random drink
                        chunk = frontText + contentText + endText ;

                        // transform selection and set the cursor into chunked text
                        e.replaceSelection(chunk) ;
                        cursor = selected.start + frontText.length ;
                        // Set the cursor
                        e.setSelection(cursor,cursor+contentText.length) ;
                    }
                    },{
                    name: "cmdImg",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "居中带注释的图片容器",
                    icon: { 'glyph' : "glyphicon glyphicon-picture" } ,
                    callback: function(e){
                        // 给一个弹框写图片链接
                        var imgsrc = prompt("请输入图片地址","https://");
                        if ( imgsrc!= null && imgsrc !="" ){				              	
                            // Replace selection with some drinks
                            var chunk,
                                frontText , 
                                contentText ,
                                endText , 
                                cursor,
                                selected = e.getSelection() ;
                                
                            frontText = '::: img ![' ;
                            contentText = '请输入图片描述' ;
                            endText     = ']('+ imgsrc +')\n:::' ;

                            // Give random drink
                            chunk = frontText + contentText + endText ;

                            // transform selection and set the cursor into chunked text
                            e.replaceSelection(chunk) ;
                            cursor = selected.start + frontText.length ;
                            // Set the cursor
                            e.setSelection(cursor,cursor+contentText.length) ;
                        }
                    }
                    },{
                    name: "cmdBlockquote",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "引用容器",
                    icon: { 'glyph' : "glyphicon glyphicon-comment" } ,
                    callback: function(e){
                        // Replace selection with some drinks
                        var chunk,
                                frontText , 
                                contentText ,
                                endText , 
                            cursor,
                            selected = e.getSelection() ;
                            
                        frontText = '::: img [' ;
                        contentText = '请输入图片描述' ;
                        endText     = ']('+ imgsrc +')\n:::' ;

                        // Give random drink
                        chunk = frontText + contentText + endText ;

                        // transform selection and set the cursor into chunked text
                        e.replaceSelection(chunk) ;
                        cursor = selected.start + frontText.length ;
                        // Set the cursor
                        e.setSelection(cursor,cursor+contentText.length) ;
                    }
                    }]
            }]
            ]
        })


// 让容器等高，预览跟随编辑器滚动
$htmlText.css( {
    'height': $markdownText.outerHeight() + 'px' ,
    'overflow' : 'auto' , 
    'margin-top' : $markdownText.siblings('.md-header').outerHeight() + 'px' ,
});

$markdownText.scroll(function(e){
    $htmlText.scrollTop( e.currentTarget.scrollTop );
})


// 初始化
if ( $markdownText.val() ) {
    $htmlText.html( markdownit.render( $markdownText.val() ) );	
    markdownit.inlineStyles( $htmlText[0] )	;		
}



