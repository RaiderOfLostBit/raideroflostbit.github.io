/** STATIC CONTENT LINKAGE */
// Include all content pages here, which can be loaded dynamically
const content_gamedev =
    [
        {hash: 'portfolio', file: "content/portprojects.html", navClass: 'nav-portfolio', default: true, showBack: false, postFunc: 'postLoadProjects_gamedev'},
        {hash: 'about',file: "content/portabout.html", navClass: 'nav-about', default: false, showBack: false, postFunc: ''},
        {hash: 'project-design', file: "content/portproject_design.html", navClass: '', default: false, showBack: true, postFunc: ''}
    ];

/** PROJECT ITEMS LIST */
// Add new project pages below other items to control order
const projects_gamedev =
    [
        {
            label: "My Test Project",
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
            image: "assets/img/grid-placeholder.jpg",
            hash: "project-design",
            year: "2022"
        }
    ];

/* Content Post-load callbacks */
function postLoadProjects_gamedev() {
    createProjectItems(projects_gamedev);
}