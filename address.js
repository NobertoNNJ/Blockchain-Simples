class Address{
    constructor(address){
        this.address = address;
        this.balance = 0;
    };
    static isValidAddress(address){
        const regex = /^7f5[a-fA-F0-9]{7}$/;
        return regex.test(address);
    };
    addBalance(amount){
        if(amount < 0) throw new Error('Valor inválido para adicionar ao saldo.');
        this.balance += amount;
    }
    deductBalance(amount){
        if(amount > this.balance) throw new Error('Saldo insuficiente.');
        this.balance -= amount;
    }
};

module.exports = Address;