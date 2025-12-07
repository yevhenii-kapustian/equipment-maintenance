import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout ({children}: {children: React.ReactNode}) {
    return(
    <>
    <Header/>
    <main className="pt-10 px-40 max-xl:px-5 flex-1">
        {children}
    </main>
    <Footer/>
    </>
    )
}