import { UserProps } from "../types/user";

import Search from "../components/search/Search";
import User from "../components/user/User";
import Error from "../components/error/Error";

import { useState } from "react";

const Home = () => {

  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false)

  const loadUser = async(userName: string) => {
    
    setError(false);
    setUser(null);

    // API GitHub
    const res = await fetch(`https://api.github.com/users/${userName}`);

    // retorna JSON do API GitHub
    const data = await res.json();

    // usuário não existe retornar error.
    if(res.status === 404) {
      setError(true);
      return;
    }

    // pega as propriedades setadas do API
    const {avatar_url, login, location, followers, following} = data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following
    };

    setUser(userData);
  };

  return (
    <div>
        <Search loadUser={loadUser} />
        {user && <User {...user}/>}
        {error && <Error />}
    </div>
  )
}

export default Home