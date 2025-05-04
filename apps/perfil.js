document.addEventListener('DOMContentLoaded', function () {

  // Arruma a selecao das perguntas
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('click', function () {
      if (this.checked && this.classList.contains('selecionado')) {
        this.checked = false;
        this.classList.remove('selecionado');
      } else {
        document.querySelectorAll(`input[name="${this.name}"]`).forEach(r => r.classList.remove('selecionado'));
        this.classList.add('selecionado');
      }
    });
  });

  // Definicao dos perfis
  const perfis = {
    tatico: {
      imagem: "images/torcedor-tatico.png",
      },
      furioso: {
        imagem: "images/furioso-coracao.png",
      },
      estetico: {
        imagem: "images/torcedor-estetico.png",
      },
      soloPlayer: {
        imagem: "images/torcedor-soloplayer.png",
      }
  };
  
  // Calcula a pontuação dos perfis
  function calcularPontuacao() {
    let pontos = {
      solo_player: 0,
      tatico: 0,
      estetico: 0,
      furioso_de_coracao: 0
    };
  
    const respostas = [
      { tipo: 'checkbox', resposta: document.querySelectorAll('input[name="p2"]:checked').length},
      { tipo: 'radio', resposta: document.querySelector('input[name="p3"]:checked')?.value},
      { tipo: 'radio', resposta: document.querySelector('input[name="p4"]:checked')?.value},
      { tipo: 'radio', resposta: document.querySelector('input[name="p5"]:checked')?.value},
      { tipo: 'radio', resposta: document.querySelector('input[name="p6"]:checked')?.value},
      { tipo: 'radio', resposta: document.querySelector('input[name="p7"]:checked')?.value},
      { tipo: 'radio', resposta: document.querySelector('input[name="p8"]:checked')?.value},
      { tipo: 'checkbox', resposta: document.querySelectorAll('input[name="p9"]:checked').length},
      { tipo: 'radio', resposta: document.querySelector('input[name="p10"]:checked')?.value},
      ];
  
      // Torcedor Solo-Player
      if (respostas[0].resposta === 1) pontos.solo_player += 10;
      if (respostas[1].resposta === "1") pontos.solo_player += 5;
      if (respostas[2].resposta === "1") pontos.solo_player += 5;
      if (respostas[3].resposta === "2") pontos.solo_player += 4;
      if (respostas[4].resposta === "3") pontos.solo_player += 3;
      if (respostas[5].resposta === "4") pontos.solo_player += 2;
      if (respostas[6].resposta === "4") pontos.solo_player += 2;
      if (respostas[7].resposta >= 3 && respostas[7].resposta <= 4) pontos.solo_player += 6;
      if (respostas[8].resposta === "2") pontos.solo_player += 4;
  
      // Torcedor Tático
      if (respostas[0].resposta >= 3 && respostas[0].resposta <= 4) pontos.tatico += 8;
      if (respostas[1].resposta === "2") pontos.tatico += 6;
      if (respostas[2].resposta === "2") pontos.tatico += 6;
      if (respostas[3].resposta === "4") pontos.tatico += 2;
      if (respostas[4].resposta === "2") pontos.tatico += 6;
      if (respostas[5].resposta === "2") pontos.tatico += 6;
      if (respostas[6].resposta === "1") pontos.tatico += 8;
      if (respostas[7].resposta >= 6) pontos.tatico += 10;
      if (respostas[8].resposta === "3") pontos.tatico += 4;
  
      // Fa Estético
      if (respostas[0].resposta === 2) pontos.estetico += 7;
      if (respostas[1].resposta === "3") pontos.estetico += 4;
      if (respostas[2].resposta === "4") pontos.estetico += 2;
      if (respostas[3].resposta === "1") pontos.estetico += 8;
      if (respostas[4].resposta === "4") pontos.estetico += 2;
      if (respostas[5].resposta === "3") pontos.estetico += 4;
      if (respostas[6].resposta === "2") pontos.estetico += 6;
      if (respostas[7].resposta <= 2) pontos.estetico += 7;
      if (respostas[8].resposta === "4") pontos.estetico += 2;
  
      // Furioso de Coração
      if (respostas[0].resposta === 4) pontos.furioso_de_coracao += 12;
      if (respostas[1].resposta === "4") pontos.furioso_de_coracao += 1;
      if (respostas[2].resposta === "3") pontos.furioso_de_coracao += 2;
      if (respostas[3].resposta === "3") pontos.furioso_de_coracao += 2;
      if (respostas[4].resposta === "1") pontos.furioso_de_coracao += 8;
      if (respostas[5].resposta === "1") pontos.furioso_de_coracao += 8;
      if (respostas[6].resposta === "3") pontos.furioso_de_coracao += 2;
      if (respostas[7].resposta >= 5 && respostas[7].resposta <= 6) pontos.furioso_de_coracao += 10;
      if (respostas[8].resposta === "1") pontos.furioso_de_coracao += 8;

      if (pontos.solo_player >= Math.max(pontos.tatico, pontos.estetico, pontos.furioso_de_coracao)) {
        mostrarResultadoPerfil(perfis.soloPlayer); 
      } else if (pontos.tatico >= Math.max(pontos.solo_player, pontos.estetico, pontos.furioso_de_coracao)) {
        mostrarResultadoPerfil(perfis.tatico);
      } else if (pontos.estetico >= Math.max(pontos.solo_player, pontos.tatico, pontos.furioso_de_coracao)) {
        mostrarResultadoPerfil(perfis.estetico);
      } else {
        mostrarResultadoPerfil(perfis.furioso);
      }
    }

    const botaoDescobrir = document.querySelector('.descobrir');
      if (botaoDescobrir) {
        botaoDescobrir.addEventListener('click', function (e) {
        e.preventDefault();
        calcularPontuacao();
      });
}
  
    // Exibe o resultado final
    function mostrarResultadoPerfil(perfil) {
      const modal = document.getElementById("modalPerfil");
      modal.querySelector("img").src = perfil.imagem;
  
      modal.classList.remove("escondido");
      modal.scrollIntoView({behavior: "smooth"});
    }
    
    // Quando o usuario clica no botao "fechar", reinicia o formulário
    window.fecharModal = function () {
      const modal = document.getElementById("modalPerfil");
      modal.classList.add("escondido");
  
      const inputs = document.querySelectorAll("input");
      inputs.forEach(input => {
        input.checked = false;
        input.classList.remove("selecionado");
      });
  
      window.scrollTo({top: 0, behavior: "smooth"});
    };
  
    // Quando o botao "salvar" é clicado, salva a imagem no dispositivo do usuario
    window.salvarImagem = function () {
      const imagem = document.querySelector("#modalPerfil img").src;
      const a = document.createElement("a");
      a.href = imagem;
      a.download = "meu-perfil-furia.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  
  });
  