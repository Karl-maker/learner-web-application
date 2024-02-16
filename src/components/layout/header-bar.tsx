export type HeaderBarParams = {
    name: string;
    profile_picture?: string;
    isLoggedIn: boolean;
}

export default function HeaderBar(params: HeaderBarParams) {
    return <header>
        <p>{params.name}</p>
        {!params.isLoggedIn && <button>Login</button>}
    </header>
}