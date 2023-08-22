export interface UserState {
    token?: string
    user?: {
        id: string
        companyId: string
        name: string
        phone: { number?: string, verify?: boolean }
        email: { address?: string, verify?: boolean }
        role: Array<'user' | 'pro'>
    }
    company?: Array<{ id: string, role: Array<'user' | 'admin'>, name: string }>
}

export interface RootState {
    menuHidden: boolean
    user: UserState
}
