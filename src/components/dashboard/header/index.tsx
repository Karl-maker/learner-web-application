import Link from "next/link";

export type HeaderBarParams = {
  name: string;
  profile_picture?: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  picture: string;
};

export default function HeaderBar(params: HeaderBarParams) {
  return (
    <header className="py-4 bg-primary text-2xl text-white">
      { !params.isLoading ?
        <>
          {!params.isLoggedIn ? <Link className='btn' href='/login'>Login</Link> : 
          <div>
            <p className="px-8">{params.name}</p>
            { params.picture ?            
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={params.picture} />
                </div>
              </div> 
              : 
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-24">
                  <span className="text-3xl">{params.name.charAt(0)}</span>
                </div>
              </div> 
            }
          </div>
          }
        </> : <p>Loading</p>
      }
    </header>
  );
}
