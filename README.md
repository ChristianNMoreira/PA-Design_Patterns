# Design Patterns

**PA 24.1**

**Christian Noronha Moreira** - 
**119041991**

## Patterns

 - IIFE
   - Implementação do algoritmo criptográfico RC4 para 3 mensagens com a mesma chave. O algoritmo se divide em três passos:
     - O primeiro passo, KSA, usa apenas a chave para retornar um array chamado S-Box.
     - O segundo passo, PRGA, usa o array S-Box do passo anterior e a mensagem original para gerar uma chave chamada `key-stream`.
     - O último passo aplica um XOR entre a mensagem original e a `key-stream`, para gerar a mensagem cifrada.
   - Para 3 mensagens, apenas o segundo e o terceiro passo devem ser executados 3 vezes, enquanto o primeiro só precisa ser executado uma vez. Com isso, a IIFE está no primeiro passo.
 - Factory
   - Cenário de uma instituição financeira com empréstimos (CCB) e fianças. A classe `Proposta` é a criadora dos produtos.
 - Observer
   - Observadores são torcedores de certos times, e o evento é o início da partida.
 - Singleton
   - O cenário é o do uso de Logs de alguma aplicação. Toda a aplicação deverá fazer registros de eventos no mesmo arquivo de log, o que explica uma instância única para isso.
 - Chain of Responsability
   - Usando o mesmo cenário do Factory, foram adicionadas validações para uma proposta de operação. Clientes são adicionados em um banco de dados (classe `DataBase`) com restrições para valor em operações e número de operações. No momento da proposta, validadores encadeados permitirão ou não a liberação da operação.
 - Adapter
   - No cenário existem duas formas de se representar operações, aberta em parcelas e consolidada, podendo ser formas como dois módulos diferentes vêem as operações. Com a necessidade da representação de qualquer operação da forma consolidada, a presença do adaptador é necessária para as operações abertas em parcelas.