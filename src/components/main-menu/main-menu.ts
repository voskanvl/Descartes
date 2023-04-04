export default function switchSubmenu() {
    const TRIGGER_THRESHOLD = 150;

    const mainMenuItems = [...document.querySelectorAll<HTMLElement>(".main-menu__item")];
    const mainSubmenus = [...document.querySelectorAll<HTMLElement>(".main-menu__submenu")];
    const mainMenuList = document.querySelector<HTMLElement>(".main-menu__list");
    const mainMenu = document.querySelector<HTMLElement>(".main-menu");

    const MenuSubmenuArray = mainMenuItems
        .map(e => {
            const submenu = mainSubmenus.find(v => e.dataset.id === v.dataset.id)!;
            if (e.dataset.id === undefined)
                return {
                    id: null,
                    menu: null,
                    submenu: null,
                };
            return {
                id: e.dataset.id,
                menu: e,
                submenu,
            };
        })
        .filter(e => e !== undefined);

    if (!MenuSubmenuArray || !MenuSubmenuArray.length)
        throw Error("проблемы с сопоставлением  .main-menu__item .main-menu__submenu");

    type MenuSubmenuType = Record<string, { menu: HTMLElement; submenu: HTMLElement }>;

    let MenuSubmenuMap: MenuSubmenuType | {} = {};

    for (const { id, menu, submenu } of MenuSubmenuArray) {
        if (!id || !menu || !submenu) continue;
        if (!MenuSubmenuMap) {
            MenuSubmenuMap = { [id]: { menu, submenu } };
        } else {
            MenuSubmenuMap = { ...MenuSubmenuMap, [id]: { menu, submenu } };
        }
    }

    const isMenuSubmenuType = (x: MenuSubmenuType): x is MenuSubmenuType => {
        if (
            Object.keys(x).length > 0 &&
            "menu" in Object.values(x)[0] &&
            "submenu" in Object.values(x)[0]
        )
            return true;
        return false;
    };

    if (!MenuSubmenuMap)
        throw Error("проблемы с сопоставлением  .main-menu__item .main-menu__submenu");

    mainMenu &&
        mainMenu.addEventListener("mouseenter", () => {
            const width = getComputedStyle(mainMenu).getPropertyValue("--width-menu");
            console.log(width);
            mainMenuList && (mainMenuList.style.width = width || "420px");
        });
    mainMenu &&
        mainMenu.addEventListener("mouseleave", () => {
            mainMenuList && (mainMenuList.style.width = "");
        });

    let didSubEnter = false;

    mainSubmenus &&
        mainSubmenus.forEach(sub => {
            sub.addEventListener("mouseenter", () => {
                didSubEnter = true;
            });
            sub.addEventListener("mouseleave", () => {
                didSubEnter = false;
                sub.removeAttribute("active");
            });
        });

    mainMenuList &&
        mainMenuList.addEventListener("mousemove", (event: Event) => {
            const target = event.target as HTMLElement;
            const closest = target.closest(".main-menu__item");
            if (!closest) return;
            const id = (closest as HTMLElement).dataset.id!;
            console.log(
                "%cMyProject%cline:34%cMenuSubmenuMap",
                "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
                "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
                "color:#fff;background:rgb(217, 104, 49);padding:3px;border-radius:2px",
                MenuSubmenuMap,
            );
            setTimeout(() => {
                mainSubmenus.forEach(e => e.removeAttribute("active"));
                isMenuSubmenuType(MenuSubmenuMap) &&
                    (MenuSubmenuMap as MenuSubmenuType)[id].submenu.setAttribute(
                        "active",
                        "active",
                    );
            }, TRIGGER_THRESHOLD);
        });
    mainMenuList &&
        mainMenuList.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!didSubEnter) mainSubmenus.forEach(e => e.removeAttribute("active"));
            }, TRIGGER_THRESHOLD);
        });
}
