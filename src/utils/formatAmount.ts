export const formatAmount = (amount: string | number) => {
    return new Intl.NumberFormat().format(Number(amount));
}