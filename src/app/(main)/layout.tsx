import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout ({children}: {children: React.ReactNode}) {
    return(
    <>
    <Header/>
    <main className="py-10 px-40 max-xl:px-10 flex-1">
        {children}
    </main>
    <Footer/>
    </>
    )
}