export class Input {
    public key: string;
    public value: string | Number;

    constructor(key: string, value: string | Number) {
        this.key = key;
        this.value = value;
    }
}
