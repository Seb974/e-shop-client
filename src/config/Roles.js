function getRoles() {
    return [
        {value: "ROLE_SUPER_ADMIN",  label: "Super administrateur",      isFixed: true},
        {value: "ROLE_ADMIN",        label: "Administrateur",            isFixed: true},
        {value: "ROLE_TEAM",         label: "Utilisateur interne",       isFixed: false},
        {value: "ROLE_VIP",          label: "Professionnel VIP",         isFixed: false},
        {value: "ROLE_GC",           label: "Grand compte",              isFixed: false},
        {value: "ROLE_CHR",          label: "Café-Hotel-Restaurant",     isFixed: false},
        {value: "ROLE_PRO",          label: "Professionnel",             isFixed: false},
        {value: "ROLE_USER_EXT_VIP", label: "Particulier extérieur VIP", isFixed: false},
        {value: "ROLE_USER_VIP",     label: "Particulier VIP",           isFixed: false},
        {value: "ROLE_USER_EXT",     label: "Particulier extérieur",     isFixed: false},
        {value: "ROLE_USER",         label: "Particulier",               isFixed: false},
    ];
}

function filterRoles(roles) {
    return roles[0];
    // const unused = ["ROLE_SELLER", "ROLE_DELIVERER", "ROLE_DELIVERY_SELLER"];
    // return roles.length === 1 ? roles[0] : roles.filter(role => !unused.includes(role))[0];
}

function hasPrivileges(user) {
    return ["ROLE_SUPER_ADMIN", "ROLE_ADMIN", "ROLE_TEAM"].includes(user.roles);
}

function hasAdminPrivileges(user) {
    return ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"].includes(user.roles);
}

function hasAllPrivileges(user) {
    return user.roles === "ROLE_SUPER_ADMIN";
}

function getDefaultRole() {
    return "ROLE_USER";
}

function getRoleLabel(userRoles) {
    const roles = getRoles();
    const userRole = filterRoles(userRoles);
    return roles.find(role => userRole === role.value).label;
}

function isRelaypoint(roles) {
    return (Array.isArray(roles) && roles.includes("ROLE_RELAYPOINT")) || roles === "ROLE_RELAYPOINT";
}

function hasAdminAccess(user) {
    const adminAccessRoles = ["ROLE_SELLER", "ROLE_DELIVERER", "ROLE_TEAM", "ROLE_PICKER", "ROLE_RELAYPOINT", "ROLE_SUPERVISOR"];
    return adminAccessRoles.includes(user.roles);
}

function isBasicUser(user) {
    return ["ROLE_USER", "ROLE_USER_VIP"].includes(user.roles);
}

export default {
    getRoles,
    filterRoles,
    getDefaultRole,
    hasPrivileges,
    hasAdminPrivileges,
    hasAllPrivileges,
    getRoleLabel,
    isRelaypoint,
    hasAdminAccess,
    isBasicUser
}