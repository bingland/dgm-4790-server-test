let forumData = [
	{
		"id": "0000",
		"name": "Funny",
		"description": "Welcome to the Funny forum! Here you'll find all sort of really funny things, like memes.",
		"comments": [
			{
				"id": "0000",
				"title": "Hi i'm a comment",
				"date": "12:30 pm 1/3/2021",
				"body": "Wow this forum is really really cool!!!! I can leave comments here.",
			},
			{
				"id": "0001",
				"title": "Hi i'm another comment",
				"date": "2:30 am 2/5/2021",
				"body": "I'm not sure what to put in the body for this comment but it's cool.",
			}
		]
	},
	{
		"id": "0001",
		"name": "Food",
		"description": "Welcome to the Food forum! Here you'll find all sort of delicious foods and recipes.",
		"comments": [
			{
				"id": "0002",
				"title": "Wow I love this recipe",
				"date": "3:30 pm 3/3/2021",
				"body": "Wow this forum is really really cool!!!! I can leave comments here.",
			},
			{
				"id": "0003",
				"title": "This food looks really yummy!",
				"date": "5:30 am 2/15/2021",
				"body": "I'm not sure what to put in the body for this comment but the food looks delicious.",
			}
		]
	}
]

const {
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} = require('graphql')

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'This represents a comment',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLNonNull(GraphQLString) },
  })
})

const ForumType = new GraphQLObjectType({
  name: 'Forum',
  description: 'This represents a forum',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
		comments: {	type: new GraphQLList(CommentType) }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'Query', 
  description: 'Root Query',
  fields: () => ({
    forums: {
      type: new GraphQLList(ForumType),
      description: 'List of forums',
			args: {
				id: { type: GraphQLString}
			},
      resolve: (parent, args) => [forumData.find(forum => forum.id === args.id)]
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
})