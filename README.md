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
 - Observer
 - Singleton
 - Chain of Responsability