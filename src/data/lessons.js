export const lessons = [
  {
    id: 1,
    title: "O que é um Banco de Dados?",
    icon: "🗄️",
    content: `Um banco de dados é uma coleção organizada de informações estruturadas, armazenadas eletronicamente. Pense nele como uma planilha gigante e super poderosa.

Por exemplo, uma loja virtual precisa guardar informações de produtos, clientes e pedidos. Um banco de dados organiza tudo isso de forma eficiente, permitindo buscar, atualizar e relacionar informações rapidamente.

Os dados ficam organizados em tabelas, que são como planilhas com linhas e colunas. Cada linha é um registro (ex: um cliente) e cada coluna é um atributo (ex: nome, email, telefone).

Exemplos do mundo real:
• Instagram guarda fotos, curtidas e seguidores em bancos de dados
• Bancos guardam saldos e transações
• Netflix armazena filmes e histórico de visualização`,
  },
  {
    id: 2,
    title: "O que é SQL?",
    icon: "💬",
    content: `SQL (Structured Query Language) é a linguagem usada para comunicar com bancos de dados relacionais. Com SQL você pode criar, ler, atualizar e deletar dados.

SQL é declarativo: você diz O QUE quer, não COMO fazer. O banco de dados descobre o melhor caminho.

Os principais comandos SQL se dividem em categorias:
• DDL (Data Definition Language): CREATE, ALTER, DROP
• DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE
• DCL (Data Control Language): GRANT, REVOKE

SQL é padronizado e funciona em quase todos os bancos: MySQL, PostgreSQL, SQLite, SQL Server, Oracle. A sintaxe é muito similar entre eles.

Exemplo básico:
SELECT nome FROM clientes WHERE cidade = 'São Paulo';`,
  },
  {
    id: 3,
    title: "CREATE TABLE — Criando Tabelas",
    icon: "🏗️",
    content: `O comando CREATE TABLE cria uma nova tabela no banco de dados. Você define o nome da tabela e suas colunas com seus tipos de dados.

Sintaxe básica:
CREATE TABLE nome_tabela (
  coluna1 TIPO_DADO,
  coluna2 TIPO_DADO,
  ...
);

Tipos de dados comuns:
• INT — números inteiros
• VARCHAR(n) — texto de até n caracteres
• TEXT — texto longo
• DECIMAL(p,s) — números decimais
• DATE — datas (AAAA-MM-DD)
• BOOLEAN — verdadeiro/falso

Exemplo prático:
CREATE TABLE clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE,
  idade INT,
  criado_em DATE
);

PRIMARY KEY identifica cada linha unicamente. AUTO_INCREMENT gera o número automaticamente. NOT NULL impede valores vazios.`,
  },
  {
    id: 4,
    title: "INSERT INTO — Inserindo Dados",
    icon: "➕",
    content: `O comando INSERT INTO adiciona novas linhas em uma tabela.

Sintaxe com todas as colunas:
INSERT INTO tabela VALUES (val1, val2, val3);

Sintaxe especificando colunas (recomendada):
INSERT INTO tabela (coluna1, coluna2) VALUES (val1, val2);

Exemplos práticos:
INSERT INTO clientes (nome, email, idade)
VALUES ('João Silva', 'joao@email.com', 28);

Inserindo múltiplos registros de uma vez:
INSERT INTO clientes (nome, email, idade)
VALUES
  ('Maria Santos', 'maria@email.com', 32),
  ('Pedro Costa', 'pedro@email.com', 25),
  ('Ana Lima', 'ana@email.com', 29);

Textos são sempre entre aspas simples. Números não precisam de aspas. Colunas com AUTO_INCREMENT não precisam ser informadas.`,
  },
  {
    id: 5,
    title: "SELECT — Consultando Dados",
    icon: "🔍",
    content: `O SELECT é o comando mais usado em SQL. Ele recupera dados de uma ou mais tabelas.

Sintaxe básica:
SELECT coluna1, coluna2 FROM tabela;

Selecionar todas as colunas:
SELECT * FROM clientes;

Selecionar colunas específicas:
SELECT nome, email FROM clientes;

Usar alias para renomear colunas:
SELECT nome AS cliente, email AS contato FROM clientes;

Selecionar valores únicos (sem repetição):
SELECT DISTINCT cidade FROM clientes;

Ordenar resultados:
SELECT nome, idade FROM clientes ORDER BY idade DESC;
-- ASC = crescente (padrão), DESC = decrescente

Limitar resultados:
SELECT nome FROM clientes LIMIT 10;

Combinando:
SELECT nome, email FROM clientes ORDER BY nome ASC LIMIT 5;`,
  },
  {
    id: 6,
    title: "WHERE — Filtrando Resultados",
    icon: "🔎",
    content: `A cláusula WHERE filtra os registros que atendem a uma condição.

Sintaxe:
SELECT * FROM tabela WHERE condição;

Operadores de comparação:
• = igual
• != ou <> diferente
• > maior que, < menor que
• >= maior ou igual, <= menor ou igual

Exemplos:
SELECT * FROM clientes WHERE idade > 18;
SELECT * FROM clientes WHERE cidade = 'Rio de Janeiro';
SELECT * FROM clientes WHERE nome != 'Admin';

Operadores lógicos:
SELECT * FROM clientes WHERE idade > 18 AND cidade = 'SP';
SELECT * FROM clientes WHERE cidade = 'SP' OR cidade = 'RJ';
SELECT * FROM clientes WHERE NOT ativo = false;

Outros operadores úteis:
-- BETWEEN (intervalo)
SELECT * FROM produtos WHERE preco BETWEEN 10 AND 50;

-- IN (lista de valores)
SELECT * FROM clientes WHERE cidade IN ('SP', 'RJ', 'BH');

-- LIKE (busca por padrão)
SELECT * FROM clientes WHERE nome LIKE 'J%';  -- começa com J
SELECT * FROM clientes WHERE email LIKE '%@gmail.com';`,
  },
  {
    id: 7,
    title: "UPDATE — Atualizando Dados",
    icon: "✏️",
    content: `O comando UPDATE modifica dados existentes em uma tabela.

Sintaxe:
UPDATE tabela SET coluna1 = valor1, coluna2 = valor2 WHERE condição;

⚠️ ATENÇÃO: Sempre use WHERE no UPDATE! Sem WHERE, TODOS os registros serão alterados.

Exemplos:
-- Atualizar o email de um cliente específico
UPDATE clientes SET email = 'novo@email.com' WHERE id = 5;

-- Atualizar múltiplas colunas
UPDATE clientes
SET nome = 'João Silva Jr.', cidade = 'São Paulo'
WHERE id = 5;

-- Atualizar todos de uma cidade (use com cuidado)
UPDATE clientes SET desconto = 10 WHERE cidade = 'SP';

-- Atualizar com base no valor atual
UPDATE produtos SET preco = preco * 1.10 WHERE categoria = 'eletrônicos';
-- Isso aumenta o preço em 10%

Boas práticas:
• Sempre teste com SELECT antes de fazer UPDATE
• Use WHERE específico (preferencialmente por ID)
• Faça backup antes de atualizações em massa`,
  },
  {
    id: 8,
    title: "DELETE — Removendo Dados",
    icon: "🗑️",
    content: `O comando DELETE remove registros de uma tabela.

Sintaxe:
DELETE FROM tabela WHERE condição;

⚠️ ATENÇÃO: Sem WHERE, TODOS os registros da tabela serão deletados! Esta ação geralmente não pode ser desfeita.

Exemplos:
-- Deletar um cliente específico
DELETE FROM clientes WHERE id = 10;

-- Deletar clientes inativos
DELETE FROM clientes WHERE ativo = false;

-- Deletar registros antigos
DELETE FROM logs WHERE data < '2023-01-01';

TRUNCATE vs DELETE:
-- DELETE remove linha por linha (pode ter WHERE)
DELETE FROM logs;

-- TRUNCATE remove tudo de uma vez (mais rápido, sem WHERE)
TRUNCATE TABLE logs;

Boas práticas:
• Sempre use WHERE (quase sempre!)
• Teste com SELECT antes para ver o que será deletado
• Considere usar "soft delete" (coluna ativo = false) em vez de deletar de verdade
• Verifique se há registros relacionados em outras tabelas`,
  },
  {
    id: 9,
    title: "JOIN — Unindo Tabelas",
    icon: "🔗",
    content: `JOIN combina linhas de duas ou mais tabelas com base em uma coluna relacionada.

Imagine: tabela clientes e tabela pedidos. Cada pedido tem um cliente_id. JOIN une essas tabelas.

INNER JOIN — só retorna registros que têm correspondência em AMBAS as tabelas:
SELECT clientes.nome, pedidos.total
FROM clientes
INNER JOIN pedidos ON clientes.id = pedidos.cliente_id;

LEFT JOIN — retorna TODOS os registros da tabela da esquerda + correspondências da direita:
SELECT clientes.nome, pedidos.total
FROM clientes
LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;
-- Clientes sem pedidos aparecem com NULL em pedidos.total

RIGHT JOIN — retorna TODOS da direita + correspondências da esquerda.

Usando aliases para simplificar:
SELECT c.nome, p.total, p.data
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
WHERE p.total > 100
ORDER BY p.data DESC;

JOIN com múltiplas tabelas:
SELECT c.nome, p.total, pr.nome AS produto
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
JOIN produtos pr ON p.produto_id = pr.id;`,
  },
  {
    id: 10,
    title: "Funções de Agregação",
    icon: "📊",
    content: `Funções de agregação calculam um valor a partir de múltiplas linhas.

Principais funções:
• COUNT() — conta registros
• SUM() — soma valores
• AVG() — calcula média
• MAX() — valor máximo
• MIN() — valor mínimo

Exemplos:
-- Total de clientes
SELECT COUNT(*) AS total_clientes FROM clientes;

-- Total de vendas
SELECT SUM(total) AS receita_total FROM pedidos;

-- Ticket médio
SELECT AVG(total) AS ticket_medio FROM pedidos;

-- Pedido mais caro e mais barato
SELECT MAX(total) AS maior, MIN(total) AS menor FROM pedidos;

GROUP BY — agrupa resultados para aplicar agregação:
-- Total de pedidos por cliente
SELECT cliente_id, COUNT(*) AS qtd_pedidos, SUM(total) AS total_gasto
FROM pedidos
GROUP BY cliente_id;

HAVING — filtra grupos (como WHERE mas para grupos):
-- Clientes com mais de 5 pedidos
SELECT cliente_id, COUNT(*) AS qtd_pedidos
FROM pedidos
GROUP BY cliente_id
HAVING COUNT(*) > 5;

Combinando tudo:
SELECT c.nome, COUNT(p.id) AS pedidos, SUM(p.total) AS total
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nome
HAVING SUM(p.total) > 500
ORDER BY total DESC;`,
  },
]
