"use client"
import { useContext } from "react";
import { NavigationLayoutContext } from "../../layout";

/**
 * @desc student profiles are here and can display information about students
 * @todo complete styling 
 */


export default function StudentProfilePage({ params }: { params: { id: string } }) {
    const { navigation, setNavigation } = useContext(NavigationLayoutContext);
    const updateDashboard = () => {
        setNavigation({
            ...navigation,
            precentage: navigation.precentage + 0.1,
        })
    }

    return (
        <button onClick={updateDashboard}>My Post: {params.id}</button>
    );
}