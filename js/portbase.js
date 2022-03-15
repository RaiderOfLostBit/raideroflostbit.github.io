/** STATIC CONTENT LINKAGE */
// Include all content pages here, which can be loaded dynamically
const contentLinks =
    [{file: "portprojects.html", hash: 'portfolio', navClass: 'nav-portfolio', default: true, showBack: false, postFunc: 'postLoadProjects'},
    {file: "portabout.html", hash: 'about', navClass: 'nav-about', default: false, showBack: false, postFunc: ''}];

/** GLOBAL VARS */
// Static
const loadingScreenFadeTime = 300;

// Dynamic
let currentContent;
let prevContent;
let xhttp;
let bIsLoading = false;
let bLoadingScreen = false;

/** INITIAL CODE */
document.addEventListener("DOMContentLoaded", function() {
    //The first argument are the elements to which the plugin shall be initialized
    //The second argument has to be at least a empty object or a object with your desired options
    OverlayScrollbars(document.querySelectorAll("body"), { });
});

window.addEventListener('resize', setInnerBodyMinHeight);
window.addEventListener('load', setInnerBodyMinHeight);
window.addEventListener('load', loadDefaultContent);

/** BASE FUNCTIONS */
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
    let defaultContent;

    for(let i=0; i < contentLinks.length; i++)
    {
        if(contentLinks[i].default)
        {
            defaultContent = contentLinks[i].file;
            break;
        }
    }

    if(defaultContent)
    {
        loadContent(defaultContent);
    }
}

/* Dynamically includes content into a page. */
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

            // set the content we are currently displaying
            prevContent = currentContent;

            let bFound = false;
            for(let i=0; i < contentLinks.length; i++)
            {
                if(contentLinks[i].file === filename)
                {
                    currentContent = contentLinks[i];
                    bFound = true;
                    break;
                }
            }

            // Error if content is not defined
            if(!bFound)
            {
                console.error("Requested content has no static content linkage! Requested content file: '" + filename + "'");
            }

            // update the page url
            const siteURL = window.location.href.split('#')[0];
            window.location.href = siteURL + "#" + currentContent.hash;

            // Adjust footer
            setInnerBodyMinHeight();

            // Execute content based site updates
            updateActiveTab();
            updateShowBack();

            // Execute Post-Function if set
            if(currentContent.postFunc && currentContent.postFunc !== '')
            {
                callFunctionByName(currentContent.postFunc, window);
            }

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
    loadingEl.style.animation = "loading_fade_in " + loadingScreenFadeTime + "ms forwards";

    bLoadingScreen = true;

    window.setTimeout(function () {
        loadingEl.style.animation = "";
    }, loadingScreenFadeTime);

    return loadingScreenFadeTime;
}

function removeLoadingOverlay() {
    let loadingEl = document.getElementById('inner_body_loading');
    loadingEl.style.animation = "loading_fade_out " + loadingScreenFadeTime + "ms forwards";

    bLoadingScreen = false;

    window.setTimeout(function () {
        loadingEl.style.animation = "";
        loadingEl.style.display = "none";
    }, loadingScreenFadeTime);

    return loadingScreenFadeTime;
}

function updateActiveTab() {
    // First remove all active elements
    let elements = document.getElementsByClassName('nav-button');
    for(let i = 0; i < elements.length; i++)
    {
        let element = elements[i];
        element.classList.remove('active');
    }

    // Find matching nav ID
    let navClass;
    for(let h = 0; h < contentLinks.length; h++)
    {
        if(contentLinks[h].file === currentContent.file)
        {
            navClass = contentLinks[h].navClass;
            break;
        }
    }

    if(navClass && navClass !== "")
    {
        let navElements = document.getElementsByClassName(navClass);
        if(navElements.length > 0)
        {
            for(let j = 0; j < navElements.length; j++) {
                navElements[j].classList.add('active');
            }
        }
    }
}

function updateShowBack() {
    if(currentContent && prevContent)
    {
        let backEl = document.getElementById('site_back')
        backEl.style.display = currentContent.showBack ? "block" : "none";
    }
}

function navigateBack() {
    if(prevContent)
    {
        loadContent(prevContent.file);
    }
}

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