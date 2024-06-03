import { Settings } from './settings'
import Header from './header'
import About from './about'
import Social from './social'
import Features from './features'
import Footer from './footer'

export function App() {
    return (
        <Settings>
            <Header />
            <About />
            <Social />
            <Features />
            <Footer />
        </Settings>
    )
}
