import { Movimento } from "./movimento.model";

export class Processo {
    public nome:string;
    public conclusao: Movimento;
    public peticao:Movimento;
    public desistencia:Movimento;
    public expedicao:Movimento;

    constructor(nome:string, conclusao: Movimento, peticao:Movimento, desistencia:Movimento, expedicao:Movimento) {      
        this.nome = nome;
        this.conclusao = conclusao;
        this.peticao = peticao;
        this.desistencia = desistencia;
        this.expedicao = expedicao;
    }

}
