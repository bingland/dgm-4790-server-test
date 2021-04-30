const { nanoid } = require('nanoid') 

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
				"forum": "0000"
			},
			{
				"id": "0001",
				"title": "Hi i'm another comment",
				"date": "2:30 am 2/5/2021",
				"body": "I'm not sure what to put in the body for this comment but it's cool.",
				"forum": "0000"
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
				"forum": "0001"
			},
			{
				"id": "0003",
				"title": "This food looks really yummy!",
				"date": "5:30 am 2/15/2021",
				"body": "I'm not sure what to put in the body for this comment but the food looks delicious.",
				"forum": "0001"
			}
		]
	},
	{
		"id": "0002",
		"name": "Awww",
		"description": "Welcome to Awww! Find the cutest images that will make you say \"awwwww\"",
		"comments": [],
		"forum": "0002"
	},
	{
		"id": "0003",
		"name": "Programming",
		"description": "Welcome to Programming! Connect with other programmers about anything.",
		"comments": [],
		"forum": "0003"
	},
]

// Ideas for Forums
// Funny, Food, Aww, Programming

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
		forum: { type: GraphQLNonNull(GraphQLString) }
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

// root queries
const RootMutationType = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root Mutation',
	fields: () => ({
		addComment: {
			type: CommentType,
			description: 'Add a comment',
			args: {
				title: { type: GraphQLNonNull(GraphQLString) },
				body: { type: GraphQLNonNull(GraphQLString) },
				forum: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				const comment = { id: nanoid(), date: new Date, title: args.title, body: args.body, forum: args.forum }
				forumData[forumData.findIndex(forum => forum.id === args.forum)].comments.push(comment)
				return comment
			}
		}
	})
})

const RootQuery = new GraphQLObjectType({
  name: 'Query', 
  description: 'Root Query',
  fields: () => ({
    forum: {
      type: new GraphQLList(ForumType),
      description: 'A single forum',
			args: {
				id: { type: GraphQLString}
			},
      resolve: (parent, args) => [forumData.find(forum => forum.id === args.id)]
    },
		forums: {
      type: new GraphQLList(ForumType),
      description: 'List of forums',
      resolve: () => forumData
    }
  })
})



module.exports = new GraphQLSchema({
  query: RootQuery,
	mutation: RootMutationType
})