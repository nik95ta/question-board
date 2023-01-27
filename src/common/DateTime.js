export const renderTime = (dateTime) => new Date(dateTime).toLocaleTimeString('fa-IR', {hour: '2-digit', minute:'2-digit'});
export const renderDate = (dateTime) => new Date(dateTime).toLocaleDateString('fa-IR');
