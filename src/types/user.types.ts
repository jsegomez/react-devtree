export type User = {
    name: string;
    lastname: string;
    email: string;
    nickname: string;
    description: string;
    image: string;
}

export type RegisterForm = Pick<User, 'name' | 'lastname' | 'email' | 'nickname'> & {
    password: string;
    password_confirmation: string;
}

export type LoginForm = Pick<User, 'email'> & { password: string };

export type ProfileForm = Pick<User, 'nickname' | 'description' | 'image'>