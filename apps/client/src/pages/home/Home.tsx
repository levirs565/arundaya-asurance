import { AppBar, AppBarTitle } from "@client/components/app-bar";
import bgImg from "./clipboard-medical-desk.jpg";
import { Button } from "@client/components/ui/button";
import { Link } from "react-router-dom";
import { BrandIcon } from "@client/components/icon";

export function HomePage() {
    return <div>
        <div className="bg-cover min-h-screen" style={{
            backgroundImage: `url(${bgImg})`
        }}>
            <AppBar className="bg-transparent shadow-none h-24">
                <BrandIcon className="w-16 h-16"/>
                <AppBarTitle>Arundaya <br />Assurance</AppBarTitle>
            </AppBar>

            <div className="p-16 flex flex-col gap-2">
                <h1 className="text-5xl font-semibold">ARUNDAYA ASSURANCE</h1>
                <br />
                <p className="text-2xl font-semibold mr-96">Arundaya Assurance adalah perusahaan asuransi kesehatan yang menyediakan perlindungan terpercaya dengan layanan cepat dan jaringan luas. Berfokus pada solusi fleksibel dan terjangkau, Arundaya Assurance hadir untuk mendukung kesehatan masyarakat Indonesia.</p>
                <br />
            </div>
            <div className="px-16 py-5">
                <Button className=" p-7 rounded-full bg-blue-600 hover:bg-blue-400 text-lg" asChild>
                    <Link to={`/login`} >
                        Mulai Sekarang
                    </Link>
                </Button>
            </div>
        </div>
    </div>
}