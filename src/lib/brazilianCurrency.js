

export function brazilianCurrencydd(amount) {
    if (amount === null || amount === undefined || isNaN(Number(amount))) {
        return "R$ 0,00";
    }

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(Number(amount));
}


export function brazilianCurrency(amount) {
    if (amount === null || amount === undefined || isNaN(Number(amount))) {
        return "₹ 0.00";
    }

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(Number(amount));
}
