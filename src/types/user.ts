export interface User {
    _id:       string;
    name:      string;
    lastname:  string;
    username:  string;
    description: string;
    image:     string;
    links:     string;
    email:     string;
    createdAt: Date;
    updatedAt: Date;    
}

export interface PublicUser extends Omit<User, '_id' | 'createdAt' | 'updatedAt'> {
    [key: string]: string; // Interface extends Omit to create public user type
}
