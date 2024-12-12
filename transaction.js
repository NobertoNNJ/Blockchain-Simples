class Transaction{
    constructor(fromUser, toUser, value, gas = 1){
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.value = value;
        this.gas = gas;
    };
};

module.exports = Transaction;