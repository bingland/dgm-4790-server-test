const { nanoid } = require('nanoid') 

let forumData = [
	{
		"id": "S90ovVFpkAmfgKZLG-PIW",
		"name": "Funny",
		"description": "Welcome to the Funny forum! Here you'll find all sort of really funny things, like memes.",
		"comments": [
			{
				"id": "P5MUajqfoZh-mlFwsSqLy",
				"title": "Hi i'm a comment",
				"date": "1620011968641",
				"body": "Wow this forum is really really cool!!!! I can leave comments here.",
				"forum": "S90ovVFpkAmfgKZLG-PIW"
			},
			{
				"id": "Kmei7pY4IRqqbu9RRD053",
				"title": "Hi i'm another comment",
				"date": "1620011968641",
				"body": "I'm not sure what to put in the body for this comment but it's cool.",
				"forum": "S90ovVFpkAmfgKZLG-PIW"
			}
		]
	},
	{
		"id": "h2qSU2E33-S8uth6jiitn",
		"name": "Food",
		"description": "Welcome to the Food forum! Here you'll find all sort of delicious foods and recipes.",
		"comments": [
			{
				"id": "1flRDDY5zj91FrWJGyUF7",
				"title": "Wow I love this recipe",
				"date": "1620011968641",
				"body": "Wow this forum is really really cool!!!! I can leave comments here.",
				"forum": "h2qSU2E33-S8uth6jiitn"
			},
			{
				"id": "s3ffePJWW6hIXac3ilV6",
				"title": "This food looks really yummy!",
				"date": "1620011968641",
				"body": "I'm not sure what to put in the body for this comment but the food looks delicious.",
				"forum": "h2qSU2E33-S8uth6jiitn"
			}
		]
	},
	{
		"id": "CMRZJwTg8jrdHvClVqvep",
		"name": "Awww",
		"description": "Welcome to Awww! Find the cutest images that will make you say \"awwwww\"!",
		"comments": [],
	},
	{
		"id": "bgdiBiWzC4N8iO8DhIhR4",
		"name": "Programming",
		"description": "Welcome to Programming! Connect with other programmers about anything.",
		"comments": [],
	},
]

const getCommentIndexes = (id) => {
	const forumIndex = forumData.findIndex(forum => {
		for (let comment of forum.comments) {
			if (comment.id === id) {
				return true
			}
		}
		return false
	})

	const commentIndex = forumData[forumIndex].comments.findIndex(comment => comment.id === id)

	return {
		forumIndex: forumIndex,
		commentIndex: commentIndex
	}
}

// Ideas for Forums
// Funny, Food, Aww, Programming

const {
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat,
	GraphQLScalarType
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
		},
		editComment: {
			type: CommentType,
			description: 'Edit a comment',
			args: {
				id: { type: GraphQLNonNull(GraphQLString) },
				title: { type: GraphQLNonNull(GraphQLString) },
				body: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				const {forumIndex, commentIndex} = getCommentIndexes(args.id)

				const prevComment = forumData[forumIndex].comments[commentIndex]
				const comment = { id: args.id, date: prevComment.date, title: args.title, body: args.body, forum: prevComment.forum }
				forumData[forumIndex].comments[commentIndex] = comment
				return comment
			}
		},
		deleteComment: {
			type: ForumType,
			description: 'Delete a comment',
			args: {
				id: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				let {forumIndex, commentIndex} = getCommentIndexes(args.id)
				forumData[forumIndex].comments.splice(commentIndex, 1)
				return forumData[forumIndex]
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
    },
		comment: {
			type: new GraphQLNonNull(CommentType),
			description: 'A single comment',
			args: {
				id: { type: GraphQLString }
			},
			resolve: (parents, args) => {
				let { forumIndex, commentIndex } = getCommentIndexes(args.id)
				return forumData[forumIndex].comments[commentIndex]
			}
		}
  })
})


module.exports = new GraphQLSchema({
  query: RootQuery,
	mutation: RootMutationType
})