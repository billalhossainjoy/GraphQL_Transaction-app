export const userSchema = `#graphql
    type User {
        id: ID!
		username: String!
		name: String!
		profilePicture: String
		gender: String!
		transactions: [Transaction!]
		refreshToken: String!
		accessToken: String!
    }

	type Query {
		authUser: User
		users: [User]
		user(userId: ID!) : User
	}

	type Mutation {
		signUp (input: SignUpInput!) : User
		login(input: LoginInput!): User
		logout: LogoutResponse
	}

	input SignUpInput {
		username : String!
		name: String!
		password: String!
		gender: String!
	}

	input LoginInput {
		username: String!
        password: String!
	}

	type LogoutResponse {
		message: String!
	}
`;
