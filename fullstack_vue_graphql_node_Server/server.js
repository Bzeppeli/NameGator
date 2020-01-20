const { ApolloServer } = require("apollo-server");

console.log(ApolloServer);

const typeDefs = `
    type item {
        id: Int
        type: String
        description: String
    }

    type Query {
        prefixos: [item]
        sufixos: [item]
    }


`;

const items = [
    { id : 1, type: "prefixo", description: "mota mota"},
    { id : 2, type: "prefixo", description: "das neves"},
    { id : 3, type: "prefixo", description: "muito"},
    {id : 4, type: "sufixo", description: "diabo"}
];

const resolvers = {
    Query: {
        prefixos() {
            return items.filter(item => item.type === "prefixo");
        },
         sufixos(){
            return items.filter(item => item.type === "sufixo");
        }
    }
}

const server =  new ApolloServer({ typeDefs, resolvers });
server.listen();
