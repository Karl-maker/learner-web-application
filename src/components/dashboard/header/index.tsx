export type HeaderBarParams = {
  name: string;
  profile_picture?: string;
  isLoggedIn: boolean;
};

export default function HeaderBar(params: HeaderBarParams) {
  return (
    <header className="py-4 bg-primary text-2xl text-white">
      <p>{params.name}</p>
      {!params.isLoggedIn && <button>Login</button>}
    </header>
  );
}
