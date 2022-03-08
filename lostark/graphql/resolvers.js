const resolvers = {
    Query: {
        user: async () => {
            return new Promise((resolve, reject) => {

            })
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