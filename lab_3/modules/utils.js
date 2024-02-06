function getDate() {
    // Got from ChatGPT
    const now = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = months[now.getMonth()];
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timezoneOffset = now.getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
    const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);
    const timezoneSuffix = timezoneOffset >= 0 ? '-' : '+';
    const timezoneHours = String(timezoneOffsetHours).padStart(2, '0');
    const timezoneMinutes = String(timezoneOffsetMinutes).padStart(2, '0');
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formattedDateTime = `${dayOfWeek} ${month} ${day} ${year} ${hours}:${minutes}:${seconds} GMT${timezoneSuffix}${timezoneHours}${timezoneMinutes} (${timezoneName})`;

    return formattedDateTime;
}

module.exports = { getDate }