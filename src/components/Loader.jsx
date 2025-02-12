import { useEffect } from 'react'
import '../styles/loader.css'

const Loader = () => {
    useEffect(() => {
        document.body.classList.add('no-scroll')

        return () => {
            document.body.classList.remove('no-scroll')
        }
    }, [])

    return (
        <div className="h-screen w-screen flex justify-center items-center z-[49] top-0 bg-dark-gray fixed">
            <div className="loadingspinner">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
            </div>
        </div>
    )
}

export default Loader
