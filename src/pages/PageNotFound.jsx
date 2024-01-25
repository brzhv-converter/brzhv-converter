import { useEffect } from "react"
import Background from "../components/Background"
import CardWrapper from "../components/CardWrapper"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }, [navigate])

    return (
        <main className="relative">
            <Background />
            <CardWrapper>
                <h2 className="w-full">
                    404 Page not found<br/>
                    Returning to starting page...
                </h2>
            </CardWrapper>
        </main>
    )
}

export default PageNotFound