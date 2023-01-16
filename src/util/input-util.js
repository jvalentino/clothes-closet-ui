
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

function prettyDateTimeFromIso(iso) {
    const date = new Date(iso);
    const dayMonthYear = date.toLocaleDateString()
    const time = date.toLocaleTimeString()

    return `${dayMonthYear} ${time}`;
  }

export {
    isBlank,
    prettyDateTimeFromIso
}