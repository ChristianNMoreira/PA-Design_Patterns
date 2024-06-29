# Design Patterns

**PA 24.1**

**Christian Noronha Moreira** - 
**119041991**

## Patterns

 - IIFE
   - Implementação do algoritmo criptográfico RC4 para 3 mensagens com a mesma chave. O algoritmo se divide em três passos:
     - O primeiro passo, KSA, usa apenas a chave para retornar um array chamado S-Box.
     - O segundo passo, PRGA, usa o array S-Box do passo anterior e a mensagem original para gerar uma chave chamada key-stream.
     - O último passo aplica um XOR entre a mensagem original e a key-stream, para gerar a mensagem cifrada.
   - Para 3 mensagens, apenas o segundo e o terceiro passo devem ser executados 3 vezes, enquanto o primeiro só precisa ser executado uma vez. Com isso, a IIFE está no primeiro passo.
 - Factory
   - Cenário de uma instituição financeira com empréstimos (CCB) e fianças. A classe proposta é a criadora dos produtos.
 - Observer
   - Observadores são torcedores de certos times, e o evento é o início da partida.
 - Singleton
   - O cenário é o do uso de Logs de alguma aplicação. Toda a aplicação deverá fazer registros de eventos no mesmo arquivo de log, o que explica uma instância única para isso.
 - Chain of Responsability
