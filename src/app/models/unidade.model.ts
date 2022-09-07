export class Unidade {
    public unidade_id:number;
    public quantidadeAtividade:number | undefined;
    public duracaoMediaPorCaso:string | undefined;
    public quantidadeEventosPorCaso:number | undefined;
    public quantidadeCasos:number | undefined;
    public quantidadeEventos:number | undefined;
    public variacaoEventosPorCaso:string | undefined;
    public duracaoMedia:string | undefined;
    public quantidadeVariacao:number | undefined;


    constructor(unidade_id:number, quantidadeAtividade:number | undefined, duracaoMediaPorCaso:string | undefined, quantidadeEventosPorCaso:number | undefined, quantidadeCasos:number | undefined, quantidadeEventos:number | undefined, variacaoEventosPorCaso:string | undefined, duracaoMedia:string | undefined, quantidadeVariacao:number | undefined){   
        this.unidade_id = unidade_id;
        this.quantidadeAtividade = quantidadeAtividade;
        this.duracaoMediaPorCaso = duracaoMediaPorCaso;
        this.quantidadeEventosPorCaso = quantidadeEventosPorCaso;
        this.quantidadeCasos = quantidadeCasos;
        this.quantidadeEventos = quantidadeEventos;
        this.variacaoEventosPorCaso = variacaoEventosPorCaso;
        this.duracaoMedia = duracaoMedia;
        this.quantidadeVariacao = quantidadeVariacao;
    }
}
