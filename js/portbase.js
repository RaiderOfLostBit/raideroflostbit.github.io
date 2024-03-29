let ControllerSingleton = null;
let ScrollSingleton = null;

/** PORTFOLIO CONTROLLER CLASS */
function PortfolioController(content) {
// Variables
    // Static
    const siteContent = content;
    const loadingScreenFadeTime = 300;

    // Dynamic
    let bLoading = false;
    let bLoadingScreen = false;
    let curHash;
    let loadHash;
    let ajaxRequest;
    let siteBackTopOffset;

// Private Functions
    /* Sets min-size of inner-body so footer is always on screen if not enough content on site. */
    let setInnerBodyMinHeight = function () {
        const viewportSize = getViewportSize();

        let headerEl = document.getElementById('header');
        let footerEl = document.getElementById('footer');
        let innerBodyEl = document.getElementById('site_body');

        const staticHeight = headerEl.clientHeight + footerEl.clientHeight;
        innerBodyEl.style.minHeight = viewportSize.height - staticHeight + "px";
    }

    /* Assigns the initial site back top offset value. */
    let setInitialSiteBackOffset = function () {
        siteBackTopOffset = document.getElementById('site_back').offsetTop;
    }

    /* Returns site content description by a specified hash. */
    let getContent = function (/*string*/hash) {
        if(!hash || hash === "" || !siteContent || siteContent.length === 0)
        {
            return null;
        }

        let foundContent;
        for(let i = 0; i < siteContent.length; i++)
        {
            if(siteContent[i].hash === hash)
            {
                foundContent = siteContent[i];
                break;
            }
        }

        return foundContent;
    }

    /* Changes the content location to the default one. */
    let getDefaultContentLocation = function () {
        let defaultHash;

        for(let i=0; i < siteContent.length; i++)
        {
            if(siteContent[i].default)
            {
                defaultHash = siteContent[i].hash;
                break;
            }
        }

        return defaultHash;
    }

    /* Triggers an Location change based on the given content hash. */
    let updateContentLinkage_Internal = function (hash) {
        if(!hash || hash === "" || hash === loadHash) {
            return;
        }

        // Check if we have a linkage with this hash
        let content = getContent(hash);

        // If found, change URL, which will trigger the Load
        if(content)
        {
            history.pushState({}, null, "#" + content.hash);
        }
    }

    /* Check if there are changes in content hash and invoke loading. */
    let triggerLoad = function () {
        // Get the new content hash
        curHash = window.location.hash.substring(1);

        // Find content based on the hash
        let content = getContent(curHash);

        // Check if content is valid, the loaded page is not the previous one and we are not loading
        if(content && content.hash !== loadHash && !bLoading)
        {
            loadContent(content);
        }
    }

    /* Loads the provided content. */
    let loadContent = function (content) {
        if(content && !bLoading)
        {
            // Set flag that we are loading and register previous hash
            bLoading = true;
            loadHash = content.hash;

            // Show the loading screen
            showLoadingOverlay();

            // Wait for its completion and call the AJAX load
            window.setTimeout(function () { ajaxLoad(content); }, loadingScreenFadeTime);
        }
    }

    /* Performs an ajax load request */
    let ajaxLoad = function (content) {
        // Do nothing if no valid content is provided
        if(!content) {
            return;
        }

        // If an request is currently running, abort it.
        if(ajaxRequest) {
            ajaxRequest.abort();
        }

        // Make a new request for content
        ajaxRequest = new XMLHttpRequest();

        // Assign function to run after completion
        ajaxRequest.onloadend = function () {
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

                // Execute Post-Load
                postAjaxLoad();

                // Get content
                let loadContent = getContent(loadHash);

                // Execute Post-Function if set
                if(loadContent.postFunc && loadContent.postFunc !== '')
                {
                    callFunctionByName(loadContent.postFunc, window, loadContent.hash);
                }

                // Remove the loading overlay
                removeLoadingOverlay();

                // Wait for anim completion and reset loading
                window.setTimeout(function () {
                    bLoading = false;
                    triggerLoad();
                    }, loadingScreenFadeTime);
            }
        }

        // Send the request
        ajaxRequest.open("GET", content.file, true);
        ajaxRequest.send();
    }

    /* Input functions to execute after the ajax load has completed. */
    let postAjaxLoad = function () {
        // Adjust footer
        setInnerBodyMinHeight();

        // Execute content based site updates
        updateActiveTab();
        updateShowBack(loadHash);

        // Dispatch an global event
        window.dispatchEvent(new Event('onPostAjaxLoad'));
    }

    /* Shows the loading element. */
    let showLoadingOverlay = function () {
        let loadingEl = document.getElementById('inner_body_loading');
        loadingEl.style.display = "block";
        loadingEl.style.animation = "loading_fade_in " + loadingScreenFadeTime + "ms forwards";

        bLoadingScreen = true;

        window.setTimeout(function () {
            loadingEl.style.animation = "";
        }, loadingScreenFadeTime);
    }

    /* Hides the loading element. */
    let removeLoadingOverlay = function () {
        let loadingEl = document.getElementById('inner_body_loading');
        loadingEl.style.animation = "loading_fade_out " + loadingScreenFadeTime + "ms forwards";

        bLoadingScreen = false;

        window.setTimeout(function () {
            loadingEl.style.animation = "";
            loadingEl.style.display = "none";
        }, loadingScreenFadeTime);
    }

    /* Sets the current active tab in the navbar. */
    let updateActiveTab = function () {
        // First remove all active elements
        let elements = document.getElementsByClassName('nav-button');
        for(let i = 0; i < elements.length; i++)
        {
            let element = elements[i];
            element.classList.remove('active');
        }

        // Find matching nav ID
        let navClass;
        for(let h = 0; h < siteContent.length; h++)
        {
            if(siteContent[h].hash === loadHash)
            {
                navClass = siteContent[h].navClass;
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

    /* Displays or removes the back button. */
    let updateShowBack = function (/*string*/hash) {
        let content = getContent(hash);

        if(content)
        {
            let backEl = document.getElementById('site_back')
            if(content.showBack)
            {
                backEl.classList.remove('site-back-hidden');
            }
            else
            {
                backEl.classList.add('site-back-hidden');
            }
        }
    }

    /* Updates the sticky site back button. */
    let updateStickySiteBack = function () {
        if(ScrollSingleton)
        {
            let siteBack = document.getElementById('site_back');
            let scrollInfo = ScrollSingleton.scroll();

            if (scrollInfo.position.y > siteBackTopOffset)
            {
                siteBack.classList.add("site-back-sticky");
            }
            else
            {
                siteBack.classList.remove("site-back-sticky");
            }
        }
    }

// Public Functions
    this.onSiteResize = function () {
        setInnerBodyMinHeight();
    }

    this.onSiteLoad = function () {
        setInnerBodyMinHeight();
        setInitialSiteBackOffset();

        let defaultHash = getDefaultContentLocation();
        if(defaultHash)
        {
            updateShowBack(defaultHash);
            updateContentLinkage_Internal(defaultHash);
        }
    }

    this.onLocationChanged = function () {
        triggerLoad();
    }

    this.updateContentLinkage = function (/*string*/hash) {
        updateContentLinkage_Internal(hash);
    }

    this.onSiteScroll = function () {
        updateStickySiteBack();
    }

// Constructor
    window.addEventListener('resize', this.onSiteResize);
    window.addEventListener('load', this.onSiteLoad);
    window.addEventListener('locationchange', this.onLocationChanged);
}

/** GLOBAL FUNCTIONS */
function createPortfolioController(content) {
    ControllerSingleton = new PortfolioController(content);
    return /*PortfolioController*/ControllerSingleton;
}

function changeContent(/*string*/hash) {
    if(ControllerSingleton && hash && hash !== "")
    {
        ControllerSingleton.updateContentLinkage(hash);
    }
}

function createScrollInstance() {
    document.addEventListener("DOMContentLoaded", function() {
        // The first argument are the elements to which the plugin shall be initialized
        // The second argument has to be at least a empty object or a object with your desired options
        ScrollSingleton = OverlayScrollbars(document.body, {
            callbacks: {
                onScroll: function (event) {
                    if(ControllerSingleton)
                    {
                        ControllerSingleton.onSiteScroll();
                    }
                }
            }
        });

        // Scroll to top after ajax load has completed
        window.addEventListener('onPostAjaxLoad', function () {
            if(ScrollSingleton)
            {
                ScrollSingleton.scroll({ y: "0%" }, 300);
            }
        });
    });
}