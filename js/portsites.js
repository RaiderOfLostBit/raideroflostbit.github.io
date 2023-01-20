/* Creates multiple project items based on input. */
function createProjectItems(items) {
    if(items && items.length > 0)
    {
        let itemAnchorEl = document.getElementById('project_items');

        if(itemAnchorEl)
        {
            // Iterate the project items and create the elements
            for(let i = items.length - 1; i >= 0; i--)
            {
                if(items[i] && items[i].hash && items[i].hash !== "" && items[i].card)
                {
                    createProjectItem(itemAnchorEl, items[i].hash, items[i].card);
                }
            }
        }
    }
}

/* Creates a new project item, based on the input. */
function createProjectItem(/*HTMLElement*/anchorElement, /*string*/hash, item) {
    if(anchorElement && item)
    {
        // Create the elements
        let columnEl = document.createElement('div');
        columnEl.classList.add('col-12', 'col-md-6', 'col-lg-6', 'col-xl-4');

        let itemEl = document.createElement('div');
        itemEl.classList.add('album-grid-item');
        itemEl.style.backgroundImage = 'url(' + item.image + ')';

        let hyperlinkEl = document.createElement('a');
        hyperlinkEl.setAttribute('onclick', "changeContent('" + hash + "');");

        let overlayEl = document.createElement('div');
        overlayEl.classList.add('album-grid-item-overlay');

        let overlayBodyEl = document.createElement('div');
        overlayBodyEl.classList.add('album-grid-item-overlay-body');

        let overlayBodyLabelEl = document.createElement('div');
        overlayBodyLabelEl.classList.add('album-grid-item-overlay-name');
        overlayBodyLabelEl.innerHTML = item.label;

        let overlayBodyDescEl = document.createElement('div');
        overlayBodyDescEl.classList.add('album-grid-item-overlay-desc');
        overlayBodyDescEl.innerHTML = item.description;

        let overlayDateEl = document.createElement('div');
        overlayDateEl.classList.add('album-grid-item-overlay-date');
        overlayDateEl.innerHTML = item.year;

        // Assemble the elements
        overlayBodyEl.appendChild(overlayBodyLabelEl);
        overlayBodyEl.appendChild(overlayBodyDescEl);
        hyperlinkEl.appendChild(overlayEl);
        hyperlinkEl.appendChild(overlayBodyEl);
        hyperlinkEl.appendChild(overlayDateEl);
        itemEl.appendChild(hyperlinkEl);
        columnEl.appendChild(itemEl);

        anchorElement.appendChild(columnEl);
    }
}

/* Returns the definition item for a project. */
function getProjectItem(/*string*/hash, items) {
    if(!hash || hash === "" || !items || items.length === 0)
    {
        return null;
    }

    for(let i = 0; i < items.length; i++)
    {
        if(items[i].hash === hash)
        {
            return items[i];
        }
    }
}

/* Prepares a content site for display. */
function prepareProjectPage(item) {
    // Find and create the site background
    {
        let siteBackground = document.getElementById('site_background');
        if(siteBackground)
        {
            siteBackground.classList.add('position-absolute', 'h-100', 'w-100');
            siteBackground.style.pointerEvents = 'none';

            siteBackground.innerHTML = `
                <div class="container-lg h-100">
                    <div class="row justify-content-center h-100">
                        <div class="col-12 col-md-10 col-lg-8" style="background: #eeeeee; z-index: -1"></div>
                    </div>
                </div>
            `;
        }
    }

    if(item && item.page)
    {
        // Find and create the site header
        {
            let siteHeader = document.getElementById('site_header');
            if(siteHeader)
            {
                siteHeader.classList.add('content-section');

                let Tags = "";
                if(item.tags)
                {
                    // Create Tags
                    for(let i = 0; i < item.tags.length; i++)
                    {
                        Tags += `
                            <div class="col-auto">
                                <div class="tag-item tag-item-style-light">${item.tags[i]}</div>
                            </div>
                        `;
                    }
                }

                let titleStyleClass = "article-header-title-bright";
                if(item.page.title_color_invert)
                {
                    titleStyleClass = "article-header-title-dark";
                }

                // Assemble the header
                siteHeader.innerHTML = `
                <div class="container-lg">
                    <div class="row justify-content-center">
                        <div class="col-11 col-md-11 col-lg-9">
                            <div class="article-header-container">
                                <div class="article-header-overlay" style="background: 50% url('${item.page.image}'); background-size: cover;"></div>
                                <div class="article-header-overlay">
                                    <div class="container h-100">
                                        <div class="row h-100 justify-content-center align-items-center">
                                            <h2 class="${titleStyleClass}">${item.page.title}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-11 col-md-9 col-lg-7">
                            <div class="row gx-2 gy-2 mt-4">${Tags}</div>
                        </div>
                    </div>
                </div>
            `;
            }
        }
    }
}