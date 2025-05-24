export type AdminUserType = {
    userId: string;
    email: string;
    type: 'admin' | 'sub-admin' | 'user';
};

export type LoginResult = {
    admin: AdminUserType;
    token: string;
}