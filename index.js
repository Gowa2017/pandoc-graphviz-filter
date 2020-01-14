#! /usr/bin/env node
const pandoc=require('pandoc-filter');
const Viz = require('viz.js');

function viz(type, value, format,meta){
    if (type != "CodeBlock") return null;
    let [[id,[clazz],[attrs]],content] = value;
    let graphviz_engines = ["circo",
                            "dot",
                            "fdp",
                            "neato",
                            "osage",
                            "twopi"];
    let isGraphviz = false;
    for( e of graphviz_engines){
        if( clazz === e){
            isGraphviz = true;
            break;
        }
    }
    if(!isGraphviz) return null;
    
    let out = Viz(content,{engine:clazz});
    let img = "data:image/svg+xml;base64," + new Buffer(out).toString("base64");
    return pandoc.Para([pandoc.Image([id,[],[]],[pandoc.Str("fig")],[img,""])]);
}

pandoc.toJSONFilter(viz)
