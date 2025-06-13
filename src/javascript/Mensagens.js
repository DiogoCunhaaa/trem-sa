export default class Mensagens {

    //FORMATACAO DE INFOS (LITROS E DATA) PARA GESTAO DE ROTAS
    static formatarLitros(litros) {
        return `${litros.toFixed(0)}L`;
    }

    static formatarHorario(data = new Date()) {
        const horas = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    //RELATORIOS
    static gerarMensagensConsumo(litros) {
        return `Consumo energético de ${this.formatarLitros(litros)} em uma hora`;
    }

    static gerarMensagensAbastecimento(data = new Date()) {
        return `Parada para abastecimento às ${this.formatarHorario(data)}`;
    }

    //MANUTENCAO
    static gerarMensagensManutencao(km) {
        return `Está acontecendo uma manutenção no km ${km} dos trilhos.`
    }

    static gerarMensagensPontoManutencao(km) {
        return `Ponto de parada para manutenção em ${km}km.`
    }

    static gerarMensagensObstrucao(causa) {
        return `Possível obstrução nos trilhos, ${causa}.`
    }

    static gerarMensagensEqpManutencao(km) {
        return `Solicitando PARADA daqui à ${km}km.`
    }

    static gerarMensagensAtencao(causa) {
        return `Vazamento de fluídos no freio ${causa}.`
    }

    //ALERTAS
    static gerarMensagensAlertaFreio() {
        return `Parada recomendada na próxima estação.`
    }

    static gerarMensagensAlertaCombustivel(restante) {
        return `Nível de combustível inferior a ${restante}%.`
    }

    static gerarMensagensPartida(data = new Date()) {
        const agora = new Date();
        
        const horarioPartida = new Date(data); //PRA SETAR O HORARIO ALVO DE PARTIDA 
        horarioPartida.setHours(8, 0, 0, 0)//ISSO DEFINE O HORARIO ALVO COMO 8AM

        const diferencaMs = horarioPartida.getTime() - agora.getTime();
        const diferencaMin = Math.round(Math.abs(diferencaMs) / 60000); //CONVERTE A DIFERENCA PRA MINUTOS 

        const horaFormatada = horarioPartida.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const horas = Math.floor(diferencaMin / 60);
        const minutos = diferencaMin % 60;
        const tempoFormatado =
        (horas > 0 ? `${horas} hora(s)` : '') +
        (horas > 0 && minutos > 0 ? ' e ' : '') +
        (minutos > 0 ? `${minutos} min` : '');

        if (diferencaMs < 0) {
            return `O trem partiu há ${tempoFormatado} (${horaFormatada}).`;
        } 
        else if (diferencaMs > 0) {
            return `Horário de partida definido para daqui a ${tempoFormatado} (${horaFormatada}).`;
        } 
        else {
            return `O trem está partindo agora (${horaFormatada}).`;
        }
    }
}

