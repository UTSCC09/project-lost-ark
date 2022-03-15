const resolvers = {
    Query: {
        coins: async() => {

        }
    },
    Mutation: {
        signup: async (_, { username, password }, { dataSources }) => {
            await dataSources.dbAPI.insertUser(username, password)
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    console.error(err);
                });

        },

    },
};

module.exports = { resolvers };