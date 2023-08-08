export type TUser = {
    email: string;
    name: string;
    password?: string;
}

export type TUserWithPassword = TUser & {
    password: string;
}

export type TUserPasswordAndEmail = Omit<TUserWithPassword, 'name'>;