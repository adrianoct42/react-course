import { useEffect } from "react";

export function useKey(key, action) {
  // O eventListener abaixo serve para que o usuário possa fechar o modal de detalhes do filme
  // ao apertar a tecla ESC, sem precisar clicar no botão de fechar.
  // O useEffect está cuidando de ADICIONAR esse eventListener, e remover quando o componente for desmontado.
  // Caso não seja removido, o eventListener ficará ativo mesmo após o componente ser desmontado.
  // O que criaria INÚMEROS eventListeners ativos, consumindo memória e processamento.
  // Em grandes aplicações, isso poderia ser problemático.

  useEffect(() => {
    function callBack(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    document.addEventListener("keydown", callBack);

    return function () {
      document.removeEventListener("keydown", callBack);
    };
  }, [action, key]);
}
