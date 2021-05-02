const { PrismaClient } = require('@prisma/client')

const forumData = [
	{
		"name": "Funny",
		"description": "Welcome to the Funny forum! Here you'll find all sort of really funny things, like memes.",
		"comments": {
      create: [
      ]
    }
	},
	{
		"name": "Food",
		"description": "Welcome to the Food forum! Here you'll find all sort of delicious foods and recipes.",
		"comments": {
      create: [
      ]
    }
	},
	{
		"name": "Awww",
		"description": "Welcome to Awww! Find the cutest images that will make you say \"awwwww\"",
		"comments": {create: []}
	},
	{
		"name": "Programming",
		"description": "Welcome to Programming! Connect with other programmers about anything.",
		"comments": {create: []}
	},
]

const prisma = new PrismaClient()

async function main () {
  for (let forum of forumData) {
    await prisma.forumType.create({
      data: forum
    })
  }
}

main().catch(e => {
  console.log(e)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})