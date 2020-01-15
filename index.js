#! /usr/bin/env node
const pandoc = require('pandoc-filter');
const Viz = require('viz.js');
const fs = require('fs');

function viz(type, value, format, meta) {
    if (type != "CodeBlock") return null;
    let [[id, [clazz], [attrs]], content] = value;
    let graphviz_engines = ["circo",
        "dot",
        "fdp",
        "neato",
        "osage",
        "twopi"];
    let isGraphviz = false;
    for (e of graphviz_engines) {
        if (clazz === e) {
            isGraphviz = true;
            break;
        }
    }
    if (!isGraphviz) return null;
    

    let out = Viz(content, { engine: clazz });
    let img = "data:image/svg+xml;base64," + Buffer.from(out).toString("base64");
    // console.log(tmpfileObj.name);
    // fs.writeFileSync('1.svg', out);
    return pandoc.Para([pandoc.Image([id, [], []], [pandoc.Str("fig")], [img, ""])]);
}

pandoc.toJSONFilter(viz)
