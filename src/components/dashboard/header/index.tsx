export type HeaderBarParams = {
  name: string;
  profile_picture?: string;
  isLoggedIn: boolean;
  isLoading: boolean;
};

export default function HeaderBar(params: HeaderBarParams) {
  return (
    <header className="py-4 bg-primary text-2xl text-white">
      { !params.isLoading ?
        <>
          <p className="px-8">{params.name}</p>
          {!params.isLoggedIn && <button>Login</button>}
        </> : <p>Loading</p>
      }
    </header>
  );
}
