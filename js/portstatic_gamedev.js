/** STATIC CONTENT LINKAGE */
// Include all content pages here, which can be loaded dynamically
const content_gamedev =
    [
        {hash: 'portfolio', file: "content/portprojects.html", navClass: 'nav-portfolio', default: true, showBack: false, postFunc: 'postLoadProjects_gamedev'},
        {hash: 'about',file: "content/portabout.html", navClass: 'nav-about', default: false, showBack: false, postFunc: ''},
        {hash: 'project-inari', file: "content/portproject_inari.html", navClass: '', default: false, showBack: true, postFunc: ''},
        {hash: 'project-meruui', file: "content/portproject_meruui.html", navClass: '', default: false, showBack: true, postFunc: ''},
        {hash: 'project-dlb', file: "content/portproject_dlb.html", navClass: '', default: false, showBack: true, postFunc: ''},
        {hash: 'project-anrebirth', file: "content/portproject_anrebirth.html", navClass: '', default: false, showBack: true, postFunc: ''},
        {hash: 'project-uetools1', file: "content/portproject_uetools1.html", navClass: '', default: false, showBack: true, postFunc: ''}
    ];

/** PROJECT ITEMS LIST */
// Add new project pages below. Display order will be last to first item.
const projects_gamedev =
    [
        {
            label: "Inari",
            description: "Third-Person adventure game prototype developed in Unity Engine and C#.",
            image: "assets/img/inari_thumbnail_v2.jpg",
            hash: "project-inari",
            year: "2018"
        },
        {
            label: "Meruui",
            description: "Third-Person adventure game prototype developed in Unreal Engine 4 and Blueprints.",
            image: "assets/img/meruui-thumbnail.jpg",
            hash: "project-meruui",
            year: "2019"
        },
        {
            label: "Der letzte Bus",
            description: "Web-based, playable 2D experience developed in HTML, CSS, Javascript and PHP.",
            image: "assets/img/dlb-thumbnail.jpg",
            hash: "project-dlb",
            year: "2020"
        },
        {
            label: "2446 - Anthropocene Rebirth",
            description: "Online multiplayer-based realtime tactics game prototype made in Unreal Engine 4, C++ and Blueprints.",
            image: "assets/img/anrebirth-thumbnail.jpg",
            hash: "project-anrebirth",
            year: "2021"
        },
        {
            label: "Unreal Engine 4 Engine Tools",
            description: "Custom Toolset for Unreal Engine Editor implemented in C++ and Blueprints.",
            image: "assets/img/uetools1-thumbnail.jpg",
            hash: "project-uetools1",
            year: "2022"
        }
    ];

/* Content Post-load callbacks */
function postLoadProjects_gamedev() {
    createProjectItems(projects_gamedev);
}