export const capitalize = (val?: string) => val?.split('').map((v, i, a) => i === 0 ? v.toUpperCase() : a[i - 1] === " " ? v.toUpperCase() : v).join('');
