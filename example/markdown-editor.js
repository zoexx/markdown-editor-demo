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

var bootstrapMarkdown = {
    getEditor : function ( source , renderTar , opt ){
        var $source = $(source) ;
        var $renderTar = $(renderTar) ;
        var config = this.getConfig( $renderTar , opt );


        if ( typeof uploader != 'undefined' && uploader && uploader.upload_list ){        
            // 创建一个上传图片的隐形按钮 以及上传的列表
            var uploadBtn = document.createElement('button');
            uploadBtn.hidden = true ;
            uploadBtn.type = 'button' ;
            uploadBtn.id = 'markdownUploadBtn' + (+new Date()) ;
            $source.after( uploadBtn );
            // 多图上传
            uploader.get_uploader({
                filePath : uploader.get_filePath('markdown'),
                configUploader : function(config){
                    config.pick.id = '#' + uploadBtn.id ;
                    return config ;
                },
                fileQueued : function(file , upload){
                    var value = $source.val() ;
                    value = value.replace( "============ start upload ============" , "============ upload file "+ file.id +"============ \n ============ start upload ============");
                    $source.val( value ) ;
                },
                onProgress : function(file , percentage , uploader){
                    // 文件上传过程中创建进度条实时显示。
                    var str = Math.round(percentage * 100) + '%',
                      value = $source.val() ,
                      reg   = new RegExp( file.id + '==\\d{0,3}\\%{0,1}==' );
                    
                    value = value.replace( reg , file.id +"=="+ str +"==");
                    $source.val( value ) ;
                },
                success : function(file ,ret){
                    // 文件上传成功
                    console.log( file );
                    var str = '\n::: img !['+ file.name +'](' + uploader.upurl + '/' + ret.key + '-c.thb.wm)\n:::\n',
                      value = $source.val() ,
                      reg   = new RegExp( "============ upload file "+ file.id + "==\\d{0,3}\\%{0,1}==========" );

                    value = value.replace( reg , str );
                    $source.val( value ) ;
                },
                complete : function( file , upload ){
                    // 如果队列中的文件已经传完 删掉开始上传的字符串
                    var stat = upload.getStats();
                    console.log( stat.progressNum );
                    if ( stat.progressNum  == 0 ){
                        var value = $source.val() ;
                        value = value.replace('============ start upload ============','');
                        $source.val( value ) ;
                    }
                }
            });
            config.additionalButtons[0][0].data.push({
                    name: "cmdUploadImg",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "上传图片",
                    icon: { 'glyph' : "glyphicon glyphicon-cloud-upload" } ,
                    callback: function(e){
                        var chunk = '\n ============ start upload ============ \n' ;
                        e.replaceSelection(chunk) ;
                        uploadBtn.querySelector('label').click();
                    }
                })
        }

        var editor = $source.markdown( config );
        // 让容器等高，预览跟随编辑器滚动
        $renderTar.css( {
            'height': $source.outerHeight() + 'px' ,
            'overflow' : 'auto' , 
            'margin-top' : $source.siblings('.md-header').outerHeight() + 'px' ,
        });

        $source.scroll(function(e){
            $renderTar.scrollTop( e.currentTarget.scrollTop );
        })


        // 初始化
        if ( $source.val() ) {
            $renderTar.html( markdownit.render( $source.val() ) ); 
            markdownit.inlineStyles( $renderTar[0] ) ;       
        }

        return editor ;
    } ,
    getConfig : function( $htmlText , opt  ){
        
        var config = {
            resize : false ,
            language : 'zh' ,
            hiddenButtons : ['cmdPreview','cmdImage','cmdQuote','cmdCode'] ,
            onChange : function( e ) {
                $htmlText.html( markdownit.render( e.getContent() ) );
                markdownit.inlineStyles( $htmlText[0] ) ;
            } ,
            additionalButtons : [
            [{
                    name: "groupCustom",
                    data: [{
                    name: "cmdIntent",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "首行缩进文本",
                    icon: { 'glyph' : "glyphicon glyphicon-indent-left" } ,
                    callback: function(e){
                        // Replace selection with some drinks
                        var chunk,
                            frontText , 
                            contentText ,
                            endText , 
                            cursor,
                            selected = e.getSelection() ;
                            
                        frontText = '\n::: intent <' ;
                        contentText = '\n首行缩进文本' ;
                        endText     = '\n:::\n' ;

                        // Give random drink
                        chunk = frontText + contentText + endText ;

                        // transform selection and set the cursor into chunked text
                        e.replaceSelection(chunk) ;
                        cursor = selected.start + frontText.length + 1 ;
                        // Set the cursor
                        e.setSelection(cursor,cursor+contentText.length - 1) ;
                    }
                    },{
                    name: "cmdMark",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "黄色强调",
                    icon: { 'glyph' : "glyphicon glyphicon-flag" } ,
                    callback: function(e){
                        // Replace selection with some drinks
                        var chunk, 
                            cursor,
                            selected = e.getSelection() ;
                            
                        // Give random drink
                        selected.text ? chunk = '==' + selected.text + '==' : chunk = '==mark==' ;

                        // transform selection and set the cursor into chunked text
                        e.replaceSelection(chunk) ;
                        cursor = selected.start + 2 ;
                        // Set the cursor
                        e.setSelection(cursor,cursor+chunk.length - 4 ) ;
                    }
                    },{
                    name: "cmdNote",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "小灰字注释",
                    icon: { 'glyph' : "glyphicon glyphicon-pencil" } ,
                    callback: function(e){
                        // Replace selection with some drinks
                        var chunk,
                            frontText , 
                            contentText ,
                            endText , 
                            cursor,
                            selected = e.getSelection() ;
                            
                        frontText = '\n::: note ' ;
                        contentText = '写注释' ;
                        endText     = '\n:::\n' ;

                        // Give random drink
                        chunk = frontText + contentText + endText ;

                        // transform selection and set the cursor into chunked text
                        e.replaceSelection(chunk) ;
                        cursor = selected.start + frontText.length;
                        // Set the cursor
                        e.setSelection(cursor,cursor+contentText.length) ;
                    }
                    },{
                    name: "cmdBlockquote",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "引用文字",
                    icon: { 'glyph' : "glyphicon glyphicon-comment" } ,
                    callback: function(e){
                        // Replace selection with some drinks
                        var chunk,
                                frontText , 
                                contentText ,
                                endText , 
                            cursor,
                            selected = e.getSelection() ;
                            
                        frontText = '\n::: blockquote <' ;
                        contentText = '\n引用' ;
                        endText     = '\n:::' ;

                        // Give random drink
                        chunk = frontText + contentText + endText ;

                        // transform selection and set the cursor into chunked text
                        e.replaceSelection(chunk) ;
                        cursor = selected.start + frontText.length + 1 ;
                        // Set the cursor
                        e.setSelection(cursor,cursor+contentText.length - 1) ;
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
                            
                        frontText = '\n::: wireframe ' ;
                        contentText = '线框注释' ;
                        endText     = '\n:::\n' ;

                        // Give random drink
                        chunk = frontText + contentText + endText ;

                        // transform selection and set the cursor into chunked text
                        e.replaceSelection(chunk) ;
                        cursor = selected.start + frontText.length ;
                        // Set the cursor
                        e.setSelection(cursor,cursor+contentText.length ) ;
                    }
                    },{
                    name: "cmdImg",
                    toggle: true, // this param only take effect if you load bootstrap.js
                    title: "图片链接",
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
                    }]
            }]
            ]
        } ;
        return $.extend( config , opt , false );
    }
}