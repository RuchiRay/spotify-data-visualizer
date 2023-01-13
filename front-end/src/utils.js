export const catchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    });
  };
};

export const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const  formatNumber = (num)=>{
  return num.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
}

export const findYear = (date)=>{
  return date.substring(0,4)
}