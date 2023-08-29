export function dateFormatter(dateString) {
  const date = new Date(dateString);
  const currentDate = new Date();

  const diffMilliseconds = currentDate - date;
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 1) {
    return `Il y a ${diffYears} ans`;
  } else if (diffMonths > 1) {
    return `Il y a ${diffMonths} mois`;
  } else if (diffDays > 7) {
    const diffWeeks = Math.floor(diffDays / 7);
    return `Il y a ${diffWeeks} semaine${diffWeeks > 1 ? 's' : ''}`;
  } else if (diffDays > 1) {
    return `Il y a ${diffDays} jours`;
  } else if (diffHours > 1) {
    return `Il y a ${diffHours} heures`;
  } else if (diffMinutes > 1) {
    return `Il y a ${diffMinutes} minutes`;
  } else {
    return `Il y a quelques secondes`;
  }
}


  
  
