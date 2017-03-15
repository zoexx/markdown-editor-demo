// markdown-it
var markdownit = require('markdown-it');
var markdownitContainer = require('markdown-it-container');
var markdownitMark = require('markdown-it-mark');
var markdownitIns = require('markdown-it-ins');
var markdownitAbbr = require('markdown-it-abbr');

var inlineStyles = require('./inline.css');



// 
// 配置 markdown-it 转换器 源代码中有大量注解 https://github.com/markdown-it/markdown-it
// 

var md = markdownit({
        html:         true,        // Enable HTML tags in source
        xhtmlOut:     false,        // Use '/' to close single tags (<br />)
        breaks:       true,         // Convert '\n' in paragraphs into <br>
        langPrefix:   'language-',  // CSS language prefix for fenced blocks
        linkify:      true,         // autoconvert URL-like texts to links
        typographer:  true,         // Enable smartypants and other sweet transforms
    }) ,

    // 自定义区块插件
    container = markdownitContainer ;


// <mark> 标记
md.use( markdownitMark );
// <ins> 插入文本
md.use( markdownitIns );
// <abbr> 缩写
md.use( markdownitAbbr );


// 自定义一个区块 https://github.com/markdown-it/markdown-it-container
// 灰色注释小字
md.use( container , 'note' , {

    validate: function(params) {
        return params.trim().match(/^note\s+(.*)$/);
    },

    render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^note\s+(.*)$/);

        if (tokens[idx].nesting === 1) {
            // opening tag
            return '<section class="note-section"><small>' + m[1] + '</small>\n';

        } else {
            // closing tag
            return '</section>\n';
        }
    }
});

// 线框注释
md.use( container , 'wireframe' , {

    validate: function(params) {
        return params.trim().match(/^wireframe\s+(.*)$/);
    },

    render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^wireframe\s+(.*)$/);

        if (tokens[idx].nesting === 1) {
            // opening tag
            return '<section class="wireframe-section"><article>' + m[1] + '</article>\n';

        } else {
            // closing tag
            return '</section>\n';
        }
    }
});

// 缩进
md.use( container , 'intent' , {

    validate: function(params) {
        return params.trim().match(/^intent\s+(.*)$/);
    },

    render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^intent\s+(.*)$/);

        if (tokens[idx].nesting === 1) {
            // opening tag
            return '<section class="intent-section">\n';

        } else {
            // closing tag
            return '</section>\n';
        }
    }
});

// 居中容器（图片）
md.use( container , 'img' , {

    validate: function(params) {
        return params.trim().match(/^img\s+(.*)$/);
    },

    render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^img\s+(.*)$/);

        if (tokens[idx].nesting === 1) {
            // opening tag
            // 需要取出alt属性作为注解
            var imgArrow = '<span style="width:0; height:0; border-width:10px 6px; border-style:solid; border-color:#ffffff #ffffff #0098F0 #ffffff;display:inline-block;"></span>  ' ;
            var imgAlt = m[1].match(/^\!\[(.*?)\]/)[1] ;

            return '<section class="img-section">'+ md.render( m[1] ) + ( imgAlt ? imgArrow + '<small>'+ imgAlt +'</small>' : '' ) +'\n';

        } else {
            // closing tag
            return '</section>\n';
        }
    }
});

// 引用容器
md.use( container , 'blockquote' , {

    validate: function(params) {
        return params.trim().match(/^blockquote\s+(.*)$/);
    },

    render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^blockquote\s+(.*)$/);

        if (tokens[idx].nesting === 1) {
            // opening tag
            return '<section class="blockquote-section"><div></div>\n';

        } else {
            // closing tag
            return '<div></div></section>\n';
        }
    }
});
console.log(inlineStyles);
// 把样式写到style中
md.inlineStyles = function( container ){
    for( var selector in inlineStyles ){
        var tar = container.querySelectorAll( selector ) ;
        if ( tar.length > 0 ){
            for( var i = tar.length ; i > 0 ; i-- ){
                var dom = tar[i-1];
                dom.style.cssText += inlineStyles[ selector ] ;
            }
        }
    }
}

window.markdownit = md ;