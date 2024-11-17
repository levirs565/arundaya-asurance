import { BrandIcon } from "@client/components/icon";

export function DashboardHome() {
    return <div className="min-h-screen w-full flex flex-col justify-center items-center gap-0">
        <BrandIcon className="w-64 h-64 text-zinc-500"/>
        <p className="text-zinc-500 text-lg">Lihat Sidebar</p>
    </div>
}