import Header from "./header";
import Navigation from "./nav";

export default function Dashboard () {
    return <>
        <Header name={""} isLoggedIn={false}/>
        <Navigation options={{
            profile: {
                name: "",
                picture: ""
            },
            precentage: 0,
            display: false,
            items: {
                
            },
            current: ""
        }}/>
    </>
}