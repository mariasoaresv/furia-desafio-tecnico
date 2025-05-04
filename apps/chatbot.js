document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('.digite-aqui');
    const input = form.querySelector('input');
    const areaMensagens = document.querySelector('.area-mensagens');

    // Mostra os comandos que o usuario pode usar assim que o chat abre
    mostrarMensagemBot(`
        Bem-vindo ao <strong>FURIABOT!</strong> 🎮<br><br>
        <strong>Você pode usar os seguintes comandos:</strong><br>
        - "Placar" (mostra o placar do jogo atual 🥇)<br>
        - "Resultados" (mostra os resultados dos últimos 5 jogos 🏆)<br>
        - "Proximos jogos" (mostra qual é o próximo jogo 🗓️)<br>
        - "Redes sociais" (mostra as redes sociais da furia CS 📲)<br>
        - "Jogadores" (mostra a line atual do time 🤾‍♂️)<br>
        - "Torcida" (teste para ver! 👀🎉)<br>
        - "Merch" (exibe o site das merchs da fúria.gg 🛒)<br><br>
        <strong>Você também pode fazer essas perguntas:</strong><br>
        - "Qual o mapa mais forte da FURIA?"<br>
        - "Qual é o mapa favorito do time?"<br>
        - "Quem é o IGL do time?"<br>
        - "Quais campeonatos a fúria cs já foi campeã?"`);

    form.addEventListener('submit', function(evento) {
        evento.preventDefault(); // página nao recarrega

        const mensagem = input.value.trim();
        if (mensagem !== '') {
            mostrarMensagemUsuario(mensagem);
            input.value = '';
            setTimeout(() => {
                responderComando(mensagem.toLowerCase());
            }, 2000);
        }
    });

    function mostrarMensagemUsuario(texto) {
        const divMensagem = document.createElement('div');
        divMensagem.classList.add('mensagem', 'usuario');
        divMensagem.innerHTML = 
        `<div class="texto">${texto}</div>`;
        areaMensagens.appendChild(divMensagem);
        areaMensagens.scrollTop = areaMensagens.scrollHeight;
    }

    function efeitoDigitando() {
        const divMensagem = document.createElement('div');
        divMensagem.classList.add('mensagem', 'digitando');
        divMensagem.innerHTML = `
            <img class="avatar" src="images/furia-logotipo.svg" alt="Bot">
            <div class="texto">Digitando<span class="pontos"></span></div>
        `;
        areaMensagens.appendChild(divMensagem);
        areaMensagens.scrollTop = areaMensagens.scrollHeight;
    }
    function removerDigitando() {
        const digitando = document.querySelector('.digitando');
        if (digitando) {
            digitando.remove();
        }
    }

    function mostrarMensagemBot(texto) {
        const divMensagem = document.createElement('div');
        divMensagem.classList.add('mensagem', 'bot');
        divMensagem.innerHTML = `
            <img class="avatar" src="images/furia-logotipo.svg" alt="Bot">
            <div class="texto">${texto}</div>
        `;
        areaMensagens.appendChild(divMensagem);
        areaMensagens.scrollTop = areaMensagens.scrollHeight;
    }

    function responderComando(comando) {
        efeitoDigitando();

        setTimeout(() => {
            removerDigitando();
        if (comando.includes('placar')) {
            mostrarMensagemBot(`No momento não esta acontecendo nenhum jogo ao vivo da <strong>FURIA</strong> 😔, confira qual será o próximo jogo utilizando o comando <strong>"próximos jogos"</strong>`);
        }
        else if (comando.includes('resultados')) {
            mostrarMensagemBot(` 🥇Resultados recentes da FURIA:<br><br>
            📅 <strong>09/04/2025</strong> (PGL Bucharest 2025) - <img src="images/furia-logotipo.svg" class="logo-times" alt="logo furia"> <strong>FURIA</strong> 0 x 2 <strong>The MongolZ</strong> <img src="images/the-mongolz-logo.png" class="logo-times" alt="logo mongolz"><br><br>
            📅 <strong>08/04/2025</strong> (PGL Bucharest 2025) - <img src="images/furia-logotipo.svg" class="logo-times" alt="logo furia"> <strong>FURIA</strong> 0 x 2 <strong>Virtus.pro</strong> <img src="images/virtus-logo.png" class="logo-times" alt="logo virtus"><br><br>
            📅 <strong>07/04/2025</strong> (PGL Bucharest 2025) - <img src="images/furia-logotipo.svg" class="logo-times" alt="logo furia"> <strong>FURIA</strong> 1 x 2 <strong>Complexity</strong> <img src="images/complexity-logo.png" class="logo-times" alt="logo complexity"><br><br>
            📅 <strong>06/04/2025</strong> (PGL Bucharest 2025) - <img src="images/furia-logotipo.svg" class="logo-times" alt="logo furia"> <strong>FURIA</strong> 2 x 0 <strong>Apogee</strong> <img src="images/apogee-logo.webp" class="logo-times" alt="logo apogee"><br><br>
            📅 <strong>22/03/2025</strong> (BLAST Open Lisbon 2025) - <img src="images/furia-logotipo.svg" class="logo-times" alt="logo furia"> <strong>FURIA</strong> 1 x 2 <strong>M80</strong> <img src="images/m80-logo.png" class="logo-times" alt="logo m80">`);
        }
        else if (comando.includes('proximos') || comando.includes('próximos')) {
            mostrarMensagemBot('📅 Próximo jogo: Não há partidas da FURIA agendadas ainda 😔, confira os resultados dos últimos jogos utilizando o comando "resultados"');
        }
        else if (comando.includes('redes')) {
            mostrarMensagemBot(`📲 <strong>Redes sociais:</strong><br><br>
                <a href="https://www.instagram.com/furiagg/" target="_blank"><img src="images/instagram-icon.png" class="icons-redes" alt="icone instagram"></a> @furiagg<br>
                <a href="https://www.youtube.com/@FURIAggCS" target="_blank"><img src="images/youtube-icon.png" class="icons-redes" alt="icone youtube"></a> FURIAggCS<br>
                <a href="https://x.com/FURIA" target="_blank"><img src="images/twitter-icon.webp" class="icons-redes" alt="icone twitter"></a> @FURIA`);
        }
        else if (esperandoRespostaFavorito){
            jogadorFavorito(comando.toLowerCase())
            esperandoRespostaFavorito = false;
            return;
        }
        else if (comando.includes('jogadores')) {
                jogadoresComando();
            setTimeout(() => {
                jogadorFavorito();
            }, 9000);
            
        }
        else if (comando.includes('torcida')) {
            iniciarTorcida();
        }
        else if (comando.includes('merch')) {
            mostrarMensagemBot('🛒 Confira os produtos oficiais: <a href="https://www.furia.gg/shop" target="_blank">Clique aqui</a>');
        }
        else if (comando.includes('mapa' && 'forte')) {
            mostrarMensagemBot(`Atualmente, eu diria que <strong>Mirage</strong> é o nosso verdadeiro território! 😉🗺️ Com uma taxa de vitória de <strong>60,8%</strong>, <strong>Mirage</strong> é o mapa onde a <strong>FURIA</strong> brilha mais no cenário competitivo. Além disso, ele é um dos mapas mais jogados e com maior presença na rotação atual. Claro que temos outros mapas fortes também, como Vertigo (61,2%) e Inferno (59,1%), mas Mirage tem sido o nosso favorito para garantir vitórias!🥇 `);
        }
        else if (comando.includes('mapa' && 'favorito')) {
            mostrarMensagemBot(`O mapa que a FURIA mais escolhe atualmente é o <strong>Nuke</strong>✨. Eles têm uma taxa de pick de 31.2%, o que mostra que é um mapa que a equipe gosta de jogar. Embora o Mirage tenha uma taxa de vitória mais alta, com 60.8%, o <strong>Nuke</strong> é o preferido da <strong>FURIA</strong> para os confrontos, mesmo que a taxa de vitória seja um pouco menor (56.1%).`);
        }
        else if (comando.includes('igl' && 'time')) {
            mostrarMensagemBot(`O IGL (In-Game Leader) da <strong>FURIA</strong> é o <strong>FalleN</strong>✨! Ele é conhecido por sua incrível liderança tática e experiência dentro do jogo, sempre tomando decisões cruciais durante as partidas e guiando a equipe em momentos decisivos. Além de ser um dos <strong>maiores ícones do CS:GO</strong>, ele tem uma visão estratégica única que faz toda a diferença para a <strong>FURIA</strong> 🎮.`);
        }
        else if (comando.includes('campeonatos' && 'campeã') || comando.includes('campeonatos' && 'campea')) {
            mostrarMensagemBot(`A <strong>FURIA</strong> já foi campeã em grandes campeonatos, como:<br>
                - IEM Katowice 2019 🎮<br>
                - ESL Pro League Season 12: Americas 🏅<br>
                - DreamHack Masters Spring 2021 🏆<br>
                - BLAST Premier: Global Final 2020 (América do Sul) 🔥<br>
                Além desses títulos, a <strong>FURIA</strong> tem várias outras boas posições em campeonatos como IEM, ESL Pro League e BLAST Premier! 😎`);
        }
        else {
            mostrarMensagemBot(`🙁 Comando não reconhecido. Tente novamente!<br><br>
                <strong>Você pode usar os seguintes comandos:</strong><br>
                - "Placar" (mostra o placar do jogo atual 🥇)<br>
                - "Resultados" (mostra os resultados dos últimos 5 jogos 🏆)<br>
                - "Proximos jogos" (mostra qual é o próximo jogo 🗓️)<br>
                - "Redes sociais" (mostra as redes sociais da furia CS 📲)<br>
                - "Jogadores" (mostra a line atual do time 🤾‍♂️)<br>
                - "Torcida" (teste para ver! 👀🎉)<br>
                - "Merch" (exibe o site das merchs da fúria.gg 🛒)<br><br>
                <strong>Você também pode fazer essas perguntas:</strong><br>
                - "Qual o mapa mais forte da FURIA?"<br>
                - "Qual é o mapa favorito do time?"<br>
                - "Quem é o IGL do time?"<br>
                - "Quais campeonatos a fúria cs já foi campeã?"`);
        }
    }, 1500);
    }

    let esperandoRespostaFavorito = false;
    
    function jogadoresComando() {
        const fotosJogadores = [
            `<a class="fotos-jogadores" href="https://www.instagram.com/furiagg/" target="_blank"><img class="foto-jogadores" src="images/molodoy-jogador.png" alt="foto do MOLODOY"></a>`,
            `<a class="fotos-jogadores" href="https://www.instagram.com/yek1ndar/" target="_blank"><img class="foto-jogadores" src="images/yekindar-jogador.avif" alt="foto do YEKINDAR"></a>`,
            `<a class="fotos-jogadores" href="https://www.instagram.com/fallen/" target="_blank"><img class="foto-jogadores" src="images/fallen-jogador.png" alt="foto do FalleN"></a>`,
            `<a class="fotos-jogadores" href="https://www.instagram.com/kscerato/" target="_blank"><img class="foto-jogadores" src="images/kscerato-jogador.png" alt="foto KSCERATO"></a>`,
            `<a class="fotos-jogadores" href="https://www.instagram.com/yuurihfps/" target="_blank"><img class="foto-jogadores" src="images/yuurih-jogador.png" alt="foto yuurih"></a>`,
            `<a class="fotos-jogadores" href="https://www.instagram.com/skullzcs" target="_blank"><img class="foto-jogadores" src="images/skullz-jogador.webp" alt="foto do SKULLZ"></a>`,
            `<a class="fotos-jogadores" href="https://www.instagram.com/chelok1ng/" target="_blank"><img class="foto-jogadores" src="images/chelo-jogador.png" alt="foto do Chelo"></a>`,
            `<a class="fotos-jogadores" href="https://www.instagram.com/siddecs/" target="_blank"><img class="foto-jogadores" src="images/sidde-coach.webp" alt="foto do Sidde"></a>`,
            `<a href="https://www.instagram.com/furiagg/" target="_blank"><img class="foto-jogadores" src="images/hepa-coach.png" alt="foto do Hepa"></a>`
        ];
        const nomes = ['MOLODOY', 'YEKINDAR', 'FalleN', 'KSCERATO', 'yuurih', 'SKULLZ', 'Chelo', 'Sidde', 'HEPA'];

        setTimeout(() =>{
            mostrarMensagemBot('A line atual é composta por:');
            mostrarMensagemBot(`<strong>Jogadores:</strong>`);
        }, 200);

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                mostrarJogadores(nomes[i], fotosJogadores[i]);
            }, (i + 2) * 500); // 1 segundo
        }
        setTimeout(() => {
            mostrarMensagemBot('<strong>Jogadores reserva:</strong>');
        }, 4000); 
        setTimeout(() => {
            mostrarJogadores(nomes[5], fotosJogadores[5]);
        }, 4500);
    setTimeout(() => {
            mostrarJogadores(nomes[6], fotosJogadores[6]);
        }, 5000);
    
        setTimeout(() => {
            mostrarMensagemBot('<strong>Coachs:</strong>');
        }, 5500);
        setTimeout(() => {
            mostrarJogadores(nomes[7], fotosJogadores[7]); // Sidde
        }, 6500);  
        setTimeout(() => {
            mostrarJogadores(nomes[8], fotosJogadores[8]); // HEPA
        }, 7000);

        setTimeout(() => {
            mostrarMensagemBot('Essa é a line atual do time de <strong>CS</strong> da <strong>Furia</strong><br>Qual é seu jogador ou coach favorito?');
            esperandoRespostaFavorito = true;
        }, 8000);
    }

    function mostrarJogadores(jogadores, fotos){
        const divMensagem = document.createElement('div');
        divMensagem.classList.add('mensagem', 'jogadores');
        divMensagem.innerHTML = 
            `<strong>${jogadores}</strong><br>
            <div class="texto">${fotos}</div>`;
        areaMensagens.appendChild(divMensagem);
        areaMensagens.scrollTop = areaMensagens.scrollHeight;
    }
    function jogadorFavorito(resposta = resposta.toLowerCase()){
        if (resposta.includes('molodoy')){
            mostrarMensagemBot('Que legal, eu também gosto do <strong>molodoy</strong>, principalmente da mira precisa e da agressividade inteligente que ele tem nas trocas!')
        }
        else if (resposta.includes('yekindar')){
            mostrarMensagemBot('Que legal, eu também gosto do <strong>yekindar</strong>, principalmente da ousadia nas entradas e da leitura rápida de jogo!');
        }
        else if (resposta.includes('fallen')){
            mostrarMensagemBot('Que legal, eu também gosto do <strong>FalleN</strong>, principalmente da liderança tática e da calma absurda que ele mantém nas rodadas decisivas!');
        }
        else if (resposta.includes('kscerato')){
            mostrarMensagemBot('Que legal, eu também gosto do <strong>Kscerato</strong>, principalmente da frieza nos clutches e da consistência em alto nível!');
        }
        else if (resposta.includes('yuurih')){
            mostrarMensagemBot('Que legal, eu também gosto do <strong>yuurih</strong>, principalmente pela forma como ele sempre aparece nos momentos mais importantes da partida!');
        }
        else if (resposta.includes('skullz')){
            mostrarMensagemBot('Que legal, eu também gosto do <strong>skullz</strong>, principalmente da mira sólida e da inteligência nas rotações!');
        }
        else if (resposta.includes('chelo')){
            mostrarMensagemBot('Que legal, eu também gosto do <strong>chelo</strong>, principalmente da energia que ele traz pro time e da confiança nas jogadas agressivas!');
        }
        else if (resposta.includes('sidde')){
            mostrarMensagemBot('Que legal, eu também gosto do <strong>sidde</strong>, principalmente pela forma como organiza o time e mantém todo mundo focado!');
        }
        else if (resposta.includes('hepa')){
            mostrarMensagemBot('Que legal, eu também gosto do <strong>hepa</strong>, principalmente pela visão estratégica e pelo suporte que dá por trás das câmeras!');
        }
        else {
            mostrarMensagemBot('Legal! Esse nome não está na lista oficial agora, mas todo apoio conta! 🖤');
        }
    }

    function iniciarTorcida() {
        const nomes = [
            'FãLLen', 'Fã', 'TorcedorFuria', 'FURIA_Lover', 'GoFURIA', 
            'FANATICO', 'CSGODABR', 'FURIAzin', 'FuriaHunter', 'csFURIOSO',
            'GritoDoPantera', 'SprayDaFuria', 'Awpzada666', 'RatoDoBomb',
            'SangueFURIA', 'Furioso_13'
        ];
    
        const mensagens = [
            'VAMO FURIAAA 🔥',
            'Confio demais no FalleN!',
            'Que bala absurda do KSCERATO!',
            'Essa é nossa! #GoFURIA',
            'FURIA MITO!!',
            'Yuurih monstro!',
            'Panteras no server, adversário que lute! 💥',
            'Confio até o último round! Vai, FURIA! 🖤',
            'Cada kill é um rugido, vamos FURIA! 🐾',
            'Torcida fiel nunca abandona! VAI FURIA! 🔥',
            'GG só quando a FURIA vence! 🧨',
            'A mira tá quente, o coração também! 💣'
        ];

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const nome = nomes[Math.floor(Math.random() * nomes.length)];
                const mensagem = mensagens[Math.floor(Math.random() * mensagens.length)];
                mostrarMensagemTorcida(nome, mensagem);
            }, i * 500);
        }
    }

    function mostrarMensagemTorcida(nome, mensagem) {
        const divMensagem = document.createElement('div');
        divMensagem.classList.add('mensagem', 'torcida');
        divMensagem.innerHTML = 
            `<strong>${nome}</strong><br>
            <div class="texto">${mensagem}</div>`;
        areaMensagens.appendChild(divMensagem);
        areaMensagens.scrollTop = areaMensagens.scrollHeight;
    }

});