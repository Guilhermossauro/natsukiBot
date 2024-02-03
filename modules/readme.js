exports.readme = async function readme(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;

    const readme = `
    *=== README do BOT - Natskuki ===*
    
    Olá, usuário! Bem-vindo ao README da Natskuki bot, uma inteligência artificial desenvolvida para WhatsApp, baseada nos projetos Lil e Bruce, concebidos pelo  BADASS do Kauã, em colaboração com o mestre Jonathan Henrique. Este projeto está disponível no GitHub do Bruce, acessível através do link: https://github.com/kaualandi/bot-whatsapp 
    
    *Licença:*
    Este bot é distribuído sob a Licença Apache 2.0. Recomendamos que você leia atentamente os termos desta licença para garantir o uso adequado e ético deste serviço.
    
    *Responsabilidade:*
    O uso deste bot está sujeito à sua total responsabilidade. É estritamente proibido utilizar este serviço para fins ilegais ou não autorizados. Ao adotar e usufruir deste bot, você concorda em não violar as leis da sua jurisdição.
    
    *Conformidade com a LGPD:*
    Reconhecemos a importância da privacidade e proteção de dados. Ao utilizar este bot, você concorda em tomar todas as medidas necessárias para garantir que seu uso esteja em conformidade com a Lei Geral de Proteção de Dados (LGPD). Isso inclui, mas não se limita a, garantir que qualquer informação pessoal coletada, processada ou armazenada seja tratada com o devido cuidado e em conformidade com os princípios estabelecidos pela LGPD.
    
    *Termos de Uso:*
    Ao prosseguir com o uso deste serviço, você concorda em não violar os Termos de Uso estabelecidos. Isso inclui, mas não se limita a, não utilizar o bot para disseminar conteúdo ilegal, difamatório, obsceno, discriminatório ou prejudicial. Reservamo-nos o direito de suspender o acesso a este bot caso ocorra qualquer violação destes termos.
    
    *Coleta e Tratamento de Dados:*
    Entendemos a importância da transparência no tratamento de dados. Este bot pode coletar e processar informações fornecidas por você durante a interação. Estas informações podem incluir, mas não estão limitadas a, mensagens, dados de localização e identificadores exclusivos. Garantimos que tais dados serão tratados com a máxima confidencialidade e utilizados apenas para melhorar a qualidade e eficiência do serviço.
    
    *Segurança:*
    Comprometemo-nos a implementar medidas de segurança razoáveis para proteger os dados coletados contra acesso não autorizado, divulgação ou alteração. No entanto, é crucial entender que nenhum sistema é completamente imune a ameaças de segurança, e você assume o risco ao utilizar este serviço.
    
    *Atualizações e Modificações:*
    Reservamo-nos o direito de realizar atualizações e modificações neste serviço conforme necessário. Recomendamos que você verifique periodicamente este README para estar ciente de quaisquer alterações nos termos ou nas práticas de privacidade.
    
    Ao continuar a utilizar a Natskuki bot, você está concordando com todos os termos e condições estabelecidos neste README. Agradecemos por sua compreensão e cooperação para garantir um ambiente de uso seguro e ético. Se tiver dúvidas ou preocupações, entre em contato conosco através dos canais indicados no GitHub.`;

    await client.reply(from, readme, id);
}