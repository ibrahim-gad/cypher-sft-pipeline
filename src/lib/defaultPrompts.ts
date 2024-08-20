const defaultSystemPromptPrompt = `We are creating a complex system prompt for an llm

We wanna use the llm as assistant to help in [[domain]], especially [[subdomain]].

The prompt must be realistic. Consider that the system message is a message from the developer / operator of the bot, it must include accurate, relevant, and reliable information.

**Example:**
Domain: Education especially Education Platforms
Respective system prompt:
\`\`\`
You are an advanced AI assistant specializing in Neo4j graph databases, with particular expertise in complex educational content management systems and intricate Cypher queries. Your primary function is to assist content curators in navigating and querying a sophisticated graph database of online courses, instructors, institutions, topics, and their multifaceted relationships.

**Rules of Engagement:**
- Always offer to elaborate on any part of your explanation if the user requests it.
- Maintain a professional, educational tone while being approachable and patient.
- When suggesting queries, always explain the logic behind them and how they relate to the complex educational content graph structure.
- Provide detailed explanations of query components, their purpose, and how they interact within the larger database schema.

**Conversation Tone:**
- Your tone should be knowledgeable, clear, concise, and supportive, ensuring users feel confident and comfortable seeking assistance with their Cypher queries, especially when dealing with the intricacies of multi-label properties and complex relationships.
- Use technical language appropriate for database professionals, but be prepared to explain concepts in simpler terms if requested.

**Key Concepts:**
1. Multi-Label Property Queries:
   These queries are designed to retrieve nodes that possess multiple specified labels simultaneously. In the context of educational content, this is crucial for identifying courses that span multiple disciplines or topics. Multi-label queries allow for precise filtering of content based on interdisciplinary classifications, enabling curators to find courses that truly bridge different subject areas. This concept is fundamental in creating targeted recommendations for users interested in cross-disciplinary studies.

2. Multi-Label Property Retrieval:
   This concept involves not just identifying nodes with multiple labels, but also retrieving and analyzing properties associated with these multi-labeled nodes. It's essential for gathering comprehensive information about courses that bridge multiple subjects. By retrieving properties from multi-labeled nodes, curators can access detailed metadata about courses, such as difficulty levels, prerequisites, or learning outcomes, across different disciplinary categorizations. This allows for nuanced content recommendations based on a user's specific interests and skill levels across multiple domains.

3. Complex Relationship Traversal:
   In educational content graphs, relationships can be intricate, involving courses, topics, subtopics, instructors, and institutions. Queries often need to traverse multiple relationship types to gather relevant information. This concept is crucial for understanding the interconnectedness of educational content and stakeholders. It allows curators to explore how courses relate to various topics, how instructors are connected to institutions and courses, and how different educational elements are linked in the broader academic ecosystem.

4. Hierarchical Topic Structures:
   Educational content often has hierarchical topic structures. Queries need to navigate these hierarchies to find relevant courses. This concept is vital for understanding the organization of knowledge within the database. It allows for the exploration of broader topics and their subtopics, enabling curators to recommend courses that not only match specific interests but also provide a comprehensive understanding of the subject area. Hierarchical querying can reveal relationships between generalized and specialized topics, facilitating the creation of learning pathways and curriculum planning.

5. Course-Instructor-Institution Relationships:
   The database contains complex relationships between courses, their instructors, and the institutions offering them. Understanding and querying these relationships is crucial for providing context to course recommendations. This concept allows curators to consider factors such as instructor expertise, institutional reputation, and collaborative offerings when making recommendations. It enables the creation of multi-faceted queries that can, for instance, find courses taught by renowned experts in a field or offered by prestigious institutions, adding depth to the recommendation process.

6. Performance Optimization for Complex Queries:
   Given the intricate nature of the educational content graph, performance optimization is crucial. This involves understanding indexing strategies, query planning, and efficient data modeling. Curators need to be aware of how to structure their queries to minimize computational load, especially when dealing with large datasets. This concept includes techniques such as strategic use of indexes, efficient path traversal methods, and appropriate use of aggregation functions to ensure that complex queries can be executed in a timely manner, even on large-scale educational databases.

Remember to guide users through constructing queries that may involve multiple labels, complex relationship patterns, and hierarchical structures. Always consider performance implications for large-scale educational databases. Be prepared to discuss indexing strategies, query optimization techniques, and efficient ways to handle multi-label properties when appropriate. Your role is to empower content curators to leverage the full potential of the graph database in creating sophisticated, tailored course recommendations.
\`\`\`
---
Domain: [[domain]], especially [[subdomain]]
---
Respective system prompt: Please create a system prompt.
---
- Key Concepts should contain info about [[taxonomyL1]] + [[taxonomyL2]].
- System prompt need to be detailed.
- No need to provide any example queries.
- Please put this whole answer in a text code block
`
const defaultSchemaPrompt = `We want to create a schema for a scenario where [[scenario]].

**Example**
Scenario: A content curator is exploring a graph database of articles and authors. They need to find articles that are co-authored by individuals who have collaborated with a specific author. They discuss how to write nested Cypher queries to uncover these collaborative relationships.
Schema:
\`\`\`
// Nodes (Entities)
(Author)
  - id: INTEGER, UNIQUE
  - name: STRING, REQUIRED
  - h_index: INTEGER
  - research_areas: LIST OF STRING

(Article)
  - id: INTEGER, UNIQUE
  - title: STRING, REQUIRED
  - abstract: STRING
  - doi: STRING, UNIQUE
  - publication_date: DATE
  - citation_count: INTEGER

(Institution)
  - id: INTEGER, UNIQUE
  - name: STRING, REQUIRED
  - country: STRING
  - type: STRING

(Journal)
  - id: INTEGER, UNIQUE
  - name: STRING, REQUIRED
  - impact_factor: FLOAT
  - field: STRING

// Relationships
(Author)-[AUTHORED]->(Article)

(Author)-[AFFILIATED_WITH]->(Institution)

(Author)-[COLLABORATED_WITH]->(Author)

(Article)-[PUBLISHED_IN]->(Journal)

// Indexes
INDEX ON :Author(name)
INDEX ON :Article(title)
INDEX ON :Institution(name)
INDEX ON :Journal(name)

// Constraints
CONSTRAINT ON (a:Author) ASSERT a.id IS UNIQUE
CONSTRAINT ON (ar:Article) ASSERT ar.id IS UNIQUE
CONSTRAINT ON (ar:Article) ASSERT ar.doi IS UNIQUE
CONSTRAINT ON (i:Institution) ASSERT i.id IS UNIQUE
CONSTRAINT ON (j:Journal) ASSERT j.id IS UNIQUE

CONSTRAINT ON (a:Author) ASSERT EXISTS(a.name)
CONSTRAINT ON (ar:Article) ASSERT EXISTS(ar.title)
CONSTRAINT ON (i:Institution) ASSERT EXISTS(i.name)
CONSTRAINT ON (j:Journal) ASSERT EXISTS(j.name)
\`\`\`
---
Scenario: [[scenario]].

- Please suggest a big enterprise-level schema, meaning every entity should have all the properties it needs, for example created and modified dates and any related info.
- Again the properties of every node has to be comprehensive.
- Relationships as well, we need to add any important properties a relationship might need.
- For the id fields in schema don't use \`id\` as key instead prefix it with the node name.
- There is no datatype in cypher called MAP.
- The queries on this schema will focus on [[taxonomyL1]] + [[taxonomyL2]].
- We don't need any example queries or create scrips or call directives.
- Please put this whole answer in a text code block
- For internal code blocks please escape them with \\ in front of "\`\`\`"
`
const defaultUserQuestionsPrompt = `Given this system prompt
\`\`\`
[[systemPrompt]]
\`\`\`
We want to imagine a conversation between a user and llm, the conversation is again about: [[scenario]]

- In the first turn the user has describe the schema, here is the schema:
\`\`\`
[[schema]]
\`\`\`
- The Key Concepts of the conversation: [[taxonomyL1]] + [[taxonomyL2]].
- Please don't describe the requested query as easy or complex.
- The conversation is multi turn conversation
- The user should get directly into the query he wants, not ask about opinions or anything.
- The conversation should be about developing a single query.
- The difficulty of the scenario should be: **Hard**

Please provide example questions of the user, only the user no need for the llm responses.

- Don't forget to describe the schema in the first turn.
- The user question should be provided as json like this [{"turn": 1, "question": ""}].
- For object values replace new lines with \\n.
- Please put this whole answer in a text code block.
- Don't omit Indexes and constraints.
- For internal code blocks please escape them with \\ in front of "\`\`\`"
`
const defaultSampleDataPrompt = `Given the following neo4j database schema:
\`\`\`
[[schema]]
\`\`\`

And here are the expected user quesions:
\`\`\`
[[userQuestions]]
\`\`\`

- Please create sample data for an enterprise database that covers all the conditions of the relationship between entities.
- The data should yield at least 10 results for every query.
- Use one CREATE directive and separate objects by commas.
- For any dates (if any) use the correct data type by using date().
- Please note that today is August 10th 2024.
- Please create a sample data that yields results for the expected user questions.
- Please consider the properties on all entities and relationships as required.
- Use real name for objects in the sample data instead of a1, a2, a3....
`
const defaultFirstTurnPrompt = `Please start with answering this question
\`\`\`
[[firstTurnQuestion]]
\`\`\`
With a correct query and a very detailed explanation.

- Add comments inside the query when possible.
- The explanation of the query must be very detailed, like very very detailed, clause by clause.
- Please include in the result the nodes in question as graph nodes not strings and their relationships that exist in the query.
- Please use meaningful names for the returned nodes, not p1 and a1 and things like that.

- Please put this whole answer in a text code block.
- For internal code blocks please escape them with \\ in front of "\`\`\`".
`
const defaultRemainingTurnsPrompt = `Next question.
\`\`\`
[[FOLLOW_UP]]
\`\`\`
- You have to update on the query from the last answer.
- The explanation of the query changes must be very detailed, like very very detailed.
- Please include in the result the nodes in question as graph nodes not strings and their relationships that exist in the query.
- Please put this whole answer in a text code block
- For internal code blocks please escape them with \\ in front of "\`\`\`"
`

const defaultCleanSchemaPrompt = `We have This schema:
\`\`\`
[[schema]]
\`\`\`
We want to clean it to only include things used in these queries:
\`\`\`
[[firstTurn]]
[[remainingTurns]]
\`\`\`
`
export {
    defaultSystemPromptPrompt,
    defaultSchemaPrompt,
    defaultUserQuestionsPrompt,
    defaultSampleDataPrompt,
    defaultFirstTurnPrompt,
    defaultRemainingTurnsPrompt,
    defaultCleanSchemaPrompt
};