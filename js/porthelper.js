/** HELPER FUNCTIONS */
/* Returns the current height and width of the viewport */
function getViewportSize() {
    const width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientHeight;

    const height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    return { width: width, height: height };
}

/* Calls and runs a function by name. https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string */
function callFunctionByName(functionName, context /*, args */) {
    let args = Array.prototype.slice.call(arguments, 2);
    let namespaces = functionName.split(".");
    let func = namespaces.pop();

    for (let i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

/* Custom location (URL) change detection. https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript */
history.pushState = ( f => function pushState(){
    let ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.pushState);

history.replaceState = ( f => function replaceState(){
    let ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.replaceState);

window.addEventListener('popstate',()=>{
    window.dispatchEvent(new Event('locationchange'))
});
