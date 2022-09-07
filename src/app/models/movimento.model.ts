export class Movimento {
    public nome:string;
    public movimento:string | undefined;
    public tempo:string | undefined;

    constructor(nome:string, movimento:string | undefined, tempo:string | undefined) {
        this.nome = nome;
        this.movimento = movimento;
        this.tempo = tempo;
    }
}
