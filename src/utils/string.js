export const formatCurrency = (number) => {
    return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}