
function isBlank(value) {
    if (value == undefined) {
        return true;
    }

    if (value == null) {
        return true;
    }

    if (value.trim().length == 0) {
        return true;
    }

    return false;
}

export {
    isBlank
}