

function getUserMenu(allRouts = [], menuRouts = []) {
    let userMenu = []
    menuRouts.forEach(it => {
        allRouts.forEach(item => {
            if (it.name == item.meta.name) {
                if (it.children && it.children.length > 0) {
                    item.children = getUserMenu(item.children, it.children)
                }
                userMenu.push(item)
            }
        })

    });
    return userMenu

}

export default getUserMenu
