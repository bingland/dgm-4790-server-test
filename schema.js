const { nanoid } = require('nanoid') 

let forumData = [
	{
		"id": "S90ovVFpkAmfgKZLG-PIW",
		"name": "Funny",
		"description": "Welcome to the Funny forum! Here you'll find all sort of really funny things, like memes.",
		"comments": [
			{
				"id": "P5MUajqfoZh-mlFwsSqLy",
				"title": "Wow this food looks really yummy",
				"date": "1620011968641",
				"body": "Id interdum velit laoreet id donec ultrices tincidunt. Enim lobortis scelerisque fermentum dui faucibus in. Nibh ipsum consequat nisl vel pretium lectus. Nec ullamcorper sit amet risus nullam eget felis eget nunc. Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Lobortis mattis aliquam faucibus purus in. Justo donec enim diam vulputate ut pharetra sit. Tempus quam pellentesque nec nam aliquam sem et. Cursus risus at ultrices mi. Dictum sit amet justo donec enim diam.",
				"forum": "S90ovVFpkAmfgKZLG-PIW"
			},
			{
				"id": "Kmei7pY4IRqqbu9RRD053",
				"title": "Look at this cool recipe I found!",
				"date": "1620011968641",
				"body": "Sed enim ut sem viverra aliquet. In nibh mauris cursus mattis molestie a iaculis at erat. Placerat vestibulum lectus mauris ultrices eros. Quam viverra orci sagittis eu volutpat odio facilisis mauris sit. Proin libero nunc consequat interdum varius sit amet. Ullamcorper morbi tincidunt ornare massa eget egestas. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Enim tortor at auctor urna nunc id. Iaculis nunc sed augue lacus viverra vitae. Erat pellentesque adipiscing commodo elit at imperdiet. Integer malesuada nunc vel risus commodo viverra maecenas. Eget arcu dictum varius duis at consectetur lorem donec. Vel quam elementum pulvinar etiam non quam. Aliquam sem fringilla ut morbi tincidunt. Adipiscing diam donec adipiscing tristique risus nec feugiat. Enim lobortis scelerisque fermentum dui faucibus in ornare.",
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
				"body": "Mauris rhoncus aenean vel elit. Ac placerat vestibulum lectus mauris ultrices eros in cursus. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Egestas dui id ornare arcu odio ut. Augue mauris augue neque gravida in. Nulla pellentesque dignissim enim sit. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Ultrices dui sapien eget mi proin sed libero enim sed. Maecenas ultricies mi eget mauris pharetra et ultrices. In massa tempor nec feugiat nisl pretium fusce id. Placerat orci nulla pellentesque dignissim enim sit amet.",
				"forum": "h2qSU2E33-S8uth6jiitn"
			},
			{
				"id": "s3ffePJWW6hIXac3ilV6",
				"title": "This food looks really yummy!",
				"date": "1620011968641",
				"body": "In egestas erat imperdiet sed euismod nisi. Aliquam eleifend mi in nulla posuere. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Nunc lobortis mattis aliquam faucibus purus in massa tempor. Cursus euismod quis viverra nibh cras pulvinar mattis. Habitant morbi tristique senectus et. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Vestibulum lorem sed risus ultricies. Mauris augue neque gravida in fermentum et sollicitudin. Urna nunc id cursus metus aliquam eleifend mi in nulla. Risus sed vulputate odio ut enim blandit volutpat maecenas volutpat. Ornare arcu odio ut sem nulla pharetra diam. Eget velit aliquet sagittis id consectetur purus ut. Ultrices sagittis orci a scelerisque purus semper eget duis at.",
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