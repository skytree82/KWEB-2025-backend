const combination = (n, r) => {
    if (n < 0 || r < 0) return 0;
    if (n === 0 || r === 0) return 1;
    if (r > n) return 0;

    let result = 1;
    for (let i = 1; i <= r; i++) {
        result *= (n - i + 1);
        result /= i;
    }
    return result;
}

const permutation = (n, r) => {
    if (n < 0 || r < 0) {
        return 0;
    }
    if (n === 0 || r === 0) {
        return 1;
    }
    if (r > n) {
        return 0;
    }
    let result = 1;
    for (let i = 1; i <= r; i++) {
        result *= (n - i + 1);
    }
    return result;
}

const multiPermutation = (n, r) => {
    return n ** r;
}

const multiCombination = (n, r) => {
    return combination(n + r - 1, r);
}

module.exports = {
    multiCombination,
    multiPermutation,
    combination,
    permutation
}