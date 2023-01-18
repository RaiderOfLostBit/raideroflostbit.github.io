/** STATIC CONTENT LINKAGE */
// Include all content pages here, which can be loaded dynamically
const content_gamedev =
    [
        {hash: 'portfolio', file: "content/portprojects.html", navClass: 'nav-portfolio', default: true, showBack: false, postFunc: 'postLoadProjects_gamedev'},
        {hash: 'about',file: "content/portabout.html", navClass: 'nav-about', default: false, showBack: false, postFunc: 'postLoadAbout'},
        {hash: 'project-inari', file: "content/portproject_inari.html", navClass: '', default: false, showBack: true, postFunc: 'postLoadProject'},
        {hash: 'project-meruui', file: "content/portproject_meruui.html", navClass: '', default: false, showBack: true, postFunc: 'postLoadProject'},
        {hash: 'project-dlb', file: "content/portproject_dlb.html", navClass: '', default: false, showBack: true, postFunc: 'postLoadProject'},
        {hash: 'project-anrebirth', file: "content/portproject_anrebirth.html", navClass: '', default: false, showBack: true, postFunc: 'postLoadProject'},
        {hash: 'project-rvtpainting', file: "content/portproject_rvtpainting.html", navClass: '', default: false, showBack: true, postFunc: 'postLoadProject'},
        {hash: 'project-instancescatter', file: "content/portproject_instancescatter.html", navClass: '', default: false, showBack: true, postFunc: 'postLoadProject'},
        {hash: 'project-rlc', file: "content/portproject_rlc.html", navClass: '', default: false, showBack: true, postFunc: 'postLoadProject'},
        {hash: 'project-modularui', file: "content/portproject_modularui.html", navClass: '', default: false, showBack: true, postFunc: 'postLoadProject'},
        {hash: 'project-lyraee', file: "content/portproject_lyraee.html", navClass: '', default: false, showBack: true, postFunc: 'postLoadProject'},
    ];

/** PROJECT ITEMS LIST */
// Add new project pages below. Display order will be last to first item.
const projects_gamedev =
    [
        {
            hash: "project-inari",
            tags: ["Unity", "C#", "Game Prototype"],
            card: {
                label: "Inari",
                description: "Third-Person adventure game prototype developed in Unity Engine and C#",
                image: "assets/img/inari_thumbnail_v2.jpg",
                year: "2018",
            },
            page: {
                title: "Inari",
                image: "assets/img/inari-title-small.jpg",
            }
        },
        {
            hash: "project-meruui",
            tags: ["Unreal Engine 4", "Blueprints", "Game Prototype"],
            card: {
                label: "Meruui",
                description: "Third-Person adventure game prototype developed in Unreal Engine 4 and Blueprints",
                image: "assets/img/meruui-thumbnail.jpg",
                year: "2019",
            },
            page: {
                title: "Meruui",
                image: "assets/img/meruui-title-small.jpg",
            }
        },
        {
            hash: "project-dlb",
            tags: ["HTML", "CSS", "Javascript", "Web Experience"],
            card: {
                label: "Der letzte Bus",
                description: "Web-based, playable 2D experience developed in HTML, CSS, Javascript and PHP",
                image: "assets/img/dlb-thumbnail.jpg",
                year: "2020",
            },
            page: {
                title: "Der letzte Bus",
                image: "assets/img/dlb-title-small.jpg",
            }
        },
        {
            hash: "project-anrebirth",
            tags: ["Unreal Engine 4", "Multiplayer", "C++", "Blueprints", "Game Prototype"],
            card: {
                label: "2446 - Anthropocene Rebirth",
                description: "Online multiplayer-based realtime tactics game prototype made in Unreal Engine 4, C++ and Blueprints",
                image: "assets/img/anrebirth-thumbnail.jpg",
                year: "2021",
            },
            page: {
                title: "2446 - Anthropocene Rebirth",
                image: "assets/img/anrebirth-title-small.jpg",
            }
        },
        {
            hash: "project-rvtpainting",
            tags: ["Unreal Engine 5", "Unreal Engine 4", "C++", "Tool", "Materials"],
            card: {
                label: "RVT Painting Plugin",
                description: "Custom Toolset for Unreal Engine Editor implemented in C++ and Blueprints",
                image: "assets/img/uetools1-thumbnail.jpg",
                year: "2022"
            },
            page: {
                title: "RVT Painting Plugin",
                image: "assets/img/rvtpainting-title-small.jpg"
            }
        },
        {
            hash: "project-instancescatter",
            tags: ["Unreal Engine 5", "Unreal Engine 4", "C++", "Tool"],
            card: {
                label: "Instance Scatter Plugin",
                description: "Custom system to scatter mesh instances across defined level areas implemented in C++",
                image: "assets/img/uetools1-thumbnail.jpg",
                year: "2022"
            },
            page: {
                title: "Instance Scattering",
                image: "assets/img/instscatter-title-small.jpg",
            }
        },
        {
            hash: "project-rlc",
            tags: ["Unreal Engine 5", "Unreal Engine 4", "C++", "Materials"],
            card: {
                label: "Runtime Landscape Collision",
                description: "Deformation system for Unreal Engine Landscapes implemented in C++",
                image: "assets/img/uetools1-thumbnail.jpg",
                year: "2022"
            },
            page: {
                title: "Runtime Landscape Collision",
                image: "assets/img/instscatter-title-small.jpg",
            }
        },
        {
            hash: "project-modularui",
            tags: ["Unreal Engine 5", "User Interface", "Modular Gameplay", "C++", "Blueprints", "Materials"],
            card: {
                label: "Modular User Interface",
                description: "Modular approach to user interface implementation using the latest Unreal Engine 5 features",
                image: "assets/img/uetools1-thumbnail.jpg",
                year: "2022"
            },
            page: {
                title: "Modular User Interface",
                image: "assets/img/instscatter-title-small.jpg",
            }
        },
        {
            hash: "project-lyraee",
            tags: ["Unreal Engine 5", "C++", "Blueprints", "Modular Gameplay"],
            card: {
                label: "Lyra Experience Extensions",
                description: "Extension of the Lyra Experience System for a modular game mode implementation",
                image: "assets/img/uetools1-thumbnail.jpg",
                year: "2023"
            },
            page: {
                title: "Lyra Experience Extensions",
                image: "assets/img/instscatter-title-small.jpg",
            }
        }
    ];

/* Content Post-load callbacks */

/* Run in portfolio to create the project tiles. */
function postLoadProjects_gamedev(/*string*/hash) {
    createProjectItems(projects_gamedev);
}

function postLoadAbout(/*string*/hash) {
    const project_about = {
        page: {
            title: "Hello there!",
            image: "assets/img/instscatter-title-small.jpg",
        }
    }

    prepareProjectPage(project_about);
}

/* General function to run after loading a project page. */
function  postLoadProject(/*string*/hash) {
    prepareProjectPage(getProjectItem(hash, projects_gamedev));
}