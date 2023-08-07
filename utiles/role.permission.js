
export const role_has_permission = (role, action) => {
    let permission = false
    if(role === "kingAdmin"){
        permission = true
    }
    else if(role === "superAdmin" ){
        permission = true
    }
    else if(role === "admin"  && (action === "view" || action === "list" || action === "edit" || action === "add")){
        permission = true
    }
    else if(role === "editor" && (action === "view" || action === "list")){
        permission = true
    }

    console.log("function role_has_permission has been executed and the decision is: ",permission,"pour l'action:", action)
    return permission
}

export const bigger_than = (role1, role2) => {
    let bigger = false
    if (role1 === "kingAdmin"){
        bigger = true
    }
    if (role1 === "superAdmin" && (role2 ==="admin" || role2 === "editor")){
        bigger = true
    }
    if (role1 === "admin" && (role2 === "editor")){
        bigger = true
    }
    return bigger
}

export const establishmentCheck = (e1, e2, role) => {
    return e1 === e2 || role === "kingAdmin";
}


export const belongTo = (id1, id2) => {
    return id1 === id2 ;
}