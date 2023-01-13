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
                createProjectItem(itemAnchorEl, items[i]);
            }
        }
    }
}

/* Creates a new project item, based on the input. */
function createProjectItem(/*HTMLElement*/anchorElement, item) {
    if(anchorElement && item)
    {
        // Create the elements
        let columnEl = document.createElement('div');
        columnEl.classList.add('col-12', 'col-md-6', 'col-lg-6', 'col-xl-4');

        let itemEl = document.createElement('div');
        itemEl.classList.add('album-grid-item'/*, 'shadow-sm'*/);
        itemEl.style.backgroundImage = 'url(' + item.image + ')';

        let hyperlinkEl = document.createElement('a');
        hyperlinkEl.setAttribute('onclick', "changeContent('" + item.hash + "');");

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