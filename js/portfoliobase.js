/** Code run on site load */
let xhttp;
let bIsLoading = false;
let bLoadingScreen = false;

document.addEventListener("DOMContentLoaded", function() {
    //The first argument are the elements to which the plugin shall be initialized
    //The second argument has to be at least a empty object or a object with your desired options
    OverlayScrollbars(document.querySelectorAll("body"), { });
});

window.addEventListener('resize', setInnerBodyMinHeight);
window.addEventListener('load', setInnerBodyMinHeight);
window.addEventListener('load', loadDefaultContent);

/** Page Functions */

/* Sets min-size of inner-body so footer is always on screen if not enough content on site. */
function setInnerBodyMinHeight() {
    const viewportSize = getViewportSize();

    let headerEl = document.getElementById('header');
    let footerEl = document.getElementById('footer');
    let innerBodyEl = document.getElementById('site_body');

    const staticHeight = headerEl.clientHeight + footerEl.clientHeight;
    innerBodyEl.style.minHeight = viewportSize.height - staticHeight + "px";
}

function loadDefaultContent() {
    loadContent('portprojects.html');
}

/* Dynamically includes content into a page. https://www.w3schools.com/howto/howto_html_include.asp */
function loadContent(filename) {
    // Do not accept loading attempts until we are finished
    if(bIsLoading)
    {
        return;
    }

    if(filename)
    {
        // Set that we are loading
        bIsLoading = true;

        // Show the loading screen
        const animDuration = showLoadingOverlay();

        // Wait for the anim completion and execute the ajax request
        window.setTimeout(function () { loadContentAjaxInternal(filename); }, animDuration);
    }
}

function loadContentAjaxInternal(filename) {
    // If an xhttp request is currently running, abort it.
    if(xhttp)
    {
        xhttp.abort();
    }

    // Make a new request for content
    xhttp = new XMLHttpRequest();

    // Assign function to run after completion
    xhttp.onloadend = function () {
        let element;
        element = document.getElementById('inner_body');

        if(this.readyState === 4) {
            if(this.status === 200) {
                element.innerHTML = this.responseText;
            }
            else if(this.status === 404) {
                element.innerHTML = "Page not found.";
            }
            else {
                element.innerHTML = "An Error occurred while loading the page content.";
            }

            // Adjust footer
            setInnerBodyMinHeight();

            // Check if we have to change the active tab

            // Check if we have to show the additional back button

            // Remove the loading overlay
            const animDuration = removeLoadingOverlay();

            // Wait for anim completion and reset loading
            window.setTimeout(function () { bIsLoading = false; }, animDuration);
        }
    }

    // Send the request
    xhttp.open("GET", filename, true);
    xhttp.send();
}

function showLoadingOverlay() {
    let loadingEl = document.getElementById('inner_body_loading');

    loadingEl.style.display = "block";
    // Play Animation

    bLoadingScreen = true;

    const animDuration = 300;
    return animDuration;
}

function removeLoadingOverlay() {
    let loadingEl = document.getElementById('inner_body_loading');

    loadingEl.style.display = "none";
    // Play Fade Out Animation

    bLoadingScreen = false;

    const animDuration = 300;
    return animDuration;
}

/** Helper Functions */

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